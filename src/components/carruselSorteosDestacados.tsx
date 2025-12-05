"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Star, ExternalLink } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"

interface FeaturedRaffle {
    id: number
    titulo: string
    descripcion: string
    imagen: string
    fechaSorteo: string
    enlace?: string
    activo: boolean
}

export function CarruselSorteosDestacados() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { align: "center", loop: true },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [raffles, setRaffles] = useState<FeaturedRaffle[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/sorteos-destacados?t=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                const activeRaffles = data.filter((r: FeaturedRaffle) => r.activo)
                setRaffles(activeRaffles)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error loading featured raffles:", err)
                setLoading(false)
            })
    }, [])

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

    if (loading || raffles.length === 0) return null

    const gradients = [
        "from-red-600 via-red-500 to-orange-500",
        "from-purple-600 via-purple-500 to-pink-500",
        "from-blue-600 via-blue-500 to-cyan-500",
        "from-green-600 via-green-500 to-emerald-500",
        "from-amber-600 via-amber-500 to-yellow-500",
    ]

    return (
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge variant="default" className="mb-4 bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1 inline" />
                        Sorteos Importantes
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                        Sorteos Destacados del Mes
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Los sorteos más esperados con los premios más grandes. No te pierdas estas oportunidades únicas.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {raffles.map((raffle, idx) => (
                                <div key={raffle.id} className="flex-[0_0_100%] min-w-0 px-4">
                                    <Card className="border-0 shadow-2xl overflow-hidden max-w-4xl mx-auto">
                                        <CardContent className="p-0 relative">
                                            {/* Background Image */}
                                            {/* Background Image */}
                                            {raffle.imagen && (
                                                <>
                                                    <img
                                                        src={raffle.imagen}
                                                        alt={raffle.titulo}
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                    />
                                                    {/* Subtle Gradient Overlay for Text Readability */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                                </>
                                            )}
                                            {/* Fallback gradient if no image */}
                                            {!raffle.imagen && (
                                                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]}`} />
                                            )}

                                            {/* Decorative circles - only show if no image or make subtle */}
                                            {!raffle.imagen && (
                                                <>
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
                                                </>
                                            )}


                                            <div className="relative z-10 p-8 md:p-12">
                                                {/* Badge */}
                                                <div className="mb-6">
                                                    <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400 border-0 px-4 py-1">
                                                        <Star className="h-3 w-3 mr-1 inline fill-yellow-900" />
                                                        Sorteo Destacado
                                                    </Badge>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
                                                    {raffle.titulo}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-lg text-white/90 mb-6 line-clamp-2 drop-shadow-sm font-medium">
                                                    {raffle.descripcion}
                                                </p>

                                                {/* Info */}
                                                <div className="flex items-center gap-2 text-white/90 mb-8">
                                                    <Calendar className="h-5 w-5" />
                                                    <span className="font-medium">{raffle.fechaSorteo}</span>
                                                </div>

                                                {/* CTA Button */}
                                                {raffle.enlace && (
                                                    <Button
                                                        size="lg"
                                                        className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 font-bold px-8 border-0 shadow-lg hover:shadow-xl transition-all"
                                                        asChild
                                                    >
                                                        <a href={raffle.enlace} target="_blank" rel="noopener noreferrer">
                                                            Ver Más <ExternalLink className="ml-2 h-5 w-5" />
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-8">
                        {raffles.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 rounded-full transition-all ${index === selectedIndex
                                    ? "w-8 bg-primary"
                                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                onClick={() => scrollTo(index)}
                                aria-label={`Ir al sorteo ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
