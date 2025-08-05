import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon, TrendingDownIcon, WalletIcon, CreditCardIcon } from 'lucide-react';

const stats = [
  {
    title: 'Total Balance',
    value: '₹1,24,500',
    change: '+12.5%',
    changeType: 'positive',
    icon: WalletIcon,
    description: 'From last month'
  },
  {
    title: 'Total Income',
    value: '₹1,00,000',
    change: '+8.2%',
    changeType: 'positive',
    icon: TrendingUpIcon,
    description: 'This month'
  },
  {
    title: 'Total Expenses',
    value: '₹60,000',
    change: '-5.4%',
    changeType: 'negative',
    icon: TrendingDownIcon,
    description: 'This month'
  },
  {
    title: 'Savings Rate',
    value: '40%',
    change: '+2.1%',
    changeType: 'positive',
    icon: CreditCardIcon,
    description: 'This month'
  }
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-card border-border shadow-medium hover:shadow-large transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground mb-1">
              {stat.value}
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.description}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};