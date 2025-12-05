"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Ticket, FileText, Smartphone, CreditCard, LayoutGrid, CheckCircle2, Info } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Juegos de Suerte y Azar",
    description: "Chance, Loterías, Baloto y más. La ilusión de ganar siempre atrae clientes.",
    icon: Ticket,
    available: true,
    category: "Entretenimiento",
    details: {
      fullDescription: "Ofrece a tus clientes la emoción de los juegos de azar más populares de Colombia. Como aliado de Apostar, tendrás acceso a una plataforma completa para vender chance, loterías, baloto y más.",
      benefits: [
        "Comisiones competitivas por cada venta",
        "Sistema de venta rápido y confiable",
        "Soporte técnico 24/7",
        "Material promocional incluido",
        "Capacitación completa del sistema"
      ],
      requirements: [
        "Local comercial establecido",
        "Conexión a internet estable",
        "Espacio para punto de venta",
        "Disponibilidad de horario comercial"
      ],
      commission: "Hasta 8% de comisión por venta",
      minInvestment: "Sin inversión inicial"
    }
  },
  {
    id: 2,
    name: "Recargas y Paquetes",
    description: "Mantén a tus vecinos conectados. Recargas a todos los operadores móviles.",
    icon: Smartphone,
    available: true,
    category: "Conectividad",
    details: {
      fullDescription: "Servicio de recargas electrónicas para todos los operadores móviles de Colombia: Claro, Movistar, Tigo, Avantel, WOM y más. Ofrece paquetes de datos, minutos y SMS.",
      benefits: [
        "Recargas instantáneas en segundos",
        "Todos los operadores disponibles",
        "Paquetes de datos y minutos",
        "Comisión por cada recarga",
        "Sin necesidad de inventario físico"
      ],
      requirements: [
        "Conexión a internet",
        "Terminal o computador",
        "Registro como aliado Apostar",
        "Capacitación básica (1 hora)"
      ],
      commission: "3-5% por recarga",
      minInvestment: "Sin inversión inicial"
    }
  },
  {
    id: 3,
    name: "Pagos de Servicios",
    description: "Convierte tu local en un punto de pago de facturas. Tráfico garantizado cada mes.",
    icon: FileText,
    available: true,
    category: "Servicios",
    details: {
      fullDescription: "Facilita a tus clientes el pago de servicios públicos y privados: energía, agua, gas, telefonía, internet, TV por cable y más. Genera tráfico constante a tu negocio.",
      benefits: [
        "Recaudo de múltiples empresas",
        "Comisión por cada transacción",
        "Clientes recurrentes cada mes",
        "Proceso rápido y seguro",
        "Reportes automáticos de transacciones"
      ],
      requirements: [
        "Local comercial activo",
        "Internet de banda ancha",
        "Impresora térmica (opcional)",
        "Horario comercial establecido"
      ],
      commission: "$500 - $2,000 por transacción",
      minInvestment: "Sin inversión inicial"
    }
  },
  {
    id: 4,
    name: "Giros Nacionales",
    description: "Envío y recepción de dinero. Un servicio esencial para la comunidad.",
    icon: CreditCard,
    available: true,
    category: "Financiero",
    details: {
      fullDescription: "Servicio de giros nacionales que permite a tus clientes enviar y recibir dinero de forma segura y rápida a cualquier parte de Colombia. Alianza con las principales redes de giros del país.",
      benefits: [
        "Envío y recepción de dinero",
        "Cobertura nacional completa",
        "Transacciones seguras y rastreables",
        "Comisión atractiva por giro",
        "Clientes de alto valor"
      ],
      requirements: [
        "Registro ante la Superintendencia",
        "Caja fuerte o lugar seguro",
        "Capital de trabajo para pagos",
        "Capacitación en normativa financiera"
      ],
      commission: "1-3% del valor del giro",
      minInvestment: "Capital de trabajo recomendado: $2,000,000"
    }
  },
]

export function SeccionProductos() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewDetails = (product: typeof products[0]) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  return (
    <section id="productos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <LayoutGrid className="h-3 w-3 mr-1" />
            Portafolio Integral
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Soluciones que tus vecinos buscan a diario
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convierte tu negocio en el banco y centro de entretenimiento del barrio.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <product.icon className="h-7 w-7" />
                </div>

                <Badge variant="outline" className="mb-3 text-xs">
                  {product.category}
                </Badge>

                <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{product.description}</p>

                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleViewDetails(product)}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      {/* Product Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                    <selectedProduct.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                    <Badge variant="outline" className="mt-1">{selectedProduct.category}</Badge>
                  </div>
                </div>
                <DialogDescription className="text-base leading-relaxed pt-2">
                  {selectedProduct.details.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Beneficios
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.details.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Requisitos
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.details.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Financial Info */}
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Comisión</p>
                    <p className="text-lg font-bold text-primary">{selectedProduct.details.commission}</p>
                  </div>
                  <div className="bg-secondary/5 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Inversión Inicial</p>
                    <p className="text-lg font-bold text-foreground">{selectedProduct.details.minInvestment}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    Solicitar Activación de {selectedProduct.name}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
