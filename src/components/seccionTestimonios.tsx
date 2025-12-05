import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SeccionTestimonios() {
    const testimonials = [
        {
            name: "María González",
            role: "Dueña de Droguería El Sol",
            content: "Desde que puse el punto de Apostar, el flujo de gente en mi droguería aumentó muchísimo. La gente viene por un chance y termina comprando medicinas.",
            rating: 5,
        },
        {
            name: "Carlos Rodríguez",
            role: "Supermercado La 14",
            content: "La plataforma es súper rápida y nunca se cae. Mis empleados aprendieron a usarla en media hora. Las comisiones pagan el arriendo.",
            rating: 5,
        },
        {
            name: "Ana Martínez",
            role: "Papelería Central",
            content: "El soporte es excelente. Si tengo una duda, me contestan de una. Me siento muy respaldada por la marca.",
            rating: 5,
        },
    ]

    return (
        <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Lo que dicen nuestros <span className="text-primary">Aliados</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Historias reales de negocios que crecieron con nosotros.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-none shadow-md bg-background relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Quote className="h-24 w-24 text-primary rotate-180" />
                            </div>
                            <CardContent className="p-8 pt-12 relative z-10">
                                <div className="flex gap-1 mb-6 text-yellow-400">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>

                                <p className="text-muted-foreground text-lg italic mb-8 relative">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
                                        <img
                                            src={`https://i.pravatar.cc/150?u=${index}`}
                                            alt={testimonial.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-primary">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
