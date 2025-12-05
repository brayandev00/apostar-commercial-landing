import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle2 } from "lucide-react"

export function DeliverySection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Column */}
                    <div className="flex-1 w-full relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                                <img
                                    src="/images/DomicilioApos.png"
                                    alt="Servicio de Domicilios Apostar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {/* Decoration */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-primary/20 rounded-2xl rounded-tr-[5rem]" />
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                        <Badge variant="secondary" className="mb-4">
                            <Truck className="h-3 w-3 mr-1" />
                            Cobertura Total
                        </Badge>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                            Servicio a <span className="text-primary">Domicilio</span>
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Tenemos el servicio a domicilio Apostar disponible para que nuestros clientes de Pereira, Dosquebradas, Cuba y Santa Rosa de Cabal puedan adquirir los servicios desde su casa o lugar de trabajo.
                        </p>

                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm mb-8">
                            <h3 className="font-bold text-foreground mb-4">Parámetros del Servicio:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground"><span className="font-semibold">Sin Costo:</span> Nuestro servicio a domicilio es gratuito.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground"><span className="font-semibold">Horario:</span> Lunes a Sábado 8:00 a.m. a 5:00 p.m. (Domingos y Festivos no prestamos servicio).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground"><span className="font-semibold">Pagos:</span> Giros, Recaudos y Recargas únicamente en efectivo.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground"><span className="font-semibold">Restricción:</span> Pago de Facturas con restricción en recaudo Energía de Pereira.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary p-3 rounded-full text-primary-foreground">
                                    <Truck className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Líneas de atención</p>
                                    <p className="text-lg font-bold text-foreground">(606) 347 0046 / 314 794 2899</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}
