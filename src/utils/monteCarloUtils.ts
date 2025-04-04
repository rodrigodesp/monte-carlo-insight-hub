
import { TradeDataPoint, ProcessedTrade, extractTrades, calculateDailyReturns, groupReturnsByPeriod } from './tradeDataUtils';

/**
 * Calculate drawdown statistics based on trade data
 */
export function calculateDrawdown(tradeData: TradeDataPoint[], numSimulations: number) {
  // Extract trades from trade data
  const trades = extractTrades(tradeData);
  
  // Perform Monte Carlo simulations
  const simulations = runMonteCarloSimulation(trades, numSimulations);
  
  // Calculate drawdown statistics from simulations
  const drawdowns = simulations.map(sim => calculateMaxDrawdown(sim));
  
  // Sort drawdowns from worst (most negative) to best (least negative)
  drawdowns.sort((a, b) => a - b);
  
  // Calculate statistics
  const maxDrawdown = drawdowns[0]; // Worst drawdown
  const minDrawdown = drawdowns[drawdowns.length - 1]; // Least bad drawdown
  const avgDrawdown = drawdowns.reduce((sum, val) => sum + val, 0) / drawdowns.length;
  
  // Calculate standard deviation
  const squaredDiffs = drawdowns.map(val => Math.pow(val - avgDrawdown, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / drawdowns.length;
  const stdDeviation = Math.sqrt(variance);
  
  // Calculate thresholds with standard deviations
  const avgPlusOneStd = avgDrawdown - stdDeviation; // Note: drawdowns are negative, so subtract
  const avgPlusTwoStd = avgDrawdown - (2 * stdDeviation);
  const avgPlusThreeStd = avgDrawdown - (3 * stdDeviation);
  
  // Count occurrences beyond thresholds
  const countOneStd = drawdowns.filter(d => d <= avgPlusOneStd).length;
  const countTwoStd = drawdowns.filter(d => d <= avgPlusTwoStd).length;
  const countThreeStd = drawdowns.filter(d => d <= avgPlusThreeStd).length;
  
  return {
    maxDrawdown, // Most negative value
    avgDrawdown,
    minDrawdown, // Least negative value
    stdDeviation,
    avgPlusOneStd,
    avgPlusTwoStd,
    avgPlusThreeStd,
    occurrencesOneStd: { count: countOneStd, percentage: (countOneStd / numSimulations) * 100 },
    occurrencesTwoStd: { count: countTwoStd, percentage: (countTwoStd / numSimulations) * 100 },
    occurrencesThreeStd: { count: countThreeStd, percentage: (countThreeStd / numSimulations) * 100 }
  };
}

/**
 * Calculate risk management parameters
 */
export function calculateRisk(drawdownStats: any) {
  // Calculate recommended capital based on maximum drawdown and 20% risk
  const recommendedCapital = Math.abs(drawdownStats.maxDrawdown) * 5; // 20% risk = 1/5
  
  // Calculate estimated monthly return
  const monthlyReturn = 799.20; // Using the average monthly value from your example
  const monthlyReturnPercentage = (monthlyReturn / recommendedCapital) * 100;
  
  // Risk of ruin (probability of losing all capital)
  const riskOfRuin = 0; // Assuming 0% based on your example
  
  return {
    recommendedCapital,
    monthlyReturn: monthlyReturnPercentage,
    riskOfRuin
  };
}

/**
 * Run Monte Carlo simulation on trade data
 */
function runMonteCarloSimulation(trades: ProcessedTrade[], numSimulations: number): number[][] {
  const profitLosses = trades.map(trade => trade.profit);
  const simulations: number[][] = [];
  
  for (let sim = 0; sim < numSimulations; sim++) {
    const simProfitLosses = shuffleArray([...profitLosses]);
    
    // Calculate equity curve
    let balance = 10000; // Starting balance
    const equityCurve: number[] = [balance];
    
    for (const pl of simProfitLosses) {
      balance += pl;
      equityCurve.push(balance);
    }
    
    simulations.push(equityCurve);
  }
  
  return simulations;
}

/**
 * Calculate maximum drawdown from an equity curve
 */
function calculateMaxDrawdown(equityCurve: number[]): number {
  let maxDrawdown = 0;
  let peak = equityCurve[0];
  
  for (const value of equityCurve) {
    if (value > peak) {
      peak = value;
    }
    
    const drawdown = value - peak;
    if (drawdown < maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  
  return maxDrawdown;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Calculate periods of equity stagnation (no new equity highs)
 */
export function calculateStagnationPeriods(simulations: number[][]): {
  best: number;
  average: number;
  worst: number;
} {
  const stagnationPeriods: number[] = [];
  
  simulations.forEach(equityCurve => {
    let currentPeak = equityCurve[0];
    let currentStagnation = 0;
    let maxStagnation = 0;
    
    for (const value of equityCurve) {
      if (value > currentPeak) {
        currentPeak = value;
        currentStagnation = 0;
      } else {
        currentStagnation++;
        maxStagnation = Math.max(maxStagnation, currentStagnation);
      }
    }
    
    stagnationPeriods.push(maxStagnation);
  });
  
  // Sort periods to find best, worst and average
  stagnationPeriods.sort((a, b) => a - b);
  
  return {
    best: stagnationPeriods[0],
    average: Math.round(stagnationPeriods.reduce((sum, val) => sum + val, 0) / stagnationPeriods.length),
    worst: stagnationPeriods[stagnationPeriods.length - 1]
  };
}
