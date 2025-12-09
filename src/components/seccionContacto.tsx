import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, MessageCircle, Facebook, Instagram, Mail } from "lucide-react"
import { X } from "lucide-react"

export function SeccionContacto() {
  const whatsappNumber = "573001234567" // Número sin espacios ni caracteres especiales
  const phoneNumber = "018000123456"

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            <MessageCircle className="h-3 w-3 mr-1" />
            Contáctanos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            ¿Listo para ser parte de <span className="text-primary">Apostar</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comunícate con nosotros directamente. Estamos aquí para ayudarte a iniciar tu camino como aliado comercial.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20ser%20aliado%20de%20Apostar`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Card className="h-full border-2 border-[#25D366]/20 hover:border-[#25D366] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                  <MessageCircle className="h-10 w-10 text-[#25D366] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp</h3>
                <p className="text-2xl font-bold text-[#25D366] mb-3">+57 300 123 4567</p>
                <p className="text-sm text-muted-foreground">
                  Chatea con nosotros en tiempo real
                </p>
              </CardContent>
            </Card>
          </a>

          {/* Phone Card */}
          <a href={`tel:${phoneNumber}`} className="block group">
            <Card className="h-full border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Línea Directa</h3>
                <p className="text-2xl font-bold text-primary mb-3">01 8000 123 456</p>
                <p className="text-sm text-muted-foreground">
                  Llámanos de lunes a sábado
                </p>
              </CardContent>
            </Card>
          </a>

          {/* Email Card */}
          <a href="mailto:aliados@apostar.com.co" className="block group">
            <Card className="h-full border-2 border-secondary/20 hover:border-secondary hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Mail className="h-10 w-10 text-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Correo Electrónico</h3>
                <p className="text-lg font-bold text-secondary mb-3">aliados@apostar.com.co</p>
                <p className="text-sm text-muted-foreground">
                  Escríbenos tus consultas
                </p>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Social Media & Location */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Social Media */}
          <Card className="border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="text-primary">Síguenos</span> en Redes Sociales
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://facebook.com/apostar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-[#1877F2]/10 rounded-lg hover:bg-[#1877F2]/20 transition-colors group"
                >
                  <Facebook className="h-8 w-8 text-[#1877F2] group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-foreground">Facebook</p>
                    <p className="text-xs text-muted-foreground">@apostar</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/apostarrisaralda?igsh=MXZ6YTJlbW1idm5iYw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 rounded-lg hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 transition-colors group"
                >
                  <Instagram className="h-8 w-8 text-[#E4405F] group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-foreground">Instagram</p>
                    <p className="text-xs text-muted-foreground">@apostar</p>
                  </div>
                </a>

                <a
                  href="https://x.com/ApostarSA?t=LLAF8Ztu9DJ7NW9ElJsV7Q&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-[#1DA1F2]/10 rounded-lg hover:bg-[#1DA1F2]/20 transition-colors group"
                >
                  <X className="h-8 w-8 text-black group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-foreground">X</p>
                    <p className="text-xs text-muted-foreground">@apostar</p>
                  </div>
                </a>

                <a
                  href="https://www.youtube.com/@ApostarSuRed "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-[#FF0000]/10 rounded-lg hover:bg-[#FF0000]/20 transition-colors group"
                >
                  <svg className="h-8 w-8 text-[#FF0000] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">YouTube</p>
                    <p className="text-xs text-muted-foreground">@apostar</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Nuestra Ubicación
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-1">Sede Principal</p>
                  <p className="text-muted-foreground">Cra 6 # 17 - 33</p>
                  <p className="text-muted-foreground">Pereira, Risaralda</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Horario de Atención:</p>
                  <p className="font-semibold text-foreground">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p className="font-semibold text-foreground">Sábados: 9:00 AM - 1:00 PM</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white mt-4"
                  onClick={() => window.open('https://maps.google.com/?q=Cra+6+17-33+Pereira+Risaralda', '_blank')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Ver en Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Tienes dudas? ¡Contáctanos ahora!
          </h3>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte a convertir tu negocio en un punto de venta exitoso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold"
              onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Hola,%20quiero%20ser%20aliado%20de%20Apostar`, '_blank')}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chatear por WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold"
              onClick={() => window.location.href = `tel:${phoneNumber}`}
            >
              <Phone className="h-5 w-5 mr-2" />
              Llamar Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
