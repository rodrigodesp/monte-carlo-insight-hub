
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SimpleSimulator = () => {
  const [iterations, setIterations] = useState(1000);
  const [pointsInside, setPointsInside] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [piEstimate, setPiEstimate] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Reiniciar a simulação
  const resetSimulation = () => {
    setPointsInside(0);
    setTotalPoints(0);
    setPiEstimate(0);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
      }
    }
  };

  // Desenhar o fundo do canvas (círculo e quadrado)
  const drawBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;

    // Desenhar quadrado
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    // Desenhar círculo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#EC4899';
    ctx.stroke();
  };

  // Adicionar um ponto
  const addPoint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;

    // Gerar coordenadas aleatórias dentro do quadrado
    const x = (Math.random() * 2 - 1) * radius;
    const y = (Math.random() * 2 - 1) * radius;

    // Verificar se o ponto está dentro do círculo
    const distance = Math.sqrt(x * x + y * y);
    const isInside = distance <= radius;

    // Desenhar o ponto
    ctx.beginPath();
    ctx.arc(centerX + x, centerY + y, 2, 0, Math.PI * 2);
    ctx.fillStyle = isInside ? '#EC4899' : '#3B82F6';
    ctx.fill();

    // Atualizar contadores
    setTotalPoints(prev => prev + 1);
    if (isInside) {
      setPointsInside(prev => prev + 1);
    }
  };

  // Executar a simulação
  const runSimulation = () => {
    resetSimulation();
    setIsSimulating(true);
  };

  // Parar a simulação
  const stopSimulation = () => {
    setIsSimulating(false);
  };

  // Atualizar estimativa de π
  useEffect(() => {
    if (totalPoints > 0) {
      const estimate = 4 * (pointsInside / totalPoints);
      setPiEstimate(estimate);
    }
  }, [pointsInside, totalPoints]);

  // Executar iterações
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      if (totalPoints >= iterations) {
        setIsSimulating(false);
        return;
      }
      addPoint();
    }, 5);

    return () => clearInterval(interval);
  }, [isSimulating, totalPoints, iterations]);

  // Inicializar canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 300;
      canvas.height = 300;
      drawBackground();
    }
  }, []);

  return (
    <section id="simulator" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Simulador de Monte Carlo</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Visualize como o método funciona com este simulador interativo que estima o valor de π.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-4 aspect-square w-full max-w-[300px] mx-auto">
              <canvas 
                ref={canvasRef}
                className="border border-gray-200 rounded-lg w-full h-full"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-foreground/70 mb-2">
                Pontos dentro do círculo: {pointsInside} / Total de pontos: {totalPoints}
              </p>
              <p className="text-xl font-semibold">
                Estimativa de π: {piEstimate.toFixed(6)}
              </p>
              <p className="text-sm text-foreground/70 mt-1">
                Valor real de π: 3.141592...
              </p>
              <p className="text-sm text-foreground/70 mt-1">
                Erro: {totalPoints ? Math.abs(Math.PI - piEstimate).toFixed(6) : "N/A"}
              </p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Controles da Simulação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="iterations">Número de Iterações</Label>
                  <span>{iterations.toLocaleString()}</span>
                </div>
                <Slider
                  id="iterations"
                  min={100}
                  max={10000}
                  step={100}
                  value={[iterations]}
                  onValueChange={(vals) => setIterations(vals[0])}
                  disabled={isSimulating}
                />
              </div>
              
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-medium mb-2">Como funciona?</h4>
                <p className="text-sm text-foreground/80">
                  Este simulador gera pontos aleatórios dentro de um quadrado de lado 2. Calculamos 
                  a proporção de pontos que caem dentro do círculo unitário inscrito no quadrado. 
                  Multiplicando essa proporção por 4, obtemos uma aproximação de π.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="flex space-x-2 w-full">
                <Button 
                  onClick={runSimulation} 
                  disabled={isSimulating}
                  className="flex-1"
                >
                  Iniciar Simulação
                </Button>
                <Button 
                  onClick={stopSimulation} 
                  variant="outline" 
                  disabled={!isSimulating}
                >
                  Parar
                </Button>
              </div>
              <Button 
                onClick={resetSimulation} 
                variant="ghost" 
                disabled={isSimulating || totalPoints === 0}
                className="w-full"
              >
                Reiniciar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SimpleSimulator;
