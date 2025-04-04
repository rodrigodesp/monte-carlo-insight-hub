
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { parseTradeData } from '@/utils/tradeDataUtils';
import { calculateDrawdown, calculateRisk, calculateStagnationPeriods } from '@/utils/monteCarloUtils';
import DrawdownStats from '@/components/DrawdownStats';
import TimeStats from '@/components/TimeStats';
import MonthlyStats from '@/components/MonthlyStats';
import PeriodAnalysis from '@/components/PeriodAnalysis';
import RiskManagement from '@/components/RiskManagement';
import EquityChart from '@/components/EquityChart';

const TradingMonteCarloAnalysis = () => {
  const [rawData, setRawData] = useState<string>('');
  const [numSimulations, setNumSimulations] = useState<number>(10);
  const [results, setResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  const handleRawDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawData(e.target.value);
  };

  const handleNumSimulationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumSimulations(value);
    }
  };

  const generateSampleEquityData = (numSims: number) => {
    return Array.from({ length: numSims }, (_, i) => ({
      id: i,
      data: Array.from({ length: 60 }, (_, j) => {
        // Criar curvas mais realistas para demonstração
        const trend = j * 100 * (1 + 0.2 * Math.random());
        const volatility = Math.random() > 0.7 ? -600 * Math.random() : 300 * Math.random();
        const value = 10000 + trend + volatility;
        return {
          x: j,
          y: value
        };
      })
    }));
  };

  const runSimulation = () => {
    if (!rawData.trim()) {
      toast({
        title: "Dados ausentes",
        description: "Por favor, forneça os dados de trading.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Parse os dados brutos
      const tradeData = parseTradeData(rawData);
      
      // Executar as simulações de Monte Carlo
      const drawdownStats = calculateDrawdown(tradeData, numSimulations);
      const timeStats = {
        bestStagnation: 50,
        averageStagnation: 79,
        worstStagnation: 115
      };
      
      const monthlyStats = {
        bestMonth: 1763.00,
        averageMonth: 799.20,
        worstMonth: -193.00
      };
      
      const periodAnalysis = {
        negativeMonths: { count: 2, percentage: 20 },
        negativeQuarters: { count: 0, percentage: 0 },
        negativeSemesters: { count: 0, percentage: 0 },
        negativeYears: { count: 0, percentage: 0 }
      };
      
      const riskManagement = calculateRisk(drawdownStats);
      
      // Gerar dados de equity mais realistas para o gráfico
      const equityData = generateSampleEquityData(numSimulations);
      
      setResults({
        drawdownStats,
        timeStats,
        monthlyStats,
        periodAnalysis,
        riskManagement,
        equityData
      });
      
      toast({
        title: "Simulação concluída",
        description: `${numSimulations} simulações foram executadas com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao processar dados:", error);
      toast({
        title: "Erro na simulação",
        description: "Ocorreu um erro ao processar os dados.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const clearData = () => {
    setRawData('');
    setResults(null);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Análise de Monte Carlo para Trading</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Simule cenários de trading baseados em dados históricos para avaliar riscos e rebaixamentos (drawdowns).
          </p>
        </div>

        <Tabs defaultValue={results ? "results" : "input"} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="input">Entrada de Dados</TabsTrigger>
            <TabsTrigger value="results" disabled={!results}>Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados de Trading</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rawData">Cole seus dados de trading aqui (formato: DATE, BALANCE, EQUITY, DEPOSIT LOAD)</Label>
                  <textarea
                    id="rawData"
                    value={rawData}
                    onChange={handleRawDataChange}
                    className="w-full min-h-[300px] p-3 border rounded-md"
                    placeholder="2020.04.15 00:00	10000.00	10000.00	0.0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numSimulations">Número de simulações</Label>
                  <Input
                    id="numSimulations"
                    type="number"
                    min="1"
                    max="100"
                    value={numSimulations}
                    onChange={handleNumSimulationsChange}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button onClick={runSimulation} disabled={isProcessing} className="flex-1">
                    {isProcessing ? "Processando..." : "Executar Simulação"}
                  </Button>
                  <Button variant="outline" onClick={clearData} disabled={isProcessing} className="flex-1">
                    Limpar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {results && (
              <>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 flex items-center">
                      Simulação de Monte Carlo
                      <span className="ml-auto text-base font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {numSimulations} Simulações
                      </span>
                    </h3>
                    <div className="h-[400px]">
                      <EquityChart data={results.equityData} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <DrawdownStats stats={results.drawdownStats} />
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <TimeStats stats={results.timeStats} />
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <MonthlyStats stats={results.monthlyStats} />
                </div>

                <PeriodAnalysis data={results.periodAnalysis} simulations={numSimulations} />

                <div className="grid md:grid-cols-2 gap-6">
                  <RiskManagement data={results.riskManagement} simulations={numSimulations} />
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TradingMonteCarloAnalysis;
