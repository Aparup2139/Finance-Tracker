import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage'; // Assuming LoginPage.jsx is in pages
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <main>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<LoginPage />} />
        {/* Public route for signup */}
        <Route path="/signup" element={<SignupPage />} />
        {/* The main dashboard route is now protected */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } 
        />
        {/* You can add a Signup page route here later */}
        {/* <Route path="/signup" element={<SignupPage />} /> */}
      </Routes>
    </main>
  );
}

export default App;