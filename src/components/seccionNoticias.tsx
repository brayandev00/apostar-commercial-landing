"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, User, ChevronRight } from "lucide-react"

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

export function SeccionNoticias() {
  const [news, setNews] = useState<News[]>([])
  const [selectedNews, setSelectedNews] = useState<News | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/noticias?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        const publishedNews = data.filter((n: News) => n.publicada)
        setNews(publishedNews)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading news:", err)
        setLoading(false)
      })
  }, [])

  const handleOpenNews = (item: News) => {
    setSelectedNews(item)
    setIsDialogOpen(true)
  }

  if (loading || news.length === 0) return null

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-lg px-4 py-2">Noticias</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Últimas Novedades
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mantente informado con las últimas noticias y actualizaciones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => handleOpenNews(item)}>
              {item.imagenDestacada && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imagenDestacada}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {item.titulo}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{item.fechaPublicacion}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{item.autor}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">{item.resumen}</p>
                <Button variant="ghost" className="p-0 h-auto font-semibold group-hover:text-primary">
                  Leer más <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              {selectedNews.imagenDestacada && (
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <img
                    src={selectedNews.imagenDestacada}
                    alt={selectedNews.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedNews.titulo}</h2>
                    <div className="flex items-center gap-4 text-sm text-white/90">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{selectedNews.fechaPublicacion}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{selectedNews.autor}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">{selectedNews.resumen}</p>
                <div className="whitespace-pre-wrap">{selectedNews.contenido}</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
