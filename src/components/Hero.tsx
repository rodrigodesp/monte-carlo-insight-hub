
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-primary/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Método de Monte Carlo
            <span className="block highlight-text mt-2">Análise Estatística Avançada</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mb-8">
            Descubra como as simulações de Monte Carlo podem transformar a análise de dados, 
            gerenciamento de riscos e tomada de decisões através de modelos estatísticos poderosos.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="rounded-full">
              Iniciar Simulação
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
