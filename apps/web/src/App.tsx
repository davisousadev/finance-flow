import { Toaster } from "sonner";
import { Home } from "./components/home";
import { Header } from "./components/layout/header";
import { FinanceProvider } from "./context/financeContext";

function App() {
  return (
    <FinanceProvider>
      <Header />
      <main className="flex min-h-screen flex-col px-24 py-12">
        <Home />
        <Toaster position="top-right" richColors />
      </main>
    </FinanceProvider>
  );
}

export default App;
