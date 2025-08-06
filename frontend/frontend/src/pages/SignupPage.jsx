import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/register`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to create account.');
      }

      // --- SIGNUP SUCCESS ---
      // Redirect to the login page with a success message
      navigate('/login?status=success');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card border border-border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-card-foreground">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div>
              <button type="submit" disabled={isLoading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50">
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};