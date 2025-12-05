import { Button } from "@/components/ui/button"
import { Megaphone, Target, DollarSign, Award } from "lucide-react"

export function PromotionsSection() {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Background patterned overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full backdrop-blur-sm mb-6">
                        <Megaphone className="h-6 w-6 mr-2 text-white" />
                        <span className="font-semibold">El Gancho de Marketing</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        No gastes en publicidad, <br />
                        <span className="text-yellow-400">nosotros lo hacemos por ti</span>
                    </h2>

                    <p className="text-xl text-primary-foreground/90 leading-relaxed">
                        "Nosotros ponemos los premios, las campañas y la publicidad masiva. Tú solo pones el punto de venta y <strong className="text-white border-b-2 border-white/30">ganas la comisión</strong>."
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-colors">
                        <Award className="h-12 w-12 text-yellow-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Premios Millonarios</h3>
                        <p className="text-primary-foreground/80">
                            Sorteos constantes con premios gigantescos que atraen tráfico a tu local automáticamente.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-colors">
                        <Target className="h-12 w-12 text-yellow-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Publicidad Masiva</h3>
                        <p className="text-primary-foreground/80">
                            Presencia en radio, redes, vallas y TV. Todo mundo conoce Apostar, tu trabajo es solo atenderlos.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/20 transition-colors">
                        <DollarSign className="h-12 w-12 text-yellow-400 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Comisión Neta</h3>
                        <p className="text-primary-foreground/80">
                            Sin costos ocultos de marketing. Cada venta es ganancia directa para tu bolsillo.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                        ¡Me interesa este modelo!
                    </Button>
                </div>

            </div>
        </section>
    )
}
