import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const expenseData = [
  { name: 'Food', value: 25000, color: 'hsl(var(--chart-food))' },
  { name: 'Travel', value: 15000, color: 'hsl(var(--chart-travel))' },
  { name: 'Shopping', value: 12000, color: 'hsl(var(--chart-shopping))' },
  { name: 'Other', value: 8000, color: 'hsl(var(--chart-other))' }
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-medium">
        <p className="text-card-foreground font-medium">{data.name}</p>
        <p className="text-primary font-semibold">₹{data.value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ExpenseChart = () => {
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-gradient-card border-border shadow-medium">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-card-foreground">
          Expense Breakdown
        </CardTitle>
        <p className="text-2xl font-bold text-primary">
          ₹{totalExpenses.toLocaleString('en-IN')}
        </p>
        <p className="text-sm text-muted-foreground">Total Expenses This Month</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={4}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};