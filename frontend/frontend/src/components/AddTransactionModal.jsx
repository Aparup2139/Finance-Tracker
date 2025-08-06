import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export const AddTransactionModal = ({ isOpen, onClose, onTransactionAdded }) => {
  // State for each form field
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // Default to 'expense'
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [category, setCategory] = useState('');

  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset form when the modal is closed or opened
  useEffect(() => {
    if (isOpen) {
      setDescription('');
      setAmount('');
      setType('expense');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory('');
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = `${import.meta.env.VITE_API_URL}/transactions`; // Use the environment variable
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          type,
          category,
          date,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to add transaction.');
      }

      // --- SUCCESS ---
      onTransactionAdded(); // This calls the function from Index.jsx to refresh the dashboard
      onClose(); // This closes the modal

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If the modal is not open, render nothing
  if (!isOpen) {
    return null;
}

return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md p-6 space-y-4 bg-card border border-border rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">&times;</button>
        <h2 className="text-xl font-bold text-center text-card-foreground">
          Add New Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-2 bg-input border border-border rounded-md text-foreground focus:ring-2 focus:ring-ring" />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full p-2 bg-input border border-border rounded-md text-foreground focus:ring-2 focus:ring-ring" />
          <input type="text" placeholder="Category (e.g., Food, Travel)" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 bg-input border border-border rounded-md text-foreground focus:ring-2 focus:ring-ring" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 bg-input border border-border rounded-md text-foreground focus:ring-2 focus:ring-ring" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 bg-input border border-border rounded-md text-foreground focus:ring-2 focus:ring-ring">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50">
            {isLoading ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
);
};