import { Toaster } from "sonner";
import { Home } from "./components/home";
import { Header } from "./components/layout/header";

function App() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col px-24 py-12">
        <Home />
        <Toaster position="top-right" richColors />
      </main>
    </>
  );
}

export default App;
