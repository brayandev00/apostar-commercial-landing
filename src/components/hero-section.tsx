import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <Badge className="bg-secondary text-secondary-foreground mb-6 text-sm px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Portal Exclusivo para Aliados
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight text-balance">
              Haz crecer tu negocio con
              <span className="text-secondary block">Apostar</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Únete a la red de aliados más grande de la región. Ofrece los mejores juegos y servicios, atrae más
              clientes y aumenta tus ingresos con nuestras excelentes comisiones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                Quiero ser Aliado
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Ver Tabla de Comisiones
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl scale-110" />
              <img src="/images/LogoApos.png" alt="Comunicación con aliados" className="relative w-full max-w-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
