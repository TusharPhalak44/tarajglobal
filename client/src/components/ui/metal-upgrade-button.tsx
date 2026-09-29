// Liquid Metal — "Upgrade to Pro" button.
//
// MetalFx wraps any element with an animated metallic ring driven by a shared
// WebGL renderer. In `variant="button"` it renders a pill-style ring; pass
// `reflectionTargets` (refs to neighbouring elements) and, in dark mode, those
// neighbours pick up a soft proximity reflection of the metal.
//
//   const searchRef = useRef<HTMLLabelElement>(null)
//   <MetalFx preset="chromatic" strength={0.9} reflectionTargets={[searchRef]}>
//     <button>Upgrade to Pro</button>
//   </MetalFx>
//
// - preset:  'chromatic' | 'silver' | 'gold'
// - variant: 'button' (pill) | 'circle'
// - theme:   'auto' | 'dark' | 'light'   (reflections render in dark only)
// - strength (0..1), disableGlow, borderRadius, paused, …
//
// Source & playground: https://metal.jakubantalik.com
import { MetalFx } from "metal-fx"

export { MetalFx } from "metal-fx"
export type {
  MetalFxProps,
  MetalFxPreset,
  MetalFxVariant,
  MetalFxTheme,
} from "metal-fx"

export default MetalFx
