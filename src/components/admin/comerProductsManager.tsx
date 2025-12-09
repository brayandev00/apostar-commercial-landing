"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2, Save, Ticket, Smartphone, FileText, CreditCard, CheckCircle2, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Product {
    id: number | string
    name: string
    description: string
    icon: string
    image?: string
    available: boolean
    category: string
    details: {
        fullDescription: string
        benefits: string[]
        requirements: string[]
        commission: string
        minInvestment: string
    }
}

import "@/styles/comerAdmin.css"

export function ComerProductsManager() {
    const { toast } = useToast()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const [processing, setProcessing] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await fetch(`/api/productos?t=${Date.now()}`)
            if (!res.ok) throw new Error("Error fetching products")
            const data = await res.json()
            if (Array.isArray(data)) {
                setProducts(data)
                if (data.length > 0 && !selectedProduct) {
                    setSelectedProduct(data[0])
                }
            } else {
                setProducts([])
                throw new Error("Invalid data format received")
            }
        } catch (error) {
            console.error("Error:", error)
            toast({
                title: "Error",
                description: "No se pudieron cargar los productos",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setProcessing(true) // Start blocking loading
        try {
            const res = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(products),
            })

            if (!res.ok) throw new Error("Error saving products")

            toast({
                title: "¡Guardado Exitoso!",
                description: "Los cambios se han reflejado en la página.",
                duration: 3000,
                variant: "success"
            })
        } catch (error) {
            console.error("Error:", error)
            toast({
                title: "Error al guardar",
                description: "No se pudieron guardar los cambios. Intente nuevamente.",
                variant: "destructive",
            })
        } finally {
            setTimeout(() => setProcessing(false), 500) // Small artificial delay for UX feel
        }
    }

    const updateProduct = (id: number | string, field: string, value: any) => {
        setProducts(products.map(p => {
            if (p.id === id) {
                if (field.includes('.')) {
                    const [parent, child] = field.split('.')
                    return {
                        ...p,
                        [parent]: {
                            ...(p as any)[parent],
                            [child]: value
                        }
                    }
                }
                return { ...p, [field]: value }
            }
            return p
        }))
    }

    const updateDetailsList = (id: number | string, type: 'benefits' | 'requirements', index: number, value: string) => {
        setProducts(products.map(p => {
            if (p.id === id) {
                const newList = [...p.details[type]]
                newList[index] = value
                return {
                    ...p,
                    details: {
                        ...p.details,
                        [type]: newList
                    }
                }
            }
            return p
        }))
    }

    const addListItem = (id: number | string, type: 'benefits' | 'requirements') => {
        setProducts(products.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    details: {
                        ...p.details,
                        [type]: [...p.details[type], ""]
                    }
                }
            }
            return p
        }))
    }

    const removeListItem = (id: number | string, type: 'benefits' | 'requirements', index: number) => {
        setProducts(products.map(p => {
            if (p.id === id) {
                const newList = [...p.details[type]]
                newList.splice(index, 1)
                return {
                    ...p,
                    details: {
                        ...p.details,
                        [type]: newList
                    }
                }
            }
            return p
        }))
    }
    const handleAddProduct = () => {
        const newId = Date.now()
        const newProduct: Product = {
            id: newId,
            name: "Nuevo Producto",
            description: "Descripción corta del producto...",
            icon: "Star", // Default icon
            available: true,
            category: "General",
            details: {
                fullDescription: "Descripción detallada...",
                benefits: ["Beneficio 1"],
                requirements: ["Requisito 1"],
                commission: "0%",
                minInvestment: "$0"
            }
        }
        setProducts([...products, newProduct])
        toast({
            title: "Producto Agregado",
            description: "Se ha creado un nuevo producto. Edítalo y guarda los cambios.",
            variant: "success",
        })
    }

    const handleImageUpload = (id: number | string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            updateProduct(id, 'image', reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleDeleteProduct = (id: number | string) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return
        setProducts(products.filter(p => p.id !== id))
        toast({
            title: "Producto Eliminado",
            description: "No olvides guardar los cambios para hacerlo permanente.",
            variant: "success",
        })
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <div>
                    <h2 className="text-xl font-bold">Portafolio de Productos</h2>
                    <p className="text-sm text-muted-foreground">Gestiona los productos visibles en la web.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleAddProduct} disabled={processing}>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Nuevo
                    </Button>
                    <Button onClick={handleSave} disabled={processing} className={processing ? "opacity-80" : ""}>
                        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {processing ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </div>
            </div>

            {/* Blocking Overlay */}
            {processing && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-lg font-medium animate-pulse">Guardando cambios...</p>
                    </div>
                </div>
            )}

            <Tabs defaultValue={products[0]?.id.toString()} className="w-full">
                <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start mb-4">
                    {products.map(product => (
                        <TabsTrigger
                            key={product.id}
                            value={product.id.toString()}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border"
                        >
                            {product.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {products.map(product => (
                    <TabsContent key={product.id} value={product.id.toString()}>
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Editar {product.name}</CardTitle>
                                        <CardDescription>Modifica la información visible en la página web.</CardDescription>
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Eliminar Producto
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Nombre del Producto</Label>
                                        <Input
                                            value={product.name}
                                            onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Categoría</Label>
                                        <Input
                                            value={product.category}
                                            onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Icono Lucide (Opcional si hay imagen)</Label>
                                        <Input
                                            value={product.icon}
                                            onChange={(e) => updateProduct(product.id, 'icon', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Imagen Personalizada</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors bg-muted/10 relative group/dropzone">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(product.id, e)}
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                                id={`img-${product.id}`}
                                            />

                                            {product.image ? (
                                                <div className="relative w-full aspect-video max-w-[200px] overflow-hidden rounded-lg shadow-sm">
                                                    <img src={product.image} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/dropzone:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                                                        <span className="text-white text-xs font-medium">Click para cambiar</span>
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        variant="destructive"
                                                        className="absolute top-1 right-1 h-6 w-6 z-30"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            e.stopPropagation()
                                                            updateProduct(product.id, 'image', undefined)
                                                        }}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                    <div className="bg-muted p-3 rounded-full">
                                                        <Upload className="h-6 w-6" />
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="font-semibold text-primary">Haz click para subir</span>
                                                        <p className="text-xs">o arrastra y suelta una imagen</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Comisión</Label>
                                        <Input
                                            value={product.details.commission}
                                            onChange={(e) => updateProduct(product.id, 'details.commission', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Descripción Corta</Label>
                                    <Textarea
                                        value={product.description}
                                        onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Descripción Completa</Label>
                                    <Textarea
                                        value={product.details.fullDescription}
                                        onChange={(e) => updateProduct(product.id, 'details.fullDescription', e.target.value)}
                                        className="h-24"
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label>Beneficios</Label>
                                            <Button size="sm" variant="outline" onClick={() => addListItem(product.id, 'benefits')}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {product.details.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input
                                                    value={benefit}
                                                    onChange={(e) => updateDetailsList(product.id, 'benefits', idx, e.target.value)}
                                                />
                                                <Button size="icon" variant="ghost" onClick={() => removeListItem(product.id, 'benefits', idx)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label>Requisitos</Label>
                                            <Button size="sm" variant="outline" onClick={() => addListItem(product.id, 'requirements')}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {product.details.requirements.map((req, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input
                                                    value={req}
                                                    onChange={(e) => updateDetailsList(product.id, 'requirements', idx, e.target.value)}
                                                />
                                                <Button size="icon" variant="ghost" onClick={() => removeListItem(product.id, 'requirements', idx)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
