import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Laptop, Wifi, ArrowRight } from "lucide-react"

export function DigitalEcosystemSection() {
    return (
        <section className="py-20 bg-background overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Content Column */}
                    <div className="flex-1 order-2 lg:order-1 text-left">
                        <Badge variant="outline" className="mb-4 border-primary text-primary">
                            <Wifi className="h-3 w-3 mr-1" />
                            Ecosistema Digital
                        </Badge>

                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Apostar <span className="text-primary">Online</span>
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Apostar Online es la plataforma digital de Apostar, que ofrece a sus usuarios una variedad de servicios y opciones de entretenimiento en línea. Esta plataforma permite a los jugadores disfrutar de juegos de azar como chance y comprar loterías en línea, desde la comodidad de sus hogares.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary mt-1">
                                    <Laptop className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Servicios y Pagos</h3>
                                    <p className="text-muted-foreground">
                                        Además, Apostar Online ofrece una variedad de servicios de pago, incluyendo la posibilidad de recargar datos móviles y de telefonía celular. Los usuarios también pueden pagar sus servicios públicos en línea.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-secondary/10 rounded-lg text-secondary mt-1">
                                    <Wifi className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Experiencia Completa</h3>
                                    <p className="text-muted-foreground">
                                        Con Apostar Online, los usuarios tienen la oportunidad de disfrutar de una experiencia completa de entretenimiento y servicios en línea, con la comodidad de poder acceder a ellos desde cualquier lugar con conexión a internet.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                            Conocer más sobre Apostar Online
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Image Column */}
                    <div className="flex-1 order-1 lg:order-2 w-full">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card p-2">
                            <div className="aspect-video bg-muted flex items-center justify-center rounded-xl overflow-hidden">
                                <img
                                    src="/images/AposOnline.png"
                                    alt="Plataforma Apostar Online"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-background border border-border p-4 rounded-xl shadow-lg hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Estado del sistema</p>
                                        <p className="text-sm font-bold text-foreground">100% Operativo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
