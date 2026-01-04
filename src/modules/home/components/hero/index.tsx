import { Button } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className=" w-full min-h-screen overflow-hidden -mt-[56px] md:-mt-[64px]">
      <video
        className="absolute inset-0 h-full w-full object-cover z-10"
        src="/images/hero-section-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/30 -z-10" />
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center text-center">
        <Button
          variant="transparent"
          className="
              group
              relative
              z-20
              border border-white/50
              bg-white/5
              backdrop-blur-sm
              text-white
              uppercase
              transition-all
              duration-500
              hover:text-black
              hover:border-white

              px-6 py-3
              text-[10px]
              tracking-[0.15em]

              sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.18em]
              md:px-10 md:py-6 md:text-xs md:tracking-[0.2em]
            "
          asChild
        >
          <a href="/store">Shop the Collection</a>
        </Button>
      </div>
    </div>
  )
}

export default Hero
