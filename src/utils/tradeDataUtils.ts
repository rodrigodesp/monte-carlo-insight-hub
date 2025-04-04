
/**
 * Parse string data from trading history into structured format
 */
export interface TradeDataPoint {
  date: Date;
  balance: number;
  equity: number;
  deposit: number;
}

export interface ProcessedTrade {
  entryDate: Date;
  exitDate: Date;
  profit: number;
  duration: number; // in minutes
}

export function parseTradeData(rawData: string): TradeDataPoint[] {
  const lines = rawData.trim().split('\n');
  
  // Skip header line if present
  const startIndex = lines[0].includes('<DATE>') ? 1 : 0;
  
  return lines.slice(startIndex).map(line => {
    const [dateStr, balanceStr, equityStr, depositStr] = line.split(/\s+/);
    
    // Parse date from MT4/MT5 format (YYYY.MM.DD HH:MM)
    const [datePart, timePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('.').map(Number);
    const [hour, minute] = timePart ? timePart.split(':').map(Number) : [0, 0];
    
    const date = new Date(year, month - 1, day, hour, minute);
    
    return {
      date,
      balance: parseFloat(balanceStr),
      equity: parseFloat(equityStr),
      deposit: parseFloat(depositStr)
    };
  });
}

export function extractTrades(dataPoints: TradeDataPoint[]): ProcessedTrade[] {
  const trades: ProcessedTrade[] = [];
  let inTrade = false;
  let entryPoint: TradeDataPoint | null = null;
  
  for (let i = 1; i < dataPoints.length; i++) {
    const current = dataPoints[i];
    const previous = dataPoints[i - 1];
    
    // Trade entry detected (equity differs from balance)
    if (!inTrade && current.equity !== current.balance) {
      inTrade = true;
      entryPoint = current;
    }
    
    // Trade exit detected (equity equals balance after being different)
    if (inTrade && current.equity === current.balance && previous.equity !== previous.balance) {
      if (entryPoint) {
        const profit = current.balance - entryPoint.balance;
        const durationMs = current.date.getTime() - entryPoint.date.getTime();
        const durationMinutes = durationMs / (1000 * 60);
        
        trades.push({
          entryDate: new Date(entryPoint.date),
          exitDate: new Date(current.date),
          profit,
          duration: durationMinutes
        });
      }
      
      inTrade = false;
      entryPoint = null;
    }
  }
  
  return trades;
}

export function calculateDailyReturns(dataPoints: TradeDataPoint[]): Map<string, number> {
  const dailyReturns = new Map<string, number>();
  
  // Group data points by day
  const groupedByDay = dataPoints.reduce((acc, point) => {
    const dateKey = point.date.toISOString().split('T')[0];
    if (!acc.has(dateKey)) {
      acc.set(dateKey, []);
    }
    acc.get(dateKey)?.push(point);
    return acc;
  }, new Map<string, TradeDataPoint[]>());
  
  // Calculate daily returns
  Array.from(groupedByDay.entries()).forEach(([dateKey, points]) => {
    if (points.length > 0) {
      const sortedPoints = points.sort((a, b) => a.date.getTime() - b.date.getTime());
      const openBalance = sortedPoints[0].balance;
      const closeBalance = sortedPoints[sortedPoints.length - 1].balance;
      const dailyReturn = closeBalance - openBalance;
      
      dailyReturns.set(dateKey, dailyReturn);
    }
  });
  
  return dailyReturns;
}

export function groupReturnsByPeriod(dailyReturns: Map<string, number>): {
  monthly: Map<string, number>;
  quarterly: Map<string, number>;
  semiannual: Map<string, number>;
  annual: Map<string, number>;
} {
  const monthly = new Map<string, number>();
  const quarterly = new Map<string, number>();
  const semiannual = new Map<string, number>();
  const annual = new Map<string, number>();
  
  Array.from(dailyReturns.entries()).forEach(([dateKey, value]) => {
    const date = new Date(dateKey);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    // Monthly groups
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
    monthly.set(monthKey, (monthly.get(monthKey) || 0) + value);
    
    // Quarterly groups
    const quarter = Math.floor((month - 1) / 3) + 1;
    const quarterKey = `${year}-Q${quarter}`;
    quarterly.set(quarterKey, (quarterly.get(quarterKey) || 0) + value);
    
    // Semi-annual groups
    const half = month <= 6 ? 1 : 2;
    const halfKey = `${year}-H${half}`;
    semiannual.set(halfKey, (semiannual.get(halfKey) || 0) + value);
    
    // Annual groups
    const yearKey = `${year}`;
    annual.set(yearKey, (annual.get(yearKey) || 0) + value);
  });
  
  return { monthly, quarterly, semiannual, annual };
}
