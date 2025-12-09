"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2, Save, Ticket, Smartphone, FileText, CreditCard, CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Product {
    id: number | string
    name: string
    description: string
    icon: string
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

export function ProductsManager() {
    const { toast } = useToast()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await fetch(`/api/productos?t=${Date.now()}`)
            if (!res.ok) throw new Error("Error fetching products")
            const data = await res.json()
            setProducts(data)
            if (data.length > 0 && !selectedProduct) {
                setSelectedProduct(data[0])
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
        setSaving(true)
        try {
            const res = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(products),
            })

            if (!res.ok) throw new Error("Error saving products")

            toast({
                title: "Éxito",
                description: "Productos actualizados correctamente",
            })
        } catch (error) {
            console.error("Error:", error)
            toast({
                title: "Error",
                description: "No se pudieron guardar los cambios",
                variant: "destructive",
            })
        } finally {
            setSaving(false)
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
        })
    }

    const handleDeleteProduct = (id: number | string) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return
        setProducts(products.filter(p => p.id !== id))
        toast({
            title: "Producto Eliminado",
            description: "No olvides guardar los cambios para hacerlo permanente.",
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
                    <Button variant="outline" onClick={handleAddProduct}>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Nuevo
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Guardar Cambios
                    </Button>
                </div>
            </div>

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
                                        <Label>Icono Lucide (Nombre)</Label>
                                        <Input
                                            value={product.icon}
                                            onChange={(e) => updateProduct(product.id, 'icon', e.target.value)}
                                        />
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
