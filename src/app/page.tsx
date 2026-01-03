import Image from "next/image"
import RegionDrawer from ".././modules/home/components/region-drawer"

export default async function RegionSelector() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <Image
        src="/images/region-selector-background.png"
        alt="Background"
        fill
        priority
        quality={100}
        className="object-cover opacity-50" 
      />

      <div className="z-10 animate-pulse">
        <Image
          src="/images/logo-white.png"
          width={1280}
          height={1280}
          alt="Jules Atelier Logo"
          className="w-32 md:w-64 h-auto opacity-80"
          priority
        />
      </div>

      <RegionDrawer />
    </div>
  )
}
