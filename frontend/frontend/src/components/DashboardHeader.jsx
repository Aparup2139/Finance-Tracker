import { Button } from '@/components/ui/button';
// 1. Import the LogOutIcon and useNavigate
import { PlusIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardHeader = ({ onAddTransaction }) => {
  // 2. Initialize the navigate function
  const navigate = useNavigate();

  // 3. Create the handleLogout function
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your expenses and manage your finances with ease
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* 4. The old buttons are removed and the new Logout button is added */}
        <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
          <LogOutIcon className="w-4 h-4" />
          Logout
        </Button>
        
        <Button onClick={onAddTransaction} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusIcon className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
};