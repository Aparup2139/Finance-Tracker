import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardStats } from '@/components/DashboardStats';
import { ExpenseChart } from '@/components/ExpenseChart';
import { TransactionList } from '@/components/TransactionList';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <DashboardHeader />
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart />
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

// You might need a default export depending on your routing setup
export default Index;