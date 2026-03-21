# 3D Border — Design Spec

## Résumé

Remplacer toutes les bordures SVG statiques du site par une unique bordure 3D en React Three Fiber. La bordure encadre tout le viewport en permanence (fixed), réagit au scroll avec une inclinaison rotateX progressive, et laisse le contenu visible à l'intérieur.

---

## Installation (obligatoire)

```bash
npm install three@^0.168.0 @react-three/drei@^9.0.0
```

- `@react-three/fiber` est déjà installé (`^9.5.0`) — ne pas réinstaller
- `three` est actuellement à `^0.167.1` — **le bump vers `^0.168.0` est obligatoire**, la range `^0.167.1` ne résoudra jamais `0.168+` sans cette commande explicite
- `@react-three/drei` est une **nouvelle dépendance** (absente du package.json actuel), pas un bump

---

## Apparence

- **Forme** : rectangle plein blanc, coins extérieurs carrés (couvrent les angles du viewport), trou intérieur arrondi
- **Épaisseur** : ~20px sur chaque bord
- **Radius intérieur** : 36px
- **Couleur** : blanc pur `#ffffff`
- **Fond** : le site est visible à travers le trou intérieur

### Géométrie R3F

```js
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

function buildBorderShape(w, h, thickness, radius) {
  const ow = w / 2, oh = h / 2
  const iw = ow - thickness, ih = oh - thickness
  const r = Math.min(radius, iw, ih)

  // Outer — coins carrés, couvre tout le viewport
  const shape = new THREE.Shape()
  shape.moveTo(-ow, -oh)
  shape.lineTo( ow, -oh)
  shape.lineTo( ow,  oh)
  shape.lineTo(-ow,  oh)
  shape.closePath()

  // Inner hole — coins arrondis
  const hole = new THREE.Path()
  hole.moveTo(-iw + r, -ih)
  hole.lineTo( iw - r, -ih)
  hole.absarc( iw - r, -ih + r, r, -Math.PI / 2, 0, false)
  hole.lineTo( iw,  ih - r)
  hole.absarc( iw - r,  ih - r, r, 0, Math.PI / 2, false)
  hole.lineTo(-iw + r,  ih)
  hole.absarc(-iw + r,  ih - r, r, Math.PI / 2, Math.PI, false)
  hole.lineTo(-iw, -ih + r)
  hole.absarc(-iw + r, -ih + r, r, Math.PI, Math.PI * 1.5, false)
  hole.closePath()

  shape.holes.push(hole)
  return new THREE.ShapeGeometry(shape)
}
```

### Caméra orthographique

```jsx
<Canvas
  orthographic
  camera={{ zoom: 1, near: 0.1, far: 1000, position: [0, 0, 100] }}
  style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
>
```

Avec `orthographic + zoom: 1`, les unités Three.js = pixels. Le mesh est construit directement en `size.width / size.height` via `useThree().size`.

### Resize + cleanup géométrie

```js
const { size } = useThree()
const [geometry, setGeometry] = useState(null)

useEffect(() => {
  const geo = buildBorderShape(size.width, size.height, 20, 36)
  setGeometry(geo)
  return () => geo.dispose()
}, [size.width, size.height])
```

---

## Comportement scroll

- **Inclinaison initiale** : `rotateX: -8deg`, `rotateY: -3deg`
- **En scrollant** : `rotateX` de `-8deg` → `+12deg` sur 100% du scroll
- `rotateY` reste à `-3deg` en permanence — il ne doit pas être réinitialisé dans le `useEffect` de resize (qui ne touche qu'à la géométrie)

```jsx
// Déclaration du ref dans le composant Border3D :
const meshRef = useRef(null)

// Dans le JSX :
<mesh ref={meshRef}>
  <primitive object={geometry} attach="geometry" />
  <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
</mesh>

// useEffect scroll (une seule fois au mount) :
useEffect(() => {
  const mesh = meshRef.current
  mesh.rotation.x = THREE.MathUtils.degToRad(-8)
  mesh.rotation.y = THREE.MathUtils.degToRad(-3) // statique, jamais réécrit

  const trigger = ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: (self) => {
      mesh.rotation.x = THREE.MathUtils.degToRad(-8 + self.progress * 20)
    },
  })
  return () => trigger.kill()
}, [])
```

---

## Stacking order (z-index)

```
z-index 9999 : Border3D Canvas (R3F, pointer-events: none)
z-index 9998 : Grain overlay SVG (existant dans App.jsx — inchangé)
z-index ...  : Contenu du site
```

---

## Intégration

### Composant à créer
`src/components/Border3D/index.jsx`

### Modifications dans `src/components/Intro/index.jsx`
- Retirer `import Border from '../Border'`
- Ajouter `import Menu from '../Menu'`
- Remplacer `<Border />` par `<Menu />` dans le même wrapper `div.absolute.top-0.left-0`
  - Note : `Menu` est actuellement rendu à l'intérieur de `Border/index.jsx` (ligne 146). En supprimant Border et en plaçant `<Menu />` directement dans Intro, on conserve le même comportement. Menu utilise `position: absolute` avec `bottom` négatif — il fonctionne dans n'importe quel conteneur positionné.

### Suppressions dans `src/components/App/App.jsx`
Les éléments suivants sont tous liés aux bordures SVG et doivent être retirés ensemble :
- Refs : `borderTopRef`, `borderTopRightRef`, `borderBottomLeftRef`, `borderBottomRightRef`, `borderHexRef`
- La `<section ref={sectionRef}>` et le `sectionRef` (ref déclarée ligne ~30, section utilisée lignes ~129–164) — cette section ne sert qu'à entourer les SVGs de bordure
- Le `useEffect` GSAP scroll ciblant ces 5 refs (lignes ~47–93)
- **NE PAS supprimer** le premier `useEffect` ciblant `.bg-white.relative` (lignes ~32–45) — il contrôle `svgCentralRef` dans le composant Group, sans rapport avec les bordures

### Ajout dans `src/components/App/App.jsx`
```jsx
import Border3D from '../Border3D'
// Premier enfant du return, avant le grain overlay :
<Border3D />
```

### Suppressions fichiers
- `src/components/Border/index.jsx` et le dossier `src/components/Border/` entièrement

---

## Ce qui ne change pas

- Toutes les autres sections (Clips, Timeline, Footer, Scroller images)
- Le CustomCursor
- Les animations GSAP existantes hors bordures
- Le grain overlay (z-index 9998, inchangé)
- Le premier `useEffect` de App.jsx (svgCentralRef / Group parallax)
