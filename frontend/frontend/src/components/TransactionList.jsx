import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

const transactions = [
  {
    id: 1,
    description: 'Grocery Shopping - BigBazaar',
    amount: -2500,
    category: 'Food',
    date: '2024-08-05',
    type: 'expense'
  },
  {
    id: 2,
    description: 'Salary Credit',
    amount: 85000,
    category: 'Income',
    date: '2024-08-01',
    type: 'income'
  },
  {
    id: 3,
    description: 'Flight Booking - SpiceJet',
    amount: -8500,
    category: 'Travel',
    date: '2024-08-04',
    type: 'expense'
  },
  {
    id: 4,
    description: 'Online Shopping - Amazon',
    amount: -3200,
    category: 'Shopping',
    date: '2024-08-03',
    type: 'expense'
  },
  {
    id: 5,
    description: 'Restaurant Bill - Cafe Coffee Day',
    amount: -750,
    category: 'Food',
    date: '2024-08-05',
    type: 'expense'
  },
  {
    id: 6,
    description: 'Uber Ride',
    amount: -350,
    category: 'Travel',
    date: '2024-08-04',
    type: 'expense'
  },
  {
    id: 7,
    description: 'Movie Tickets - PVR',
    amount: -800,
    category: 'Entertainment',
    date: '2024-08-03',
    type: 'expense'
  },
  {
    id: 8,
    description: 'Freelance Payment',
    amount: 15000,
    category: 'Income',
    date: '2024-08-02',
    type: 'income'
  },
  {
    id: 9,
    description: 'Petrol - HP Gas Station',
    amount: -2000,
    category: 'Other',
    date: '2024-08-01',
    type: 'expense'
  },
  {
    id: 10,
    description: 'Book Purchase - Flipkart',
    amount: -500,
    category: 'Shopping',
    date: '2024-08-01',
    type: 'expense'
  }
];

const getCategoryColor = (category) => {
  const colors = {
    'Food': 'bg-chart-food text-warning-foreground',
    'Travel': 'bg-chart-travel text-info-foreground',
    'Shopping': 'bg-chart-shopping text-card-foreground',
    'Entertainment': 'bg-chart-other text-card-foreground',
    'Other': 'bg-chart-other text-card-foreground',
    'Income': 'bg-chart-income text-success-foreground'
  };
  return colors[category] || 'bg-muted text-muted-foreground';
};

export const TransactionList = () => {
  return (
    <Card className="bg-gradient-card border-border shadow-medium">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-success/20 text-success'
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-card-foreground text-sm">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getCategoryColor(transaction.category)}`}
                      >
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0
                      ? 'text-success'
                      : 'text-destructive'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};