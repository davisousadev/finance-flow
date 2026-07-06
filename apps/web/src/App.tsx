import { Toaster } from "sonner";
import { Header } from "./components/layout/header";
import { FinanceProvider } from "./context/financeContext";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/appSidebar";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from "./pages/home";
import { Clients } from "./pages/clients";
import { Plans } from "./pages/plans";

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

function App() {
  return (
    <FinanceProvider>
      <SidebarProvider className="min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <Toaster position="top-right" richColors />
          <RouterProvider router={router} />
        </SidebarInset>
      </SidebarProvider>
    </FinanceProvider>
  );
}

export default App;
