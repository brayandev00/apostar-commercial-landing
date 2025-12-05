import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/images/LogoApos.png" alt="Apostar" className="h-auto w-32 mb-4" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Tu aliado estratégico en el negocio de los juegos de azar. A tu lado, siempre.
            </p>
          </div>

          {/* Contact Info from Image */}
          <div>
            <h4 className="font-bold mb-4 text-secondary">Sede Principal</h4>
            <div className="space-y-4 text-sm text-primary-foreground/80">
              <div>
                <p className="font-semibold text-white">Dirección:</p>
                <p>Cra 6 # 17 - 33</p>
                <p>Pereira, Risaralda</p>
              </div>
              <div>
                <p className="font-semibold text-white">Contacto:</p>
                <p>PBX: 334 00 43 EXT. 2</p>
                <p>Cel: 320 766 2365</p>
                <p className="text-xs break-words">servicioalcliente@apostar.com.co</p>
              </div>
            </div>
          </div>

          {/* Domicilios Info */}
          <div className="md:col-span-2 bg-secondary/10 p-6 rounded-xl border border-secondary/20">
            <h4 className="font-bold mb-4 text-secondary flex items-center gap-2">
              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">Nuevo</span>
              Servicio a Domicilio
            </h4>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-white mb-1">Líneas de Atención:</p>
                <p className="font-mono text-lg font-bold text-white">(606) 347 0046</p>
                <p className="font-mono text-lg font-bold text-white">314 794 2899</p>
                <p className="text-xs text-primary-foreground/60 mt-2">Sin costo de servicio</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Horarios:</p>
                <p>Lunes a Sábado</p>
                <p>8:00 a.m. - 5:00 p.m.</p>
                <p className="text-xs text-secondary mt-1 font-medium">*Domingos y Festivos no hay servicio</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-primary-foreground/60">
          <div className="flex flex-col gap-2">
            <p>© 2025 Apostar. Todos los derechos reservados.</p>
            <p className="text-xs">Vigilado Supersalud</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 items-center">
            <span className="font-semibold text-primary-foreground/40 text-xs uppercase tracking-widest">Pagos Seguros con</span>
            <span className="font-bold text-white">placetopay</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
