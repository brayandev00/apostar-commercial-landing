import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dices, Ticket, CircleDot, Star, Zap, Gift } from "lucide-react"

const games = [
  {
    id: 1,
    name: "Baloto",
    description: "El juego de lotería más grande de Colombia. Acumulados millonarios cada semana.",
    icon: CircleDot,
    commission: "8%",
    popularity: "Alta",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Chance",
    description: "El juego tradicional más querido. Apuesta tus números de la suerte todos los días.",
    icon: Ticket,
    commission: "12%",
    popularity: "Muy Alta",
    color: "bg-secondary",
  },
  {
    id: 3,
    name: "Super Astro",
    description: "Combina astrología y suerte. Premios especiales por signo zodiacal.",
    icon: Star,
    commission: "10%",
    popularity: "Alta",
    color: "bg-primary",
  },
  {
    id: 4,
    name: "Raspa y Gana",
    description: "Premios instantáneos en cada tarjeta. Diversión garantizada para tus clientes.",
    icon: Zap,
    commission: "15%",
    popularity: "Media",
    color: "bg-accent",
  },
  {
    id: 5,
    name: "Lotería",
    description: "Sorteos tradicionales con los mejores premios. Billetes físicos disponibles.",
    icon: Gift,
    commission: "9%",
    popularity: "Alta",
    color: "bg-secondary",
  },
  {
    id: 6,
    name: "Apuestas Deportivas",
    description: "Fútbol, baloncesto y más. Las mejores cuotas del mercado para tus clientes.",
    icon: Dices,
    commission: "7%",
    popularity: "Muy Alta",
    color: "bg-primary",
  },
]

export function GamesSection() {
  return (
    <section id="juegos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Catálogo de Juegos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Portafolio de Productos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Maximiza tus ganancias con nuestro amplio catálogo de juegos. Ofrece variedad a tus clientes y asegura
            ingresos constantes con nuestras competitivas comisiones.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border hover:border-primary/30"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${game.color} text-primary-foreground`}>
                    <game.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Comisión: {game.commission}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {game.name}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{game.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Popularidad: <span className="font-semibold text-foreground">{game.popularity}</span>
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    Ver detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
