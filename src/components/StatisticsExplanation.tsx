
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatisticsExplanation = () => {
  return (
    <section id="statistics" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Estatísticas Principais no Método de Monte Carlo</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Compreenda as métricas estatísticas fundamentais utilizadas nas análises de Monte Carlo.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Fundamentos Estatísticos</h3>
            <p className="text-foreground/80 mb-4">
              O método de Monte Carlo se baseia na Lei dos Grandes Números e no Teorema do Limite Central, 
              princípios fundamentais da teoria da probabilidade. Conforme aumentamos o número de simulações, 
              os resultados convergem para os valores reais esperados.
            </p>
            <p className="text-foreground/80">
              As análises de Monte Carlo frequentemente utilizam distribuições de probabilidade para modelar 
              incertezas, como distribuições normais, uniformes, triangulares, entre outras, dependendo do 
              fenômeno sendo estudado.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-medium mb-3">Propriedades Estatísticas Chave:</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2 mt-0.5 text-sm font-bold">1</div>
                <div>
                  <span className="font-medium">Convergência</span>: Com mais simulações, os resultados se aproximam do valor real.
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2 mt-0.5 text-sm font-bold">2</div>
                <div>
                  <span className="font-medium">Taxa de erro</span>: Tipicamente proporcional a 1/√N, onde N é o número de simulações.
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2 mt-0.5 text-sm font-bold">3</div>
                <div>
                  <span className="font-medium">Independência</span>: Os resultados não dependem da dimensionalidade do problema.
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold mb-6 text-center">Estatísticas Essenciais nas Análises de Monte Carlo</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Medidas de Tendência Central</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-primary">Média</h4>
                <p className="text-sm text-foreground/80">
                  Valor esperado dos resultados da simulação. Indica o resultado "típico" esperado 
                  em longo prazo. É calculada como a soma de todos os resultados dividida pelo número de simulações.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Mediana</h4>
                <p className="text-sm text-foreground/80">
                  Valor que divide os resultados ordenados em dois conjuntos iguais. É menos sensível 
                  a valores extremos e frequentemente usada para avaliar o "caso mais provável".
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Moda</h4>
                <p className="text-sm text-foreground/80">
                  Valor mais frequente nos resultados. Pode ser útil para identificar cenários 
                  predominantes em sistemas com múltiplos estados estáveis.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Medidas de Dispersão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-primary">Variância e Desvio Padrão</h4>
                <p className="text-sm text-foreground/80">
                  Medem a dispersão dos resultados em torno da média. Quanto maior o desvio padrão, 
                  maior a incerteza nos resultados. É fundamental para quantificar riscos.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Intervalo e Amplitude</h4>
                <p className="text-sm text-foreground/80">
                  A diferença entre o maior e o menor valor obtido nas simulações. Fornece uma medida 
                  simples da faixa total de possíveis resultados.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Intervalos de Confiança</h4>
                <p className="text-sm text-foreground/80">
                  Faixas de valores que têm uma probabilidade específica (geralmente 95%) de conter 
                  o valor real. Essenciais para estimar a precisão das simulações.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Medidas de Risco e Distribuição</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-primary">Percentis e Quartis</h4>
                <p className="text-sm text-foreground/80">
                  Valores que dividem os resultados em proporções específicas. O percentil 5% e 95% 
                  são frequentemente usados para definir cenários pessimistas e otimistas.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Value at Risk (VaR)</h4>
                <p className="text-sm text-foreground/80">
                  Em finanças, representa a perda máxima esperada com um nível de confiança específico 
                  em um período de tempo. Por exemplo, "VaR 95% de 1 milhão" significa que há 95% de chance 
                  de a perda não exceder 1 milhão.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Coeficientes de Assimetria e Curtose</h4>
                <p className="text-sm text-foreground/80">
                  Descrevem a forma da distribuição dos resultados. A assimetria indica se eventos extremos 
                  são mais prováveis em uma direção, enquanto a curtose mede a frequência de eventos extremos.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatisticsExplanation;
