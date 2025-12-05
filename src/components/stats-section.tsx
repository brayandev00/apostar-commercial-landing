import { TrendingUp, Users, Trophy, Gift } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Aliados Activos",
  },
  {
    icon: Trophy,
    value: "150+",
    label: "Sorteos Mensuales",
  },
  {
    icon: Gift,
    value: "$2M+",
    label: "Comisiones Pagadas",
  },
  {
    icon: TrendingUp,
    value: "35+",
    label: "Años de Experiencia",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
