import { Home } from "./components/Home";
import { Header } from "./components/layout/header";

function App() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col px-24 py-12">
        <Home />
      </main>
    </>
  );
}

export default App;
