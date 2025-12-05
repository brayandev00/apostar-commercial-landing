"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"

export function Encabezado() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "#novedades", label: "Novedades" },
    { href: "#online", label: "Apostar Online" },
    { href: "#domicilios", label: "Domicilios" },
    { href: "#productos", label: "Productos" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#C41E3A] to-[#E31E3A] shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="/images/LogoApos.png"
            alt="Apostar"
            className="h-14 w-auto transition-transform group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-5 py-2.5 text-sm font-semibold text-white hover:text-[#FFD700] transition-all rounded-full hover:bg-white/10 group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors" />
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#contacto">
            <Button
              size="lg"
              className="bg-white text-[#C41E3A] font-bold shadow-lg hover:shadow-xl hover:bg-[#FFD700] hover:text-[#C41E3A] hover:scale-105 transition-all duration-300 rounded-full px-8 group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="relative z-10">Quiero ser Aliado</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full hover:bg-white/10 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-gradient-to-r from-[#C41E3A] to-[#E31E3A]">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-semibold text-white hover:text-[#FFD700] hover:bg-white/10 transition-all py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#contacto" className="mt-4 block" onClick={() => setIsMenuOpen(false)}>
              <Button
                className="w-full bg-white text-[#C41E3A] hover:bg-[#FFD700] font-bold shadow-lg rounded-full"
                size="lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Quiero ser Aliado
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
