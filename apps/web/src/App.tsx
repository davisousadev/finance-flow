import { Toaster } from "sonner";
import { Home } from "./components/home";
import { Header } from "./components/layout/header";
import { FinanceProvider } from "./context/financeContext";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/appSidebar";

function App() {
  return (
    <FinanceProvider>
      <SidebarProvider className="min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <Home />
          <Toaster position="top-right" richColors />
        </SidebarInset>
      </SidebarProvider>
    </FinanceProvider>
  );
}

export default App;
