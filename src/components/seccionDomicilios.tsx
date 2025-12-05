import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle2, Phone, Clock, MapPin, DollarSign } from "lucide-react"

export function SeccionDomicilios() {
    return (
        <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Image Column */}
                    <div className="flex-1 w-full relative">
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white transform hover:rotate-0 rotate-2 transition-all duration-500">
                                <div className="aspect-[16/10] bg-white p-4">
                                    <img
                                        src="/images/DomicilioApos.png"
                                        alt="Servicio de Domicilios Apostar"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Decorative Border */}
                            <div className="absolute -z-10 top-8 -left-8 w-full h-full border-4 border-primary/20 rounded-3xl" />

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-2xl hidden md:block">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-8 w-8" />
                                    <div>
                                        <p className="text-sm font-medium opacity-90">Servicio</p>
                                        <p className="text-2xl font-bold">GRATIS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                        <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
                            <Truck className="h-4 w-4 mr-2" />
                            Servicio a Domicilio
                        </Badge>

                        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Llevamos Apostar <span className="text-primary">a tu puerta</span>
                        </h2>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Servicio a domicilio disponible en Pereira, Dosquebradas, Cuba y Santa Rosa de Cabal.
                        </p>

                        {/* Service Details */}
                        <div className="bg-card p-8 rounded-2xl border-2 border-border shadow-lg mb-8">
                            <h3 className="font-bold text-foreground mb-6 text-xl flex items-center gap-2">
                                <CheckCircle2 className="h-6 w-6 text-primary" />
                                Condiciones del Servicio
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#FFD700]/20 rounded-lg text-[#C41E3A] flex-shrink-0">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Sin Costo</p>
                                        <p className="text-sm text-muted-foreground">Servicio completamente gratuito</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Horario</p>
                                        <p className="text-sm text-muted-foreground">Lunes a Sábado: 8:00 a.m. - 5:00 p.m.</p>
                                        <p className="text-xs text-muted-foreground mt-1">*Domingos y festivos no hay servicio</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-600 flex-shrink-0">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Cobertura</p>
                                        <p className="text-sm text-muted-foreground">Pereira • Dosquebradas • Cuba • Santa Rosa de Cabal</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-[#FFD700]/20 rounded-lg text-[#C41E3A] flex-shrink-0">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Forma de Pago</p>
                                        <p className="text-sm text-muted-foreground">Efectivo para Giros, Recaudos y Recargas</p>
                                        <p className="text-xs text-muted-foreground mt-1">*Restricción: Energía de Pereira</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-gradient-to-r from-primary to-primary/90 p-6 rounded-2xl text-white shadow-xl">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                                    <Phone className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-sm opacity-90 font-medium">Líneas de Atención</p>
                                    <p className="text-2xl font-bold">(606) 347 0046</p>
                                    <p className="text-xl font-bold">314 794 2899</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}
