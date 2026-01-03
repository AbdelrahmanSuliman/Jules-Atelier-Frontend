import Link from "next/link"
import Image from "next/image"

export default async function RegionSelector() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Image
        src="/images/region-selector-background.png" 
        alt="Background"
        fill
        priority 
        quality={100}
        className="object-cover -z-10" 
      />

      <div className="flex flex-col gap-10 items-center z-10">
        <Image
          src="/images/logo-white.png"
          width={1280}
          height={1280}
          alt="Jules Atelier Logo"
          className="md:w-64 w-32 h-auto"
          priority
        />

        <div className="flex flex-row gap-16 items-center p-6">
          <Link
            href="/pt"
            className="group flex flex-col items-center gap-4 transition-transform hover:scale-110 duration-150"
          >
            <h1 className="text-2xl font-bold text-white">PORTUGAL</h1>
          </Link>

          <Link
            href="/eg"
            className="group flex flex-col items-center gap-4 transition-transform hover:scale-110 duration-150"
          >
            <h1 className="text-2xl font-bold text-white">EGYPT</h1>
          </Link>
        </div>

      </div>
    </div>
  )
}
