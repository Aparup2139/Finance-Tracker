import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon, TrendingDownIcon, WalletIcon, CreditCardIcon } from 'lucide-react';

const icons = {
  'Total Balance': WalletIcon,
  'Total Income': TrendingUpIcon,
  'Total Expenses': TrendingDownIcon,
  'Savings Rate': CreditCardIcon
};

// Accept 'statsData' as a prop instead of using the hardcoded array
export const DashboardStats = ({ statsData }) => {
  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  const formatPercent = (value) => `${value.toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => {
        const Icon = icons[stat.title];
        const changePrefix = stat.change > 0 ? '+' : '';
        const valueDisplay = stat.title === 'Savings Rate' ? formatPercent(stat.value) : formatCurrency(stat.value);
        const changeDisplay = formatPercent(stat.change);
        
        return (
          <Card key={stat.title} className="...">
            {/* CardHeader */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            {/* CardContent */}
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground mb-1">{valueDisplay}</div>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-success' : 'text-destructive'}`}>
                  {changePrefix}{changeDisplay}
                </span>
                <span className="text-sm text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};