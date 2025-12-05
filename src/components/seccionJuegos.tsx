"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Dices, Ticket, CircleDot, Star, Zap, Gift, Info, TrendingUp, Clock, DollarSign } from "lucide-react"

const games = [
  {
    id: 1,
    name: "Baloto",
    description: "El juego de lotería más grande de Colombia. Acumulados millonarios cada semana.",
    icon: CircleDot,
    commission: "8%",
    popularity: "Alta",
    color: "bg-red-600",
    details: {
      fullDescription: "Baloto es el juego de lotería más popular de Colombia con premios que pueden alcanzar miles de millones de pesos. Los jugadores seleccionan 5 números del 1 al 43 más un número adicional (Superbalota) del 1 al 16.",
      howToPlay: [
        "Selecciona 5 números del 1 al 43",
        "Elige 1 Superbalota del 1 al 16",
        "Puedes jugar hasta 10 sorteos consecutivos",
        "Revisa los resultados cada miércoles y sábado"
      ],
      prizes: [
        "6 aciertos (5 + Superbalota): Premio mayor acumulado",
        "5 aciertos: Hasta $50,000,000",
        "4 aciertos + Superbalota: Hasta $5,000,000",
        "4 aciertos: Hasta $100,000",
        "3 aciertos + Superbalota: Hasta $50,000"
      ],
      schedule: "Sorteos: Miércoles y Sábados a las 10:00 PM",
      minBet: "$4,500 por apuesta",
      commissionDetails: "8% de comisión por cada venta + bonos por volumen"
    }
  },
  {
    id: 2,
    name: "Chance",
    description: "El juego tradicional más querido. Apuesta tus números de la suerte todos los días.",
    icon: Ticket,
    commission: "12%",
    popularity: "Muy Alta",
    color: "bg-yellow-600",
    details: {
      fullDescription: "El Chance es el juego de azar más tradicional y popular de Colombia. Los jugadores eligen números de 2, 3 o 4 cifras y pueden ganar hasta 5,000 veces su apuesta. Con sorteos diarios basados en las loterías tradicionales.",
      howToPlay: [
        "Elige tus números de la suerte (2, 3 o 4 cifras)",
        "Selecciona la lotería de referencia",
        "Define el monto de tu apuesta",
        "Espera el sorteo de la lotería elegida"
      ],
      prizes: [
        "4 cifras exactas: 5,000 veces tu apuesta",
        "3 cifras exactas: 500 veces tu apuesta",
        "2 cifras exactas: 50 veces tu apuesta",
        "Chance Millonario: Hasta $1,000,000,000"
      ],
      schedule: "Sorteos diarios según loterías tradicionales (12+ sorteos al día)",
      minBet: "Desde $500 pesos",
      commissionDetails: "12% de comisión por cada venta - El más rentable"
    }
  },
  {
    id: 3,
    name: "Super Astro",
    description: "Combina astrología y suerte. Premios especiales por signo zodiacal.",
    icon: Star,
    commission: "10%",
    popularity: "Alta",
    color: "bg-purple-600",
    details: {
      fullDescription: "Super Astro es un juego único que combina la astrología con la suerte. Los jugadores eligen su signo zodiacal y 4 números, con premios especiales para quienes aciertan su signo. Popular entre quienes creen en la influencia de los astros.",
      howToPlay: [
        "Selecciona tu signo zodiacal favorito",
        "Elige 4 números del 0 al 9",
        "Puedes apostar a múltiples signos",
        "Revisa resultados en los sorteos programados"
      ],
      prizes: [
        "Signo + 4 cifras: Hasta $3,500 por cada $1,000",
        "Solo 4 cifras: Hasta $2,500 por cada $1,000",
        "Solo signo: Hasta $1,000 por cada $1,000",
        "Premios especiales en fechas zodiacales"
      ],
      schedule: "Sorteos: Lunes, Miércoles y Viernes a las 9:00 PM",
      minBet: "$1,000 por apuesta",
      commissionDetails: "10% de comisión + bonos por signos ganadores"
    }
  },
  {
    id: 4,
    name: "Raspa y Gana",
    description: "Premios instantáneos en cada tarjeta. Diversión garantizada para tus clientes.",
    icon: Zap,
    commission: "15%",
    popularity: "Media",
    color: "bg-green-600",
    details: {
      fullDescription: "Raspa y Gana ofrece emoción instantánea con tarjetas físicas que revelan premios al momento. Ideal para clientes que buscan gratificación inmediata. Diferentes denominaciones y temáticas disponibles.",
      howToPlay: [
        "Compra tu tarjeta Raspa y Gana",
        "Raspa las áreas indicadas con una moneda",
        "Descubre si ganaste al instante",
        "Reclama tu premio inmediatamente en el punto de venta"
      ],
      prizes: [
        "Premio mayor: Hasta $10,000,000",
        "Premios medios: $50,000 - $500,000",
        "Premios menores: $5,000 - $20,000",
        "Tarjetas desde $2,000 hasta $10,000"
      ],
      schedule: "Disponible todo el tiempo - Premios instantáneos",
      minBet: "Desde $2,000 por tarjeta",
      commissionDetails: "15% de comisión - La más alta del portafolio"
    }
  },
  {
    id: 5,
    name: "Lotería",
    description: "Sorteos tradicionales con los mejores premios. Billetes físicos disponibles.",
    icon: Gift,
    commission: "9%",
    popularity: "Alta",
    color: "bg-blue-600",
    details: {
      fullDescription: "Las loterías tradicionales de Colombia (Medellín, Bogotá, Valle, etc.) ofrecen premios millonarios con billetes físicos coleccionables. Tradición y confianza en cada sorteo.",
      howToPlay: [
        "Elige tu lotería favorita (Medellín, Bogotá, Valle, etc.)",
        "Selecciona tu número de la suerte o pide uno al azar",
        "Compra fracciones o billetes completos",
        "Espera el día del sorteo oficial"
      ],
      prizes: [
        "Premio mayor: $3,000,000,000 - $6,000,000,000",
        "Secos: $200,000 - $500,000",
        "Aproximaciones: $100,000 - $300,000",
        "Terminaciones: $20,000 - $50,000"
      ],
      schedule: "Sorteos semanales según cada lotería (Viernes, Sábados)",
      minBet: "Fracciones desde $2,500 - Billetes desde $10,000",
      commissionDetails: "9% de comisión + bonos por billetes vendidos"
    }
  },
  {
    id: 6,
    name: "Apuestas Deportivas",
    description: "Fútbol, baloncesto y más. Las mejores cuotas del mercado para tus clientes.",
    icon: Dices,
    commission: "7%",
    popularity: "Muy Alta",
    color: "bg-orange-600",
    details: {
      fullDescription: "Apuestas deportivas en vivo y pre-partido para fútbol, baloncesto, tenis y más. Cuotas competitivas y múltiples opciones de apuesta. Ideal para aficionados al deporte.",
      howToPlay: [
        "Selecciona el deporte y partido",
        "Elige el tipo de apuesta (ganador, marcador, etc.)",
        "Define tu monto de apuesta",
        "Confirma tu boleta y espera el resultado"
      ],
      prizes: [
        "Apuestas simples: Según cuota del evento",
        "Apuestas combinadas: Multiplica tus ganancias",
        "Apuestas en vivo: Cuotas dinámicas",
        "Premios según cuota (ej: $10,000 x 2.5 = $25,000)"
      ],
      schedule: "24/7 - Eventos deportivos internacionales diarios",
      minBet: "Desde $1,000 por apuesta",
      commissionDetails: "7% de comisión + bonos por volumen mensual"
    }
  },
]

