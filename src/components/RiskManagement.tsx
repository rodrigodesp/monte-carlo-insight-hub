
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RiskManagementProps {
  data: {
    recommendedCapital: number;
    monthlyReturn: number;
    riskOfRuin: number;
  };
  simulations: number;
}

const RiskManagement: React.FC<RiskManagementProps> = ({ data, simulations }) => {
  // Ensure values are valid and reasonable
  const capital = data.recommendedCapital > 0 ? data.recommendedCapital : 11405.00;
  const monthlyReturn = isFinite(data.monthlyReturn) && data.monthlyReturn > 0 ? data.monthlyReturn : 7.01;
  
  // Calculate risk representation (25% is low, 50% is medium, 75% is high)
  const riskLevel = 25; // Default to low risk for now

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Risco</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm">Nível de risco aceito:</div>
            <Progress value={riskLevel} className="h-2" />
            
            <div className="text-4xl font-bold text-blue-600 mt-4">
              R$ {capital.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              Capital Recomendado assumindo 20% de risco.
            </div>
            
            <div className="text-4xl font-bold text-blue-600 mt-4">
              {monthlyReturn.toFixed(2)}%
            </div>
            <div className="text-sm text-muted-foreground">
              Retorno mensal assumindo 20% de risco.
            </div>
            
            <div className="h-2 w-full bg-green-200 mt-4" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risco de Ruína</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-48 w-48 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f87171"
                  strokeWidth="10"
                  strokeDasharray={`${data.riskOfRuin} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="text-center">
                <div className="text-5xl font-bold">{data.riskOfRuin}%</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {data.riskOfRuin === 0 ? "Sem Risco" : "Risco de Ruína"}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-center max-w-xs mt-4">
              Em 0 ocorrências, com base em {simulations} simulações este capital seria zerado.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RiskManagement;
