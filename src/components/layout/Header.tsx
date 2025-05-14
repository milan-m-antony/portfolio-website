
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Code2, Home, User, Briefcase, Wrench, Map as MapIcon, Award, FileText, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTheme } from '@/contexts/ThemeProvider';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#hero', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#skills', label: 'Skills', icon: Wrench },
  { href: '#timeline', label: 'Journey', icon: MapIcon },
  { href: '#certifications', label: 'Certifications', icon: Award },
  { href: '#resume', label: 'Resume', icon: FileText },
  { href: '#contact', label: 'Contact', icon: Mail },
];

const NavLinks = ({ onClick, activeHref }: { onClick?: () => void; activeHref: string }) => (
  <>
    {navItems.map((item) => {
      const IconComponent = item.icon;
      const isActive = item.href === activeHref;
      return (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => {
            if (onClick) onClick();
          }}
          className={cn(
            "relative text-sm font-medium text-foreground/80 px-3 py-2 rounded-md flex items-center transition-colors duration-150 ease-in-out",
            isActive ? "text-primary font-semibold" : "group overflow-hidden hover:text-primary"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {isActive ? (
            <>
              <IconComponent className="h-5 w-5 mr-2 text-primary" />
              <span>{item.label}</span>
            </>
          ) : (
            <>
              <span className="inline-block transition-all duration-300 ease-in-out group-hover:translate-x-full group-hover:opacity-0">
                {item.label}
              </span>
              <IconComponent
                className="absolute left-3 top-1/2 transform -translate-y-1/2
                           inline-block transition-all duration-300 ease-in-out
                           translate-x-[-120%] group-hover:translate-x-0
                           text-primary opacity-0 group-hover:opacity-100 h-5 w-5"
              />
            </>
          )}
        </Link>
      );
    })}
  </>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme(); // theme can be 'light', 'dark', 'system'
  const [activeLink, setActiveLink] = useState<string>('#hero');
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const determineActiveLink = () => {
      const currentPath = pathname;
      const currentHash = window.location.hash;

      if (currentPath.startsWith('/admin')) {
        const adminItem = navItems.find(item => item.href === currentPath);
        if (adminItem) {
            setActiveLink(currentPath);
        } else {
            const isSubAdminPage = navItems.some(item => currentPath.startsWith(item.href) && item.href !== currentPath);
            if(!isSubAdminPage) setActiveLink('');
        }
        return;
      }


      if (currentPath === '/') {
        if (currentHash && currentHash !== '#') {
          if (navItems.some(item => item.href === currentHash)) {
            setActiveLink(currentHash);
            return;
          }
        }

        let newActiveLink = '#hero';
        let minDistance = Infinity;
        const referencePoint = 150; 

        for (const item of navItems) {
          if (item.href.startsWith('/')) continue;

          const element = document.getElementById(item.href.substring(1));
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const viewportHeight = window.innerHeight;
            const isInView = elementTop < viewportHeight && elementBottom > 0;

            if (isInView) {
                const distance = Math.abs(elementTop - referencePoint);
                if (distance < minDistance) {
                    minDistance = distance;
                    newActiveLink = item.href;
                }
            }
          }
        }
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) { 
            const contactItem = navItems.find(item => item.href === '#contact');
            if (contactItem) newActiveLink = contactItem.href;
        }
        else if (window.scrollY <= 50) {
            const heroItem = navItems.find(item => item.href === '#hero');
            if (heroItem) newActiveLink = heroItem.href;
        }
        setActiveLink(newActiveLink);
      }
    };

    if (mounted) {
      determineActiveLink();
      window.addEventListener('scroll', determineActiveLink, { passive: true });
      window.addEventListener('hashchange', determineActiveLink);
      window.addEventListener('resize', determineActiveLink);
    }

    return () => {
      if (mounted) {
        window.removeEventListener('scroll', determineActiveLink);
        window.removeEventListener('hashchange', determineActiveLink);
        window.removeEventListener('resize', determineActiveLink);
      }
    };
  }, [pathname, mounted]);


  if (!mounted) return null;

  // Determine effective theme for icon display and toggle logic
  let effectiveTheme = theme;
  if (theme === 'system' && typeof window !== 'undefined') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const toggleTheme = () => {
    // Use the effectiveTheme for toggling decision
    if (effectiveTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">Milan.dev</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks activeHref={activeLink} />
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {effectiveTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                    <NavLinks onClick={() => setIsMobileMenuOpen(false)} activeHref={activeLink} />
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
