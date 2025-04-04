
import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
            MC
          </div>
          <span className="text-xl font-semibold">Monte Carlo Insight Hub</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#explanation" className="text-foreground/80 hover:text-primary transition-colors">
            O que é Monte Carlo
          </a>
          <a href="#simulator" className="text-foreground/80 hover:text-primary transition-colors">
            Simulador
          </a>
          <a href="#statistics" className="text-foreground/80 hover:text-primary transition-colors">
            Estatísticas
          </a>
        </div>
        <Button variant="outline" className="hidden md:block">
          Contato
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
