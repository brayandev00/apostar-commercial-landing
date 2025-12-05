import { Badge } from "@/components/ui/badge"
import { Laptop, Wifi, Smartphone, CreditCard, Shield, Zap } from "lucide-react"

export function SeccionApostarOnline() {
    return (
        <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Content Column */}
                    <div className="flex-1 order-2 lg:order-1">
                        <Badge variant="outline" className="mb-6 border-primary text-primary text-sm px-4 py-1">
                            <Wifi className="h-4 w-4 mr-2" />
                            Plataforma Digital
                        </Badge>

                        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Apostar <span className="text-primary">Online</span>
                        </h2>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            La plataforma digital que ofrece entretenimiento y servicios en línea. Juegos de azar, loterías, recargas y pagos desde cualquier lugar.
                        </p>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                                    <Laptop className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Juegos en Línea</h3>
                                    <p className="text-sm text-muted-foreground">Chance y loterías desde casa</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all">
                                <div className="p-3 bg-secondary/10 rounded-lg text-secondary flex-shrink-0">
                                    <Smartphone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Recargas Móviles</h3>
                                    <p className="text-sm text-muted-foreground">Todos los operadores</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all">
                                <div className="p-3 bg-[#FFD700]/20 rounded-lg text-[#C41E3A] flex-shrink-0">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Pago de Servicios</h3>
                                    <p className="text-sm text-muted-foreground">Servicios públicos online</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                                    <Shield className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">100% Seguro</h3>
                                    <p className="text-sm text-muted-foreground">Plataforma confiable</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-6 border-t border-border">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Zap className="h-5 w-5 text-primary" />
                                    <p className="text-3xl font-bold text-foreground">24/7</p>
                                </div>
                                <p className="text-sm text-muted-foreground">Disponible siempre</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    <p className="text-3xl font-bold text-foreground">100%</p>
                                </div>
                                <p className="text-sm text-muted-foreground">Operativo</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="flex-1 order-1 lg:order-2 w-full">
                        <div className="relative">
                            {/* Main Image Container */}
                            {/* Main Image Container */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-0 ring-1 ring-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg transform hover:scale-105 transition-all duration-500 group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="aspect-[16/10] bg-white/5 p-6 backdrop-blur-sm relative z-10 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                                    <img
                                        src="/images/AposOnline.png"
                                        alt="Plataforma Apostar Online"
                                        className="w-full h-full object-contain drop-shadow-2xl relative z-20"
                                    />
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-background border-2 border-primary p-6 rounded-2xl shadow-2xl hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse" />
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Estado del sistema</p>
                                        <p className="text-lg font-bold text-foreground">100% Operativo</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
