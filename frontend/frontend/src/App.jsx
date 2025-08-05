import Index from './pages/Index';

function App() {
  // This is the main component for your application.
  // For now, we are directly rendering the main dashboard page (Index).
  // In the future, you could add routing here to switch between different
  // pages like Login, Register, or a detailed Transactions page.
  return (
    <main>
      <Index />
    </main>
  );
}

export default App;