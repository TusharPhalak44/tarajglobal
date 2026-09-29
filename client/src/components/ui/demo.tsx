import { useRef } from "react"
import { MoreHorizontal, Search } from "lucide-react"
import { MetalFx } from "@/components/ui/metal-upgrade-button"

// Chromatic — the "Upgrade to Pro" metal button in a toolbar. The search field
// and the ⋯ button are passed as reflectionTargets, so (in dark mode) they pick
// up a soft reflection of the metal.
export default function UpgradeToProChromaticDemo() {
  const searchRef = useRef<HTMLLabelElement>(null)
  const moreRef = useRef<HTMLButtonElement>(null)
  return (
    <div className="flex min-h-[440px] w-full items-center justify-center bg-[#070707] p-8">
      <div className="flex items-center gap-3">
        <label
          ref={searchRef}
          className="flex h-10 w-[235px] cursor-text items-center gap-1.5 rounded-full border border-[#2c2f3685] bg-[#1d1d1d] py-2.5 pl-3 pr-0.5 text-sm font-medium text-[#f8f8f8] shadow-[inset_0_0_50px_0_#ffffff05]"
        >
          <Search className="size-[18px] shrink-0 text-[#8b8b8b]" />
          <input
            readOnly
            placeholder="Search"
            aria-label="Search"
            className="w-full bg-transparent outline-none placeholder:text-[#8b8b8b]"
          />
        </label>
        <MetalFx preset="chromatic" strength={0.9} theme="dark" reflectionTargets={[searchRef, moreRef]}>
          <button className="flex h-10 w-[140px] items-center justify-center rounded-[20px] border border-[#2c2f3685] bg-[#1d1d1d] text-sm font-medium text-[#f8f8f8]">
            Upgrade to Pro
          </button>
        </MetalFx>
        <button
          ref={moreRef}
          aria-label="More"
          className="inline-flex size-10 items-center justify-center rounded-[20px] border border-[#2c2f3685] bg-[#1d1d1d] text-[#f8f8f8] shadow-[inset_0_0_50px_0_#ffffff05]"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </div>
  )
}
