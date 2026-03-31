import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const MEMORY_ITEMS = [
  {
    icon: "BookOpen",
    title: "Книга памяти",
    description: "Истории подвигов, написанные родственниками и сослуживцами. Каждая история — живое свидетельство героизма.",
    direction: "top",
  },
  {
    icon: "Camera",
    title: "Фотоархив",
    description: "Уникальные фотографии из личных архивов семей. Лица героев, которые мы должны помнить.",
    direction: "right",
  },
  {
    icon: "Award",
    title: "Награды и звания",
    description: "Государственные награды, ордена и медали. Официальное признание подвигов каждого героя.",
    direction: "left",
  },
  {
    icon: "Heart",
    title: "Слова близких",
    description: "Трогательные воспоминания родных и друзей. Живая память о тех, кого мы любим и не забудем.",
    direction: "bottom",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Память
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Формы сохранения истории</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {MEMORY_ITEMS.map((item, i) => (
            <MemoryCard key={i} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MemoryCard({
  item,
  index,
  isVisible,
}: {
  item: typeof MEMORY_ITEMS[0]
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (item.direction) {
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-400/30 bg-orange-500/10 transition-all duration-300 group-hover:border-orange-400/60 group-hover:bg-orange-500/20">
          <Icon name={item.icon as "BookOpen"} size={14} className="text-orange-300" />
        </div>
        <div className="h-px flex-1 bg-foreground/10 transition-all duration-300 group-hover:bg-foreground/20" />
        <span className="font-mono text-xs text-foreground/40">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{item.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{item.description}</p>
    </div>
  )
}
