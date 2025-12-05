"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

interface FeaturedRaffle {
    id: number
    titulo: string
    descripcion: string
    imagen: string
    fechaSorteo: string
    enlace?: string
    activo: boolean
}

export function SeccionSorteosDestacados() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true })
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

    if (loading || raffles.length === 0) return null

    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Badge className="mb-4 text-lg px-4 py-2">Destacados del Mes</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Sorteos Especiales
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        No te pierdas estos sorteos exclusivos con premios increíbles
                    </p>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-6">
                        {raffles.map((raffle) => (
                            <div key={raffle.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={raffle.imagen}
                                            alt={raffle.titulo}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-2xl font-bold text-white mb-2">{raffle.titulo}</h3>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <p className="text-muted-foreground mb-4 line-clamp-3">{raffle.descripcion}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                            <Calendar className="h-4 w-4" />
                                            <span>{raffle.fechaSorteo}</span>
                                        </div>
                                        {raffle.enlace && (
                                            <Button asChild className="w-full">
                                                <a href={raffle.enlace} target="_blank" rel="noopener noreferrer">
                                                    Ver Más <ExternalLink className="ml-2 h-4 w-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
