import { Button, Heading } from "@medusajs/ui"
const Hero = () => {
  return (
    <div className="inset-0 ">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/hero-section-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="mt-20 md:mt-40 flex h-full w-full flex-col items-center justify-center text-center">
        <Button
          variant="primary"
          className="mt-4 px-4 py-2 text-sm md:px-8 md:py-4 md:text-base"
          asChild
        >
          <a href="/store">Shop the Collection</a>
        </Button>
      </div>
    </div>
  )
}

export default Hero