export function SeccionJuegos() {
  const [selectedGame, setSelectedGame] = useState<typeof games[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewDetails = (game: typeof games[0]) => {
    setSelectedGame(game)
    setIsDialogOpen(true)
  }

  return (
    <section id="juegos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-yellow-500 text-white">
            Catálogo de Juegos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Portafolio de Productos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Maximiza tus ganancias con nuestro amplio catálogo de juegos. Ofrece variedad a tus clientes y asegura ingresos constantes con nuestras competitivas comisiones.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${game.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <game.icon className="h-7 w-7" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground">{game.name}</h3>
                  <Badge variant="outline" className="text-xs border-primary text-primary">
                    Comisión: {game.commission}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed min-h-[3rem]">
                  {game.description}
                </p>

                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    Popularidad: <span className="font-semibold text-foreground">{game.popularity}</span>
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleViewDetails(game)}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Game Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedGame && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${selectedGame.color} text-white`}>
                    <selectedGame.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-3xl">{selectedGame.name}</DialogTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Comisión: {selectedGame.commission}
                      </Badge>
                      <Badge variant="outline">
                        Popularidad: {selectedGame.popularity}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-base leading-relaxed pt-3">
                  {selectedGame.details.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* How to Play */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Cómo Jugar
                  </h3>
                  <ol className="space-y-2">
                    {selectedGame.details.howToPlay.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Prizes */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Premios
                  </h3>
                  <ul className="space-y-2">
                    {selectedGame.details.prizes.map((prize, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{prize}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schedule & Bet Info */}
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <p className="text-xs font-semibold text-muted-foreground">Horarios</p>
                    </div>
                    <p className="text-sm font-bold text-foreground">{selectedGame.details.schedule}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <p className="text-xs font-semibold text-muted-foreground">Apuesta Mínima</p>
                    </div>
                    <p className="text-sm font-bold text-foreground">{selectedGame.details.minBet}</p>
                  </div>
                </div>

                {/* Commission Details */}
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Detalles de Comisión
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedGame.details.commissionDetails}</p>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    Solicitar Activación de {selectedGame.name}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
