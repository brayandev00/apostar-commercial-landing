import { TrendingUp, Users, Trophy, Gift, Activity, BarChart, PieChart, LineChart } from "lucide-react"
import { useEffect, useState } from "react"

const iconMap: Record<string, any> = {
  "Users": Users,
  "Trophy": Trophy,
  "Gift": Gift,
  "TrendingUp": TrendingUp,
  "Activity": Activity,
  "BarChart": BarChart,
  "PieChart": PieChart,
  "LineChart": LineChart
}

interface Statistic {
  icon: string
  value: string
  label: string
}

export function SeccionEstadisticas() {
  const [stats, setStats] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/estadisticas?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading statistics:", err)
        setLoading(false)
      })
  }, [])

  if (loading) return null

  return (
    <section className="py-16 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Users
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <IconComponent className="h-7 w-7 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
