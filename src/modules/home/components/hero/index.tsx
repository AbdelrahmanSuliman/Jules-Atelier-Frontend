import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/hero-section-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center gap-6">
        <Button variant="primary" size="large" className="mt-4" asChild>
          <a href="/store">Shop the Collection</a>
        </Button>
      </div>
    </div>
  )
}

export default Hero
