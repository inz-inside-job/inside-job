import { useState, useEffect } from "react"
import { Building2, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun } from 'lucide-react';
import {useAppearance } from '@/hooks/use-appearance';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { appearance, updateAppearance } = useAppearance();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
      }, [])
    

  return (
    <header className="border-b sticky top-0 foreground z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">glassdoor</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Jobs
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Companies
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Salaries
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Interviews
            </a>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
        <Button
            variant="ghost"
            size="icon"
            onClick={() => updateAppearance(appearance === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && (appearance === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input className="pl-10 w-[200px] lg:w-[300px]" placeholder="Search jobs, companies..." />
          </div>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            Sign Up
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t">
          <nav className="flex flex-col gap-4 mb-4">
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Jobs
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Companies
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Salaries
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Interviews
            </a>
          </nav>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input className="pl-10" placeholder="Search jobs, companies..." />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Sign In
              </Button>
              <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

