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
          variant="primary"
          className="mt-4 px-4 py-2 text-sm md:px-8 md:py-4 md:text-base z-10"
          asChild
        >
          <a href="/store">Shop the Collection</a>
        </Button>
      </div>
    </div>
  )
}

export default Hero
