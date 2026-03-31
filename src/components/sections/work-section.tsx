import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

const HEROES = [
  {
    number: "001",
    name: "Алексей Морозов",
    rank: "Сержант",
    years: "1998 — 2022",
    description: "Удостоен звания Героя Российской Федерации посмертно. Проявил мужество и отвагу при выполнении боевого задания.",
    image: "https://cdn.poehali.dev/projects/502cb4f1-c92c-4985-a708-891b742ea935/files/fd160203-01a2-4d77-a8e8-a297ade4801a.jpg",
  },
  {
    number: "002",
    name: "Дмитрий Захаров",
    rank: "Старший лейтенант",
    years: "1995 — 2023",
    description: "Командир взвода. Ценой собственной жизни спас сослуживцев. Награждён орденом Мужества посмертно.",
    image: "https://cdn.poehali.dev/projects/502cb4f1-c92c-4985-a708-891b742ea935/files/a282d7ba-f2c3-43b5-8f2d-97271deb239e.jpg",
  },
  {
    number: "003",
    name: "Иван Петров",
    rank: "Рядовой",
    years: "2001 — 2022",
    description: "До последнего выполнял воинский долг. Его подвиг стал символом стойкости и самопожертвования.",
    image: "https://cdn.poehali.dev/projects/502cb4f1-c92c-4985-a708-891b742ea935/files/fd160203-01a2-4d77-a8e8-a297ade4801a.jpg",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.2)
  const [activeHero, setActiveHero] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Герои
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Галерея памяти</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {HEROES.map((hero, i) => (
            <HeroCard
              key={i}
              hero={hero}
              index={i}
              isVisible={isVisible}
              isActive={activeHero === i}
              onToggle={() => setActiveHero(activeHero === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroCard({
  hero,
  index,
  isVisible,
  isActive,
  onToggle,
}: {
  hero: typeof HEROES[0]
  index: number
  isVisible: boolean
  isActive: boolean
  onToggle: () => void
}) {
  const directions = ["-translate-x-12 opacity-0", "translate-y-12 opacity-0", "translate-x-12 opacity-0"]
  const revealClass = isVisible ? "translate-x-0 translate-y-0 opacity-100" : directions[index]

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-lg border border-foreground/10 transition-all duration-700 hover:border-orange-400/30 ${revealClass}`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={onToggle}
    >
      <div className="relative h-64 overflow-hidden md:h-72">
        <img
          src={hero.image}
          alt={hero.name}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="font-mono text-xs text-orange-300/80">{hero.number}</span>
          <h3 className="font-sans text-xl font-light text-foreground">{hero.name}</h3>
          <p className="font-mono text-xs text-foreground/60">{hero.rank} · {hero.years}</p>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-foreground/5 px-4 transition-all duration-500 ${
          isActive ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-foreground/80">{hero.description}</p>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div className="h-px flex-1 bg-orange-400/20 transition-all duration-300 group-hover:bg-orange-400/40" />
        <span className="ml-3 font-mono text-xs text-foreground/40 transition-colors group-hover:text-orange-300/70">
          {isActive ? "скрыть ↑" : "читать →"}
        </span>
      </div>
    </div>
  )
}
