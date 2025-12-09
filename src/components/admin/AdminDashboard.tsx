"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Pencil, Trash2, Save, Upload, Image as ImageIcon, FileText } from "lucide-react"

import { ProductsManager } from "@/components/admin/ProductsManager"
import { StatisticsManager } from "@/components/admin/StatisticsManager"
import { Toaster } from "@/components/ui/toaster"

// Types
interface Raffle {
    id: number
    name: string
    prize: string
    date: string
    timeLeft: string
    participants: string
    status: string
    featured: boolean
    promotionalMaterial: {
        images: string[]
        pdfs: { name: string; url: string }[]
    }
}

interface FeaturedRaffle {
    id: number
    titulo: string
    descripcion: string
    imagen: string
    fechaSorteo: string
    enlace?: string
    activo: boolean
}

interface News {
    id: number
    titulo: string
    resumen: string
    contenido: string
    imagenDestacada: string
    fechaPublicacion: string
    autor: string
    publicada: boolean
}

export function AdminDashboard() {
    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
                    <p className="text-muted-foreground">Gestiona el contenido de tu landing page desde aquí.</p>
                </div>
            </div>

            <Tabs defaultValue="sorteos" className="space-y-4">
                <TabsList className="mb-4 flex-wrap h-auto gap-2 bg-transparent justify-start p-0">
                    <TabsTrigger value="sorteos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Gestión de Contenido</TabsTrigger>
                    <TabsTrigger value="destacados" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Sorteos Destacados</TabsTrigger>
                    <TabsTrigger value="noticias" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Noticias</TabsTrigger>
                    <TabsTrigger value="productos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Portafolio de Productos</TabsTrigger>
                    <TabsTrigger value="estadisticas" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Estadísticas</TabsTrigger>
                </TabsList>

                <TabsContent value="sorteos" className="space-y-4">
                    <RafflesManager />
                </TabsContent>

                <TabsContent value="destacados" className="space-y-4">
                    <FeaturedRafflesManager />
                </TabsContent>

                <TabsContent value="noticias" className="space-y-4">
                    <NewsManager />
                </TabsContent>

                <TabsContent value="productos" className="space-y-4">
                    <ProductsManager />
                </TabsContent>

                <TabsContent value="estadisticas" className="space-y-4">
                    <StatisticsManager />
                </TabsContent>
            </Tabs>
            <Toaster />
        </div>
    )
}


