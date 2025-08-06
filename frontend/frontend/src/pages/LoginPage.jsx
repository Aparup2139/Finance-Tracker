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
      const apiUrl = 'http://127.0.0.1:5000/login';
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
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-medium">
        <h2 className="text-2xl font-bold text-center text-card-foreground">
          Login to Your Account
        </h2>
        {/* Display success message if it exists */}
        {successMessage && <p className="text-sm text-center text-success">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (Your form inputs for email and password are the same) ... */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-muted-foreground"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-card-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-card-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 text-white bg-gradient-primary rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        {/* 2. Add the link to the signup page */}
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