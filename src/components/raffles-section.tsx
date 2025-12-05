"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Clock, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"

const raffles = [
  {
    id: 1,
    name: "Mega Sorteo Navideño",
    prize: "$500,000,000",
    date: "24 Dic 2025",
    timeLeft: "26 días",
    participants: "125,000+",
    status: "active",
    featured: true,
  },
  {
    id: 2,
    name: "Sorteo Semanal Chance",
    prize: "$50,000,000",
    date: "30 Nov 2025",
    timeLeft: "2 días",
    participants: "45,000+",
    status: "active",
    featured: false,
  },
  {
    id: 3,
    name: "Super Astro Especial",
    prize: "$100,000,000",
    date: "15 Dic 2025",
    timeLeft: "17 días",
    participants: "78,000+",
    status: "active",
    featured: false,
  },
  {
    id: 4,
    name: "Baloto Acumulado",
    prize: "$25,000,000,000",
    date: "02 Dic 2025",
    timeLeft: "4 días",
    participants: "500,000+",
    status: "active",
    featured: true,
  },
  {
    id: 5,
    name: "Extra de Colombia",
    prize: "$12,000,000,000",
    date: "05 Dic 2025",
    timeLeft: "7 días",
    participants: "200,000+",
    status: "active",
    featured: false,
  },
]

export function RafflesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="sorteos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Oportunidades de Venta
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Próximos Sorteos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Impulsa tus ventas promocionando los sorteos con los acumulados más atractivos del momento.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {raffles.map((raffle) => (
                <div key={raffle.id} className="pl-4 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          variant={raffle.featured ? "default" : "secondary"}
                          className={raffle.featured ? "bg-primary text-primary-foreground" : ""}
                        >
                          {raffle.featured ? "Destacado" : "Activo"}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {raffle.timeLeft}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2">{raffle.name}</h3>

                      <p className="text-2xl font-bold text-primary mb-4">{raffle.prize}</p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-6 mt-auto">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {raffle.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {raffle.participants}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        Ver Material Promocional
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden md:flex bg-background border-primary text-primary hover:bg-primary hover:text-primary-foreground z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden md:flex bg-background border-primary text-primary hover:bg-primary hover:text-primary-foreground z-10"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="bg-background border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-background border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
