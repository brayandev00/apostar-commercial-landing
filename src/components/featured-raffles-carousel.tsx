"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, ArrowRight, Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"

const featuredRaffles = [
    {
        id: 1,
        name: "Mega Sorteo Navideño",
        prize: "$500,000,000",
        date: "24 Dic 2025",
        timeLeft: "Faltan 26 días",
        participants: "125,000+ participantes",
        gradient: "from-red-600 via-red-500 to-orange-500",
    },
    {
        id: 2,
        name: "Baloto Acumulado",
        prize: "$25,000,000,000",
        date: "02 Dic 2025",
        timeLeft: "Faltan 4 días",
        participants: "500,000+ participantes",
        gradient: "from-purple-600 via-purple-500 to-pink-500",
    },
    {
        id: 3,
        name: "Extra de Colombia",
        prize: "$12,000,000,000",
        date: "05 Dic 2025",
        timeLeft: "Faltan 7 días",
        participants: "200,000+ participantes",
        gradient: "from-blue-600 via-blue-500 to-cyan-500",
    },
    {
        id: 4,
        name: "Super Astro Especial",
        prize: "$100,000,000",
        date: "15 Dic 2025",
        timeLeft: "Faltan 17 días",
        participants: "78,000+ participantes",
        gradient: "from-green-600 via-green-500 to-emerald-500",
    },
    {
        id: 5,
        name: "Lotería de Bogotá Premium",
        prize: "$8,500,000,000",
        date: "10 Dic 2025",
        timeLeft: "Faltan 12 días",
        participants: "150,000+ participantes",
        gradient: "from-amber-600 via-amber-500 to-yellow-500",
    },
]

export function FeaturedRafflesCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { align: "center", loop: true },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
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
                            {featuredRaffles.map((raffle) => (
                                <div key={raffle.id} className="flex-[0_0_100%] min-w-0 px-4">
                                    <Card className="border-0 shadow-2xl overflow-hidden max-w-4xl mx-auto">
                                        <CardContent className={`p-0 bg-gradient-to-br ${raffle.gradient} relative`}>
                                            {/* Decorative circles */}
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />

                                            <div className="relative z-10 p-8 md:p-12">
                                                {/* Badge */}
                                                <div className="mb-6">
                                                    <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400 border-0 px-4 py-1">
                                                        <Star className="h-3 w-3 mr-1 inline fill-yellow-900" />
                                                        Sorteo Destacado
                                                    </Badge>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                                    {raffle.name}
                                                </h3>

                                                {/* Prize */}
                                                <p className="text-5xl md:text-7xl font-black text-yellow-300 mb-8 tracking-tight">
                                                    {raffle.prize}
                                                </p>

                                                {/* Info Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                    <div className="flex items-center gap-2 text-white/90">
                                                        <Calendar className="h-5 w-5" />
                                                        <span className="font-medium">{raffle.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/90">
                                                        <Clock className="h-5 w-5" />
                                                        <span className="font-medium">{raffle.timeLeft}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/90">
                                                        <Users className="h-5 w-5" />
                                                        <span className="font-medium">{raffle.participants}</span>
                                                    </div>
                                                </div>

                                                {/* CTA Button */}
                                                <Button
                                                    size="lg"
                                                    className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 font-bold px-8 border-0 shadow-lg hover:shadow-xl transition-all"
                                                >
                                                    Ver Material Promocional
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-8">
                        {featuredRaffles.map((_, index) => (
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
