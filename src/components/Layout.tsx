import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Code, BookText, Play, MessageCircle, Menu, X, Globe } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

const NavItem = ({
  to,
  icon,
  label,
  exact = false
}: NavItemProps) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
  return <Link to={to} className={cn("flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200", "hover:bg-secondary", isActive ? "bg-secondary text-foreground font-medium" : "text-muted-foreground")}>
      {React.cloneElement(icon as React.ReactElement, {
      size: 18,
      className: cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground")
    })}
      <span>{label}</span>
    </Link>;
};

const languageFlags: Record<string, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  pl: "🇵🇱",
  zh: "🇨🇳",
  ja: "🇯🇵",
  hi: "🇮🇳",
  ar: "🇸🇦",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({
  children
}: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useTranslation();

  return <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <Code size={16} className="text-primary" />
              </div>
              <span className="font-medium tracking-tight text-lg">HyperCall</span>
            </Link>
            
            {/* Language Selector */}
            <div className="flex items-center ml-2">
              <Globe size={14} className="mr-1 text-muted-foreground" />
              <Select defaultValue={currentLanguage} onValueChange={setLanguage}>
                <SelectTrigger className="h-8 w-[100px] border-none bg-transparent shadow-none focus:ring-0">
                  <SelectValue placeholder={`${languageFlags[currentLanguage]} ${currentLanguage.toUpperCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{languageFlags.en} EN</SelectItem>
                  <SelectItem value="es">{languageFlags.es} ES</SelectItem>
                  <SelectItem value="fr">{languageFlags.fr} FR</SelectItem>
                  <SelectItem value="de">{languageFlags.de} DE</SelectItem>
                  <SelectItem value="pl">{languageFlags.pl} PL</SelectItem>
                  <SelectItem value="zh">{languageFlags.zh} ZH</SelectItem>
                  <SelectItem value="ja">{languageFlags.ja} JA</SelectItem>
                  <SelectItem value="hi">{languageFlags.hi} HI</SelectItem>
                  <SelectItem value="ar">{languageFlags.ar} AR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/" icon={<Code />} label="Home" exact />
            <NavItem to="/try" icon={<Play />} label="IDE" />
            <NavItem to="/docs" icon={<BookText />} label="Documentation" />
            
            <a href="https://discord.gg/Z6gTEmnNVU" target="_blank" rel="noopener noreferrer" className="ml-2">
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle size={16} />
                <span>Discord</span>
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <nav className="md:hidden px-4 py-4 border-t flex flex-col gap-1 animate-fade-in">
            <NavItem to="/" icon={<Code />} label="Home" exact />
            <NavItem to="/try" icon={<Play />} label="IDE" />
            <NavItem to="/docs" icon={<BookText />} label="Documentation" />
            
            <a href="https://discord.gg/Z6gTEmnNVU" target="_blank" rel="noopener noreferrer" className="mt-2">
              <Button variant="outline" size="sm" className="w-full gap-2 justify-center">
                <MessageCircle size={16} />
                <span>Discord</span>
              </Button>
            </a>
          </nav>}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p>2025 HyperCall</p>
          </div>
          <div className="flex gap-6">
            <a href="https://discord.gg/Z6gTEmnNVU" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>;
};

export default Layout;
