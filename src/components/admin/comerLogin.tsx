import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Lock, User, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface LoginProps {
    onLogin: () => void
}

import "@/styles/comerAdmin.css"

export function ComerLogin({ onLogin }: LoginProps) {
    console.log("Rendering ComerLogin");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const { toast } = useToast()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()

            if (res.ok && data.success) {
                setShowSuccessModal(true)
                // We don't call onLogin() immediately anymore
            } else {
                toast({
                    title: "Acceso Denegado",
                    description: "Las credenciales son incorrectas.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "Error de Conexión",
                description: "No se pudo verificar tus credenciales. Intenta más tarde.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleContinue = () => {
        setShowSuccessModal(false)
        onLogin()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-background via-muted/50 to-background p-4">
            <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-primary/20 p-4 rounded-full inline-flex mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">Apostar</h1>
                <p className="text-muted-foreground mt-2 font-medium">Panel de Administración Comercial</p>
            </div>

            <Card className="w-full max-w-md shadow-2xl border-muted/40 animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-center">
                        Ingresa tus credenciales seguras para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    id="username"
                                    placeholder="Ingresa tu usuario"
                                    className="pl-9 bg-muted/50 focus:bg-background transition-colors"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-9 bg-muted/50 focus:bg-background transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all" disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    Verificando...
                                </>
                            ) : (
                                "Ingresar al Panel"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-col items-center justify-center space-y-4 pt-6">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-center">¡Bienvenido de nuevo!</DialogTitle>
                        <DialogDescription className="text-center text-lg">
                            Has iniciado sesión correctamente. Accediendo al panel de control...
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center pb-6">
                        <Button onClick={handleContinue} className="w-full max-w-[200px] h-12 text-lg bg-green-600 hover:bg-green-700 shadow-md">
                            Continuar al Panel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <p className="mt-8 text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Apostar S.A. Todos los derechos reservados.
            </p>
        </div>
    )
}
