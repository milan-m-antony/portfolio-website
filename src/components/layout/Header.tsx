
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeProvider'; 

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#timeline', label: 'Journey' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onClick}
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 ease-in-out px-3 py-2 rounded-md hover:bg-accent/50"
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">Milan.dev</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="transition-transform duration-300 ease-in-out hover:rotate-90">
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[340px] p-0 transition-transform duration-500 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full"
              >
                <SheetHeader className="p-6 border-b text-left">
                  <SheetTitle>
                    <Link 
                      href="/" 
                      className="flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Code2 className="h-7 w-7 text-primary" />
                      <span className="font-bold text-xl">Milan.dev</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="p-6">
                  <nav className="flex flex-col space-y-3">
                    <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

