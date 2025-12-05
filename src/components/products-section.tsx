import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ticket, FileText, Smartphone, CreditCard, LayoutGrid } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Juegos de Suerte y Azar",
    description: "Chance, Loterías, Baloto y más. La ilusión de ganar siempre atrae clientes.",
    icon: Ticket,
    available: true,
    category: "Entretenimiento",
  },
  {
    id: 2,
    name: "Recargas y Paquetes",
    description: "Mantén a tus vecinos conectados. Recargas a todos los operadores móviles.",
    icon: Smartphone,
    available: true,
    category: "Conectividad",
  },
  {
    id: 3,
    name: "Pagos de Servicios",
    description: "Convierte tu local en un punto de pago de facturas. Tráfico garantizado cada mes.",
    icon: FileText,
    available: true,
    category: "Servicios",
  },
  {
    id: 4,
    name: "Giros Nacionales",
    description: "Envío y recepción de dinero. Un servicio esencial para la comunidad.",
    icon: CreditCard,
    available: true,
    category: "Financiero",
  },
]

export function ProductsSection() {
  return (
    <section id="productos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <LayoutGrid className="h-3 w-3 mr-1" />
            Portafolio Integral
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Soluciones que tus vecinos buscan a diario</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            "Convierte tu negocio en el banco y centro de entretenimiento del barrio".
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 text-center"
            >
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <product.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                <Badge variant="outline" className="mb-3 text-xs">
                  {product.category}
                </Badge>

                <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.description}</p>

                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Solicitar Activación
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-card rounded-2xl p-8 border border-border">
          <h3 className="text-xl font-bold text-foreground mb-2">¿Necesitas algo más?</h3>
          <p className="text-muted-foreground mb-4">
            Contáctanos para solicitar productos especiales o cantidades grandes.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Hacer Pedido Especial</Button>
        </div>
      </div>
    </section>
  )
}
