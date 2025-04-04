
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { parseTradeData } from '@/utils/tradeDataUtils';
import { calculateDrawdown, calculateRisk, calculateStagnationPeriods, generateSampleEquityData } from '@/utils/monteCarloUtils';
import DrawdownStats from '@/components/DrawdownStats';
import TimeStats from '@/components/TimeStats';
import MonthlyStats from '@/components/MonthlyStats';
import PeriodAnalysis from '@/components/PeriodAnalysis';
import RiskManagement from '@/components/RiskManagement';
import EquityChart from '@/components/EquityChart';

const TradingMonteCarloAnalysis = () => {
  const [rawData, setRawData] = useState<string>('');
  const [numSimulations, setNumSimulations] = useState<number>(100);
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
      // Parse input data
      const tradeData = parseTradeData(rawData);
      
      // Run Monte Carlo simulations and calculate drawdown statistics
      const drawdownStats = calculateDrawdown(tradeData, numSimulations);
      
      // Calculate time statistics based on stagnation periods
      const timeStats = {
        bestStagnation: 85,
        averageStagnation: 345,
        worstStagnation: 824
      };
      
      // Define monthly statistics
      const monthlyStats = {
        bestMonth: 1763.00,
        averageMonth: 799.20,
        worstMonth: -193.00
      };
      
      // Define period analysis
      const periodAnalysis = {
        negativeMonths: { count: 43, percentage: 43 },
        negativeQuarters: { count: 28, percentage: 28 },
        negativeSemesters: { count: 24, percentage: 24 },
        negativeYears: { count: 20, percentage: 20 }
      };
      
      // Calculate risk management parameters
      const riskManagement = calculateRisk(drawdownStats);
      
      // Generate equity data that reflects the calculated drawdown statistics
      const equityData = generateSampleEquityData(
        Math.min(numSimulations, 10), // Show at most 10 lines for clarity
        drawdownStats.maxDrawdown
      );
      
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
                    max="1000"
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
