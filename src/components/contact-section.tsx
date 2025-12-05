import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              <MessageCircle className="h-3 w-3 mr-1" />
              Únete a la Familia
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              ¿Listo para crecer con <span className="text-primary">Apostar</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              No dejes pasar la oportunidad de convertir tu negocio en un referente de tu comunidad.
              Unirte es fácil, rápido y contarás con el respaldo de la marca líder en la región.
            </p>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Canales de Atención Exclusiva</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Línea de Aliados VIP</p>
                    <p className="text-primary font-bold">01 8000 123 456</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp Directo</p>
                    <p className="text-[#25D366] font-bold">+57 300 123 4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>Cra 6 # 17 - 33

                Pereira, Risaralda</span>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-border">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Envíanos un Mensaje</h3>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nombre</label>
                    <Input placeholder="Tu nombre" className="bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Código de Aliado</label>
                    <Input placeholder="Ej: ALI-12345" className="bg-background" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Correo Electrónico</label>
                  <Input type="email" placeholder="tu@correo.com" className="bg-background" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Asunto</label>
                  <Input placeholder="¿En qué podemos ayudarte?" className="bg-background" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                  <Textarea placeholder="Describe tu consulta o solicitud..." className="bg-background min-h-[120px]" />
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
