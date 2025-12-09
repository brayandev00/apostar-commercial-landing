"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Ticket, FileText, Smartphone, CreditCard, LayoutGrid, CheckCircle2, Info, Star, Shield, Zap, Home, ShoppingBag as ShoppingCart } from "lucide-react"

// Icon mapping for configuration
const ICON_MAP: Record<string, any> = {
  LayoutGrid,
  Star,
  Shield,
  Zap,
  Ticket,
  FileText,
  Smartphone,
  CreditCard,
  CheckCircle2,
  Info,
  Home,
  ShoppingCart
}

interface SeccionProductosProps {
  badgeText?: string
  badgeIconName?: string
  titleText?: string
  titleIconName?: string
  descriptionText?: string

  // Visibility Controls
  showBadge?: boolean
  showTitle?: boolean
  showDescription?: boolean

  // Data Override
  products?: any[]
}

export function SeccionProductos({
  badgeText = "Portafolio Integral",
  badgeIconName = "LayoutGrid",
  titleText = "Soluciones que tus vecinos buscan a diario",
  titleIconName,
  descriptionText = "Convierte tu negocio en el banco y centro de entretenimiento del barrio.",

  showBadge = true,
  showTitle = true,
  showDescription = true,

  products: initialProducts
}: SeccionProductosProps) {
  const [products, setProducts] = useState<any[]>(initialProducts || [])
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(!initialProducts)

  const BadgeIcon = ICON_MAP[badgeIconName] || LayoutGrid
  const TitleIcon = titleIconName ? ICON_MAP[titleIconName] : null

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts)
      setLoading(false)
      return
    }

    fetch(`/api/productos?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        // Map icon string names back to Lucide components if needed, 
        // but for simplicity we will render the icon dynamically or handle it.
        // Since we stored icon names as strings in JSON ("Ticket", "Smartphone", etc.),
        // we need a map to actual components.
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error("API returned non-array data:", data)
          setProducts([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [initialProducts])

  // Helper to get icon component
  const getIconComponent = (iconName: string | any) => {
    if (typeof iconName === 'string') {
      return ICON_MAP[iconName] || Star
    }
    return iconName || Star
  }

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  return (
    <section id="productos" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {showBadge && (
            <Badge variant="secondary" className="mb-4">
              <BadgeIcon className="h-3 w-3 mr-1" />
              {badgeText}
            </Badge>
          )}

          {showTitle && (
            <div className="flex items-center justify-center gap-3 mb-4">
              {TitleIcon && <TitleIcon className="h-8 w-8 text-primary" />}
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                {titleText}
              </h2>
            </div>
          )}

          {showDescription && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {descriptionText}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => {
            const ProductIcon = getIconComponent(product.icon)

            return (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <ProductIcon className="h-7 w-7" />
                    )}
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
            )
          })}
        </div>

      </div>

      {/* Product Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary overflow-hidden`}>
                    {selectedProduct.image ? (
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                    ) : (
                      (() => {
                        const SelectedIcon = getIconComponent(selectedProduct.icon)
                        return <SelectedIcon className="h-8 w-8" />
                      })()
                    )}
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
