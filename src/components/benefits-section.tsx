import { TrendingUp, ShieldCheck, Smile } from "lucide-react"

export function BenefitsSection() {
    const benefits = [
        {
            icon: TrendingUp,
            title: "Alta Rentabilidad",
            description: "Gana comisiones competitivas por cada transacción. Tu negocio crece con nosotros.",
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            icon: ShieldCheck,
            title: "Respaldo y Confianza",
            description: "Somos la marca líder en la región. Tus clientes ya nos conocen y confían en nosotros.",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            icon: Smile,
            title: "Facilidad de Uso",
            description: "Plataformas intuitivas y capacitación constante para que vendas sin complicaciones.",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
    ]

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                        ¿Por qué ser aliado <span className="text-primary">Apostar?</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Más que un proveedor, somos tu socio estratégico para el crecimiento.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="group relative p-8 bg-card rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className={`w-16 h-16 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <benefit.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
