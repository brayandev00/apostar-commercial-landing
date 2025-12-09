import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Lock, Save, Loader2 } from "lucide-react"

import "@/styles/comerAdmin.css"

export function ComerSettingsManager() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Las nuevas contraseñas no coinciden.",
                variant: "destructive",
            })
            return
        }

        if (newPassword.length < 6) {
            toast({
                title: "Error",
                description: "La nueva contraseña debe tener al menos 6 caracteres.",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/auth", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            })

            const data = await res.json()

            if (res.ok && data.success) {
                toast({
                    title: "Éxito",
                    description: "Contraseña actualizada correctamente.",
                    variant: "success",
                })
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
            } else {
                toast({
                    title: "Error",
                    description: data.message || "No se pudo actualizar la contraseña.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Ocurrió un error al conectar con el servidor.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Seguridad
                    </CardTitle>
                    <CardDescription>
                        Gestiona la contraseña de acceso al panel de administración.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <Label htmlFor="current">Contraseña Actual</Label>
                            <Input
                                id="current"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new">Nueva Contraseña</Label>
                            <Input
                                id="new"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm">Confirmar Nueva Contraseña</Label>
                            <Input
                                id="confirm"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Actualizando...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Actualizar Contraseña
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
