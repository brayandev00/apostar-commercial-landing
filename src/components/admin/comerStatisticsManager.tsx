"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Users, Trophy, Gift, TrendingUp, Activity, BarChart, PieChart, LineChart } from "lucide-react"

interface Statistic {
    icon: string
    value: string
    label: string
}

const availableIcons = [
    { name: "Users", icon: Users },
    { name: "Trophy", icon: Trophy },
    { name: "Gift", icon: Gift },
    { name: "TrendingUp", icon: TrendingUp },
    { name: "Activity", icon: Activity },
    { name: "BarChart", icon: BarChart },
    { name: "PieChart", icon: PieChart },
    { name: "LineChart", icon: LineChart },
]

import "@/styles/comerAdmin.css"

export function ComerStatisticsManager() {
    const { toast } = useToast()
    const [stats, setStats] = useState<Statistic[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch(`/api/estadisticas?t=${Date.now()}`)
            if (!res.ok) throw new Error("Error fetching stats")
            const data = await res.json()
            setStats(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Error:", error)
            toast({
                title: "Error",
                description: "No se pudieron cargar las estadísticas",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (index: number, field: keyof Statistic, value: string) => {
        const newStats = [...stats]
        newStats[index] = { ...newStats[index], [field]: value }
        setStats(newStats)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/estadisticas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(stats),
            })

            if (!res.ok) throw new Error("Error saving stats")

            toast({
                title: "Éxito",
                description: "Estadísticas actualizadas correctamente",
                variant: "success",
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

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestión de Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-4 border bg-muted/20">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Icono</Label>
                                    <Select
                                        value={stat.icon}
                                        onValueChange={(value) => handleChange(index, "icon", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar icono" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableIcons.map((item) => (
                                                <SelectItem key={item.name} value={item.name}>
                                                    <div className="flex items-center gap-2">
                                                        <item.icon className="h-4 w-4" />
                                                        <span>{item.name}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Valor</Label>
                                    <Input
                                        value={stat.value}
                                        onChange={(e) => handleChange(index, "value", e.target.value)}
                                        placeholder="Ej: 5,000+"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Etiqueta</Label>
                                    <Input
                                        value={stat.label}
                                        onChange={(e) => handleChange(index, "label", e.target.value)}
                                        placeholder="Ej: Aliados Activos"
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Guardar Cambios
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}
