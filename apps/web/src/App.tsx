import { Toaster } from "sonner";
import { Header } from "./components/layout/header";
import { FinanceProvider } from "./context/financeContext";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/layout/appSidebar";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from "./pages/home";
import { Clients } from "./pages/clients";
import { Plans } from "./pages/plans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
  {
    path: "/plans",
    element: <Plans />,
  }
]);

const queryClient = new QueryClient()

function App() {
  return (
    <FinanceProvider>
      <SidebarProvider className="min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <Toaster position="top-right" closeButton richColors />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </SidebarInset>
      </SidebarProvider>
    </FinanceProvider>
  );
}

export default App;
