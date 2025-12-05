"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState as useStateReact } from "react"

const news = [
  {
    id: 1,
    title: "Nueva Plataforma de Ventas Digitales",
    description:
      "Lanzamos nuestra nueva app para que puedas gestionar tus ventas de forma más rápida y eficiente. Descubre todas las funcionalidades.",
    fullContent: "Apostar presenta su nueva plataforma de ventas digitales, diseñada específicamente para nuestros aliados comerciales. Esta herramienta revolucionaria te permitirá gestionar todas tus transacciones desde un solo lugar, con reportes en tiempo real, seguimiento de comisiones y análisis de ventas. La app incluye funcionalidades como: gestión de inventario digital, notificaciones push de nuevos sorteos y promociones, chat directo con soporte técnico, y dashboard personalizado con tus métricas de rendimiento. Además, la plataforma está optimizada para funcionar incluso con conexiones de internet lentas, garantizando que nunca pierdas una venta.",
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
    fullContent: "¡Excelentes noticias para nuestros aliados! Durante todo el mes de diciembre, implementaremos un incremento especial del 15% en todas las comisiones. Esto significa que además de tu comisión regular, recibirás un bono adicional por cada transacción realizada. Esta promoción aplica para: venta de chance, loterías, baloto, recargas móviles, pago de servicios públicos y giros. Por ejemplo, si normalmente ganas $1,000 por una venta, durante diciembre ganarás $1,150. Este es nuestro regalo de fin de año para agradecer tu compromiso y dedicación. Recuerda que las comisiones se acreditan automáticamente y puedes consultarlas en tiempo real desde tu panel de aliado.",
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
    fullContent: "Invitamos a todos nuestros aliados a participar en nuestro programa de capacitación virtual 'Mejores Prácticas en Atención al Cliente'. Este curso gratuito de 4 horas incluye: técnicas de venta consultiva, manejo de objeciones, fidelización de clientes, uso avanzado de la plataforma Apostar, y estrategias para maximizar tus comisiones. Las sesiones se realizarán los días martes y jueves de 6:00 PM a 8:00 PM durante dos semanas. Al finalizar, recibirás un certificado digital avalado por Apostar que podrás compartir en tus redes profesionales. Los aliados que completen el curso tendrán acceso prioritario a nuevos productos y promociones exclusivas. Cupos limitados, inscríbete ya contactando a tu asesor comercial.",
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
    fullContent: "¡Renueva la imagen de tu punto de venta! Ya está disponible nuestro nuevo material POP (Point of Purchase) con diseños frescos y llamativos que atraerán más clientes a tu negocio. El kit incluye: 5 afiches tamaño A3 con los sorteos más populares, 2 pendones de 1x2 metros para exterior, 500 volantes informativos, calcomanías para vitrinas, y un display de mostrador. Todo el material está impreso en alta calidad y con los colores corporativos actualizados de Apostar. Para solicitar tu kit, solo debes completar el formulario en tu panel de aliado o contactar a tu asesor comercial. El envío es completamente gratuito y llegará a tu punto de venta en un plazo máximo de 5 días hábiles. ¡Haz que tu negocio destaque!",
    date: "18 Nov 2025",
    category: "Marketing",
    isNew: false,
    readTime: "2 min",
  },
]

export function SeccionNoticias() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = useStateReact(0)
  const [selectedNews, setSelectedNews] = useState<typeof news[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  const handleReadMore = (newsItem: typeof news[0]) => {
    setSelectedNews(newsItem)
    setIsDialogOpen(true)
  }

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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80 p-0"
                          onClick={() => handleReadMore(item)}
                        >
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

      </div>

      {/* News Detail Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={selectedNews.isNew ? "default" : "secondary"}
                    className={selectedNews.isNew ? "bg-primary text-primary-foreground" : ""}
                  >
                    {selectedNews.category}
                  </Badge>
                  {selectedNews.isNew && <span className="text-xs font-semibold text-primary">NUEVO</span>}
                </div>
                <DialogTitle className="text-2xl">{selectedNews.title}</DialogTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedNews.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedNews.readTime} de lectura
                  </span>
                </div>
              </DialogHeader>

              <div className="pt-4">
                <DialogDescription className="text-base leading-relaxed text-foreground whitespace-pre-line">
                  {selectedNews.fullContent}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
