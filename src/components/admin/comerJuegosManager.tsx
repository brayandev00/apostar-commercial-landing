import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Pencil, Trash2, Upload } from "lucide-react"

interface Game {
    id: number
    name: string
    description: string
    icon: string
    image?: string
    commission: string
    popularity: string
    color: string
    details: {
        fullDescription: string
        howToPlay: string[]
        prizes: string[]
        schedule: string
        minBet: string
        commissionDetails: string
    }
}

import "@/styles/comerAdmin.css"

export function ComerJuegosManager() {
    const { toast } = useToast()
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [currentGame, setCurrentGame] = useState<Partial<Game>>({
        details: {
            fullDescription: "",
            howToPlay: [],
            prizes: [],
            schedule: "",
            minBet: "",
            commissionDetails: ""
        }
    })

    useEffect(() => {
        fetchGames()
    }, [])

    const fetchGames = async () => {
        try {
            const res = await fetch("/api/juegos?t=" + Date.now())
            const data = await res.json()
            if (Array.isArray(data)) {
                setGames(data)
            } else {
                setGames([])
                console.error("Invalid games data:", data)
            }
        } catch (error) {
            console.error("Error fetching games:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setProcessing(true)
        const gameToSave = {
            ...currentGame,
            id: currentGame.id || Date.now(),
            details: {
                ...currentGame.details,
                howToPlay: Array.isArray(currentGame.details?.howToPlay) ? currentGame.details?.howToPlay : [],
                prizes: Array.isArray(currentGame.details?.prizes) ? currentGame.details?.prizes : []
            }
        } as Game

        const updatedGames = currentGame.id
            ? games.map(g => g.id === currentGame.id ? gameToSave : g)
            : [...games, gameToSave]

        try {
            await fetch("/api/juegos", {
                method: "POST",
                body: JSON.stringify(updatedGames),
            })
            setGames(updatedGames)
            setIsDialogOpen(false)
            setCurrentGame({
                details: {
                    fullDescription: "",
                    howToPlay: [],
                    prizes: [],
                    schedule: "",
                    minBet: "",
                    commissionDetails: ""
                }
            })
            toast({
                title: "¡Guardado Exitoso!",
                description: "El Portafolio de Juegos se ha actualizado.",
                duration: 3000,
                variant: "success"
            })
        } catch (error) {
            console.error("Error saving game:", error)
            toast({
                title: "Error",
                description: "No se pudo guardar el juego.",
                variant: "destructive"
            })
        } finally {
            setProcessing(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este juego del portafolio?")) return
        const updatedGames = games.filter(g => g.id !== id)
        try {
            await fetch("/api/juegos", { method: "POST", body: JSON.stringify(updatedGames) })
            setGames(updatedGames)
        } catch (error) {
            console.error("Error deleting game:", error)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setCurrentGame(prev => ({ ...prev, image: reader.result as string }))
        }
        reader.readAsDataURL(file)
    }

    // Helper for managing list inputs (howToPlay, prizes)
    const updateListField = (field: 'howToPlay' | 'prizes', index: number, value: string) => {
        const list = [...(currentGame.details?.[field] || [])]
        list[index] = value
        setCurrentGame(prev => ({
            ...prev,
            details: { ...prev.details!, [field]: list }
        }))
    }

    const addListItem = (field: 'howToPlay' | 'prizes') => {
        setCurrentGame(prev => ({
            ...prev,
            details: { ...prev.details!, [field]: [...(prev.details?.[field] || []), ""] }
        }))
    }

    const removeListItem = (field: 'howToPlay' | 'prizes', index: number) => {
        const list = [...(currentGame.details?.[field] || [])]
        list.splice(index, 1)
        setCurrentGame(prev => ({
            ...prev,
            details: { ...prev.details!, [field]: list }
        }))
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>

    return (
        <Card className="relative">
            {/* Blocking Overlay */}
            {processing && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-lg font-medium animate-pulse">Procesando...</p>
                    </div>
                </div>
            )}
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Portafolio de Juegos</CardTitle>
                    <CardDescription>Gestiona los juegos mostrados en la sección 'Portafolio de Productos'.</CardDescription>
                </div>
                <Button onClick={() => {
                    setCurrentGame({
                        details: {
                            fullDescription: "",
                            howToPlay: ["", "", ""],
                            prizes: ["", "", ""],
                            schedule: "",
                            minBet: "",
                            commissionDetails: ""
                        }
                    }); setIsDialogOpen(true)
                }}>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Juego
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Comisión</TableHead>
                            <TableHead>Popularidad</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {games.map((game) => (
                            <TableRow key={game.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {game.image && <img src={game.image} className="w-8 h-8 rounded object-cover" />}
                                        {game.name}
                                    </div>
                                </TableCell>
                                <TableCell>{game.commission}</TableCell>
                                <TableCell>{game.popularity}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => { setCurrentGame(game); setIsDialogOpen(true) }}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(game.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{currentGame.id ? "Editar Juego" : "Nuevo Juego"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Nombre</Label>
                                    <Input value={currentGame.name || ""} onChange={(e) => setCurrentGame({ ...currentGame, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Descripción Corta</Label>
                                    <Input value={currentGame.description || ""} onChange={(e) => setCurrentGame({ ...currentGame, description: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Nombre del Icono (ej. Star, Ticket)</Label>
                                    <Input value={currentGame.icon || ""} onChange={(e) => setCurrentGame({ ...currentGame, icon: e.target.value })} placeholder="Nombre del icono de Lucide" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Color (Clase CSS, ej. bg-red-600)</Label>
                                    <Input value={currentGame.color || ""} onChange={(e) => setCurrentGame({ ...currentGame, color: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Comisión (Texto)</Label>
                                    <Input value={currentGame.commission || ""} onChange={(e) => setCurrentGame({ ...currentGame, commission: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Popularidad</Label>
                                    <Input value={currentGame.popularity || ""} onChange={(e) => setCurrentGame({ ...currentGame, popularity: e.target.value })} />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2 border-t pt-4">
                                <Label>Imagen Personalizada (Opcional - Reemplaza al icono)</Label>
                                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                                {currentGame.image && (
                                    <div className="mt-2 relative w-32 h-32 group">
                                        <img src={currentGame.image} alt="Preview" className="w-full h-full object-cover rounded border" />
                                        <button
                                            onClick={() => setCurrentGame({ ...currentGame, image: undefined })}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-4 border-t pt-4">
                                <h4 className="font-semibold">Detalles del Modal</h4>

                                <div className="space-y-2">
                                    <Label>Descripción Completa</Label>
                                    <Textarea value={currentGame.details?.fullDescription || ""} onChange={(e) => setCurrentGame({ ...currentGame, details: { ...currentGame.details!, fullDescription: e.target.value } })} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Horarios</Label>
                                        <Input value={currentGame.details?.schedule || ""} onChange={(e) => setCurrentGame({ ...currentGame, details: { ...currentGame.details!, schedule: e.target.value } })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Apuesta Mínima</Label>
                                        <Input value={currentGame.details?.minBet || ""} onChange={(e) => setCurrentGame({ ...currentGame, details: { ...currentGame.details!, minBet: e.target.value } })} />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label>Detalles de Comisión</Label>
                                        <Input value={currentGame.details?.commissionDetails || ""} onChange={(e) => setCurrentGame({ ...currentGame, details: { ...currentGame.details!, commissionDetails: e.target.value } })} />
                                    </div>
                                </div>

                                {/* Dynamic Lists */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="flex justify-between items-center">
                                            Cómo Jugar
                                            <Button variant="outline" size="sm" onClick={() => addListItem('howToPlay')}><Plus className="h-3 w-3" /></Button>
                                        </Label>
                                        {currentGame.details?.howToPlay?.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input value={item} onChange={(e) => updateListField('howToPlay', idx, e.target.value)} />
                                                <Button variant="ghost" size="icon" onClick={() => removeListItem('howToPlay', idx)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="flex justify-between items-center">
                                            Premios
                                            <Button variant="outline" size="sm" onClick={() => addListItem('prizes')}><Plus className="h-3 w-3" /></Button>
                                        </Label>
                                        {currentGame.details?.prizes?.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <Input value={item} onChange={(e) => updateListField('prizes', idx, e.target.value)} />
                                                <Button variant="ghost" size="icon" onClick={() => removeListItem('prizes', idx)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} className="w-full sm:w-auto">Guardar Juego</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}
