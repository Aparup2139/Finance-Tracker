import { useState, useEffect } from 'react';
// 1. Import Link and useSearchParams to handle the success message
import { Link, useSearchParams } from 'react-router-dom'; 

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // This will check if you were redirected from the signup page
  useEffect(() => {
    if (searchParams.get('status') === 'success') {
      setSuccessMessage('Account created successfully! Please log in.');
    }
  }, [searchParams]);

  // ... (Your handleSubmit function remains the same) ...
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(''); // Clear success message on new attempt

    try {
      // ... (fetch logic is identical)
      const apiUrl = `${import.meta.env.VITE_API_URL}/login`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Login failed. Please check your credentials.');
      }
      localStorage.setItem('token', data.access_token);
      window.location.href = '/';
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
        Login to Your Account
      </h2>
      {successMessage && <p className="text-sm text-center text-success">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div>
          <button type="submit" disabled={isLoading} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
);
};