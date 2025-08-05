import { Button } from '@/components/ui/button';
import { PlusIcon, SettingsIcon, BellIcon } from 'lucide-react';

export const DashboardHeader = () => {
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
        <Button variant="outline" size="sm" className="gap-2">
          <BellIcon className="w-4 h-4" />
          Notifications
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <SettingsIcon className="w-4 h-4" />
          Settings
        </Button>
        <Button className="gap-2 bg-gradient-primary hover:opacity-90">
          <PlusIcon className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
};