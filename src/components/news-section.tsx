"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"

const news = [
  {
    id: 1,
    title: "Nueva Plataforma de Ventas Digitales",
    description:
      "Lanzamos nuestra nueva app para que puedas gestionar tus ventas de forma más rápida y eficiente. Descubre todas las funcionalidades.",
    date: "25 Nov 2025",
    category: "Tecnología",
    isNew: true,
    readTime: "3 min",
  },
  {
    id: 2,
    title: "Incremento de Comisiones por Temporada",
    description:
      "Durante diciembre, todos los aliados recibirán un 15% adicional en comisiones por cada venta realizada. ¡Aprovecha!",
    date: "22 Nov 2025",
    category: "Beneficios",
    isNew: true,
    readTime: "2 min",
  },
  {
    id: 3,
    title: "Capacitación Virtual: Mejores Prácticas",
    description:
      "Únete a nuestra capacitación online sobre técnicas de venta y atención al cliente. Certificado incluido.",
    date: "20 Nov 2025",
    category: "Formación",
    isNew: false,
    readTime: "5 min",
  },
  {
    id: 4,
    title: "Nuevo Material POP Disponible",
    description:
      "Ya puedes solicitar el nuevo material promocional para tu punto de venta. Incluye afiches, pendones y volantes actualizados.",
    date: "18 Nov 2025",
    category: "Marketing",
    isNew: false,
    readTime: "2 min",
  },
]

export function NewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  return (
    <section id="novedades" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Actualidad Comercial
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Noticias para Aliados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estrategias de venta, actualizaciones regulatorias y consejos prácticos para potenciar tu negocio.
          </p>
        </div>

        {/* News Carousel */}
        <div className="relative mb-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {news.map((item) => (
                <div key={item.id} className="pl-4 flex-[0_0_100%] md:flex-[0_0_50%] min-w-0">
                  <Card className="h-full group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={item.isNew ? "default" : "secondary"}
                          className={item.isNew ? "bg-primary text-primary-foreground" : ""}
                        >
                          {item.category}
                        </Badge>
                        {item.isNew && <span className="text-xs font-semibold text-primary animate-pulse">NUEVO</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.readTime}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                          Leer más <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {news.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${index === selectedIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                onClick={() => scrollTo(index)}
                aria-label={`Ir a la noticia ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Ver Todas las Novedades
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
