type HeroProps = {
  headingClass?: string
  subtitleClass?: string
  containerClass?: string
}

export function HeroSection({
  headingClass = 'text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl',
  subtitleClass = 'mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg',
  containerClass = 'relative z-10 mx-auto px-4 text-center',
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[80dvh] w-full flex-col items-center justify-center overflow-hidden pt-20"
    >
      <div className={`container ${containerClass}`}>
        <div className="mx-auto max-w-4xl">
          <h1 className={headingClass}>
            Faire plus <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              avec moins
            </span>
          </h1>

          <p className={subtitleClass}>
            Clyvuum conçoit des infrastructures num&eacute;riques de haute pr&eacute;cision : sites web optimis&eacute;s, applications
            et automatisations de workflows pour les entreprises qui visent l&apos;excellence op&eacute;rationnelle.
          </p>
        </div>
      </div>

      {/* Halo de fond */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[100px] opacity-50" />
    </section>
  )
}
