
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MonteCarloExplanation = () => {
  return (
    <section id="explanation" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">O que é o Método de Monte Carlo?</h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Uma abordagem probabilística poderosa para resolver problemas complexos através de simulações aleatórias.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Definição</h3>
            <p className="text-foreground/80">
              O Método de Monte Carlo, nomeado após o famoso cassino de Mônaco, é uma técnica 
              matemática que utiliza amostragem aleatória repetida para obter resultados numéricos. 
              A ideia essencial é usar aleatoriedade para resolver problemas que podem ser determinísticos em princípio.
            </p>
            <p className="text-foreground/80">
              Foi desenvolvido por cientistas trabalhando no Projeto Manhattan durante a Segunda Guerra Mundial 
              e ganhou popularidade em diversos campos devido à sua versatilidade e eficácia.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 h-full flex flex-col justify-center">
            <div className="math-formula text-lg">
              <p className="mb-4">Fórmula básica para aproximação de π usando Monte Carlo:</p>
              <p className="font-medium">π ≈ 4 × (pontos no círculo / total de pontos)</p>
              <div className="mt-6 text-sm text-foreground/70">
                <p>Se lançarmos aleatoriamente pontos em um quadrado de lado 2 centrado na origem,</p>
                <p>a razão entre os pontos que caem dentro do círculo unitário e o total de pontos</p>
                <p>se aproxima de π/4 conforme aumentamos o número de simulações.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Aplicações em Finanças</CardTitle>
              <CardDescription>Avaliação de riscos e retornos em investimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Em finanças, o método é usado para simular diferentes cenários de mercado, precificar opções, 
                avaliar Value at Risk (VaR) e otimizar portfólios de investimento considerando múltiplas 
                variáveis e incertezas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aplicações em Engenharia</CardTitle>
              <CardDescription>Análise de confiabilidade e performance</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Engenheiros utilizam Monte Carlo para avaliar a confiabilidade de sistemas, simular 
                comportamentos físicos complexos, otimizar processos de fabricação e analisar a 
                propagação de incertezas em seus modelos.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Aplicações em Ciência</CardTitle>
              <CardDescription>Simulação de fenômenos naturais</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Cientistas aplicam o método para modelar sistemas quânticos, simular interações moleculares, 
                prever eventos climáticos, estudar propagação de epidemias e entender fenômenos 
                astrofísicos complexos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MonteCarloExplanation;
