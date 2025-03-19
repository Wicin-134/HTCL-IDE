
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Code, Heart, MessageCircle, Globe } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the available languages
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "pl", name: "Polski" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "hi", name: "हिन्दी" },
  { code: "ar", name: "العربية" },
];

const Footer = () => {
  const [language, setLanguage] = useState("en");

  // Function to handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // Here you would normally implement actual translation logic
    console.log(`Language changed to: ${value}`);
  };

  return (
    <footer className="border-t">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                <Code size={16} className="text-primary" />
              </div>
              <span className="font-medium text-lg">Interfuck</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Interfuck is an esoteric programming language designed to challenge conventional programming paradigms with its unique syntax and execution model.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://discord.gg/Z6gTEmnNVU" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/try" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Try Interfuck
                </Link>
              </li>
              <li>
                <a 
                  href="https://discord.gg/Z6gTEmnNVU" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="https://discord.gg/Z6gTEmnNVU" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Community
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  License
                </a>
              </li>
            </ul>
            
            {/* Language selector */}
            <div className="mt-6">
              <h3 className="font-medium mb-2 text-sm">Language</h3>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Interfuck
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe size={14} className="text-muted-foreground" />
            <span>Language: {languages.find(lang => lang.code === language)?.name}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart size={14} className="text-red-500" />
            <span>by esoteric enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