function RafflesManager() {
    const [raffles, setRaffles] = useState<Raffle[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentRaffle, setCurrentRaffle] = useState<Partial<Raffle>>({
        promotionalMaterial: { images: [], pdfs: [] },
        status: "active",
        featured: false
    })

    useEffect(() => {
        fetchRaffles()
    }, [])

    const fetchRaffles = async () => {
        try {
            const res = await fetch("/api/sorteos")
            const data = await res.json()
            setRaffles(data)
        } catch (error) {
            console.error("Error fetching raffles:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        const raffleToSave = {
            ...currentRaffle,
            status: currentRaffle.status || "active",
            featured: currentRaffle.featured || false
        } as Raffle

        const updatedRaffles = currentRaffle.id
            ? raffles.map(r => r.id === currentRaffle.id ? raffleToSave : r)
            : [...raffles, { ...raffleToSave, id: Date.now() }]

        try {
            await fetch("/api/sorteos", {
                method: "POST",
                body: JSON.stringify(updatedRaffles),
            })
            setRaffles(updatedRaffles)
            setIsDialogOpen(false)
            setCurrentRaffle({ promotionalMaterial: { images: [], pdfs: [] }, status: "active", featured: false })
        } catch (error) {
            console.error("Error saving raffle:", error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este sorteo?")) return
        const updatedRaffles = raffles.filter(r => r.id !== id)
        try {
            await fetch("/api/sorteos", { method: "POST", body: JSON.stringify(updatedRaffles) })
            setRaffles(updatedRaffles)
        } catch (error) {
            console.error("Error deleting raffle:", error)
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf') => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const result = reader.result as string
            if (type === 'image') {
                setCurrentRaffle(prev => ({
                    ...prev,
                    promotionalMaterial: {
                        ...prev.promotionalMaterial!,
                        images: [...(prev.promotionalMaterial?.images || []), result]
                    }
                }))
            } else {
                setCurrentRaffle(prev => ({
                    ...prev,
                    promotionalMaterial: {
                        ...prev.promotionalMaterial!,
                        pdfs: [...(prev.promotionalMaterial?.pdfs || []), { name: file.name, url: result }] // Note: Base64 for PDF might be heavy
                    }
                }))
            }
        }
        reader.readAsDataURL(file)
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Sorteos Actuales y Destacados</CardTitle>
                    <CardDescription>Administra los sorteos que se muestran en la página.</CardDescription>
                </div>
                <Button onClick={() => { setCurrentRaffle({ promotionalMaterial: { images: [], pdfs: [] }, status: "active", featured: false }); setIsDialogOpen(true) }}>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Sorteo
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Premio</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Destacado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {raffles.map((raffle) => (
                            <TableRow key={raffle.id}>
                                <TableCell className="font-medium">{raffle.name}</TableCell>
                                <TableCell>{raffle.prize}</TableCell>
                                <TableCell>{raffle.date}</TableCell>
                                <TableCell>
                                    <Badge variant={raffle.status === "active" ? "default" : "secondary"}>
                                        {raffle.status === "active" ? "Activo" : "Inactivo"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {raffle.featured && <Badge variant="outline" className="border-primary text-primary">Destacado</Badge>}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => { setCurrentRaffle(raffle); setIsDialogOpen(true) }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(raffle.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{currentRaffle.id ? "Editar Sorteo" : "Nuevo Sorteo"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Nombre del Sorteo</Label>
                                    <Input value={currentRaffle.name || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Premio Mayor</Label>
                                    <Input value={currentRaffle.prize || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, prize: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Fecha del Sorteo</Label>
                                    <Input value={currentRaffle.date || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tiempo Restante (Texto)</Label>
                                    <Input value={currentRaffle.timeLeft || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, timeLeft: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Participantes (Estimado)</Label>
                                    <Input value={currentRaffle.participants || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, participants: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Estado del Sorteo</Label>
                                    <Select
                                        value={currentRaffle.status || "active"}
                                        onValueChange={(value) => setCurrentRaffle({ ...currentRaffle, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Activo</SelectItem>
                                            <SelectItem value="inactive">Inactivo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 flex flex-col justify-end">
                                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                                        <Switch
                                            checked={currentRaffle.featured}
                                            onCheckedChange={(checked) => setCurrentRaffle({ ...currentRaffle, featured: checked })}
                                        />
                                        <Label>Marcar como Destacado</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 border-t pt-4">
                                <Label className="text-lg font-semibold">Material Promocional</Label>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Imágenes</Label>
                                        <div className="flex items-center gap-2">
                                            <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} className="hidden" id="img-upload" />
                                            <Button variant="outline" onClick={() => document.getElementById('img-upload')?.click()}>
                                                <Upload className="h-4 w-4 mr-2" /> Subir Imagen
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {currentRaffle.promotionalMaterial?.images.map((img, idx) => (
                                                <div key={idx} className="relative group border rounded overflow-hidden h-20">
                                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        onClick={() => setCurrentRaffle(prev => ({ ...prev, promotionalMaterial: { ...prev.promotionalMaterial!, images: prev.promotionalMaterial!.images.filter((_, i) => i !== idx) } }))}
                                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Documentos (PDF)</Label>
                                        <div className="flex items-center gap-2">
                                            <Input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'pdf')} className="hidden" id="pdf-upload" />
                                            <Button variant="outline" onClick={() => document.getElementById('pdf-upload')?.click()}>
                                                <Upload className="h-4 w-4 mr-2" /> Subir PDF
                                            </Button>
                                        </div>
                                        <div className="space-y-1 mt-2">
                                            {currentRaffle.promotionalMaterial?.pdfs.map((pdf, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                                                    <span className="truncate max-w-[150px]">{pdf.name}</span>
                                                    <button
                                                        onClick={() => setCurrentRaffle(prev => ({ ...prev, promotionalMaterial: { ...prev.promotionalMaterial!, pdfs: prev.promotionalMaterial!.pdfs.filter((_, i) => i !== idx) } }))}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} className="w-full sm:w-auto">Guardar Sorteo</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}



function FeaturedRafflesManager() {
    const [raffles, setRaffles] = useState<FeaturedRaffle[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentRaffle, setCurrentRaffle] = useState<Partial<FeaturedRaffle>>({ activo: true })

    useEffect(() => {
        fetchRaffles()
    }, [])

    const fetchRaffles = async () => {
        try {
            const res = await fetch("/api/sorteos-destacados")
            const data = await res.json()
            setRaffles(data)
        } catch (error) {
            console.error("Error fetching featured raffles:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        const raffleToSave = {
            ...currentRaffle,
            activo: currentRaffle.activo !== undefined ? currentRaffle.activo : true
        } as FeaturedRaffle

        const updatedRaffles = currentRaffle.id
            ? raffles.map(r => r.id === currentRaffle.id ? raffleToSave : r)
            : [...raffles, { ...raffleToSave, id: Date.now() }]

        try {
            await fetch("/api/sorteos-destacados", {
                method: "POST",
                body: JSON.stringify(updatedRaffles),
            })
            setRaffles(updatedRaffles)
            setIsDialogOpen(false)
            setCurrentRaffle({ activo: true })
        } catch (error) {
            console.error("Error saving featured raffle:", error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este sorteo destacado?")) return
        const updatedRaffles = raffles.filter(r => r.id !== id)
        try {
            await fetch("/api/sorteos-destacados", { method: "POST", body: JSON.stringify(updatedRaffles) })
            setRaffles(updatedRaffles)
        } catch (error) {
            console.error("Error deleting featured raffle:", error)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setCurrentRaffle(prev => ({ ...prev, imagen: reader.result as string }))
        }
        reader.readAsDataURL(file)
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Sorteos Destacados del Mes</CardTitle>
                    <CardDescription>Administra los sorteos destacados que se muestran en la página.</CardDescription>
                </div>
                <Button onClick={() => { setCurrentRaffle({ activo: true }); setIsDialogOpen(true) }}>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Sorteo Destacado
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Fecha Sorteo</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {raffles.map((raffle) => (
                            <TableRow key={raffle.id}>
                                <TableCell className="font-medium">{raffle.titulo}</TableCell>
                                <TableCell>{raffle.fechaSorteo}</TableCell>
                                <TableCell>
                                    <Badge variant={raffle.activo ? "default" : "secondary"}>
                                        {raffle.activo ? "Activo" : "Inactivo"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => { setCurrentRaffle(raffle); setIsDialogOpen(true) }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(raffle.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{currentRaffle.id ? "Editar Sorteo Destacado" : "Nuevo Sorteo Destacado"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Título</Label>
                                <Input value={currentRaffle.titulo || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, titulo: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Descripción</Label>
                                <Textarea value={currentRaffle.descripcion || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, descripcion: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Fecha del Sorteo</Label>
                                    <Input value={currentRaffle.fechaSorteo || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, fechaSorteo: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Enlace (Opcional)</Label>
                                    <Input value={currentRaffle.enlace || ""} onChange={(e) => setCurrentRaffle({ ...currentRaffle, enlace: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Imagen</Label>
                                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                                {currentRaffle.imagen && (
                                    <img src={currentRaffle.imagen} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={currentRaffle.activo}
                                    onCheckedChange={(checked) => setCurrentRaffle({ ...currentRaffle, activo: checked })}
                                />
                                <Label>Activo</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} className="w-full sm:w-auto">Guardar Sorteo Destacado</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}

function NewsManager() {
    const [news, setNews] = useState<News[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentNews, setCurrentNews] = useState<Partial<News>>({ publicada: false })

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const res = await fetch("/api/noticias")
            const data = await res.json()
            setNews(data)
        } catch (error) {
            console.error("Error fetching news:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        const newsToSave = {
            ...currentNews,
            publicada: currentNews.publicada !== undefined ? currentNews.publicada : false,
            fechaPublicacion: currentNews.fechaPublicacion || new Date().toLocaleDateString('es-ES')
        } as News

        const updatedNews = currentNews.id
            ? news.map(n => n.id === currentNews.id ? newsToSave : n)
            : [...news, { ...newsToSave, id: Date.now() }]

        try {
            await fetch("/api/noticias", {
                method: "POST",
                body: JSON.stringify(updatedNews),
            })
            setNews(updatedNews)
            setIsDialogOpen(false)
            setCurrentNews({ publicada: false })
        } catch (error) {
            console.error("Error saving news:", error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar esta noticia?")) return
        const updatedNews = news.filter(n => n.id !== id)
        try {
            await fetch("/api/noticias", { method: "POST", body: JSON.stringify(updatedNews) })
            setNews(updatedNews)
        } catch (error) {
            console.error("Error deleting news:", error)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setCurrentNews(prev => ({ ...prev, imagenDestacada: reader.result as string }))
        }
        reader.readAsDataURL(file)
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Noticias</CardTitle>
                    <CardDescription>Administra las noticias que se muestran en la página.</CardDescription>
                </div>
                <Button onClick={() => { setCurrentNews({ publicada: false }); setIsDialogOpen(true) }}>
                    <Plus className="mr-2 h-4 w-4" /> Nueva Noticia
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {news.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.titulo}</TableCell>
                                <TableCell>{item.autor}</TableCell>
                                <TableCell>{item.fechaPublicacion}</TableCell>
                                <TableCell>
                                    <Badge variant={item.publicada ? "default" : "secondary"}>
                                        {item.publicada ? "Publicada" : "Borrador"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => { setCurrentNews(item); setIsDialogOpen(true) }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{currentNews.id ? "Editar Noticia" : "Nueva Noticia"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Título</Label>
                                <Input value={currentNews.titulo || ""} onChange={(e) => setCurrentNews({ ...currentNews, titulo: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Autor</Label>
                                <Input value={currentNews.autor || ""} onChange={(e) => setCurrentNews({ ...currentNews, autor: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Resumen</Label>
                                <Textarea value={currentNews.resumen || ""} onChange={(e) => setCurrentNews({ ...currentNews, resumen: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Contenido Completo</Label>
                                <Textarea className="h-40" value={currentNews.contenido || ""} onChange={(e) => setCurrentNews({ ...currentNews, contenido: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Imagen Destacada</Label>
                                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                                {currentNews.imagenDestacada && (
                                    <img src={currentNews.imagenDestacada} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={currentNews.publicada}
                                    onCheckedChange={(checked) => setCurrentNews({ ...currentNews, publicada: checked })}
                                />
                                <Label>Publicar</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} className="w-full sm:w-auto">Guardar Noticia</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}
