
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MonteCarloExplanation from '@/components/MonteCarloExplanation';
import SimpleSimulator from '@/components/SimpleSimulator';
import StatisticsExplanation from '@/components/StatisticsExplanation';
import TradingMonteCarloAnalysis from '@/components/TradingMonteCarloAnalysis';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MonteCarloExplanation />
        <SimpleSimulator />
        <TradingMonteCarloAnalysis />
        <StatisticsExplanation />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
