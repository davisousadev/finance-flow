import { GroupIcon, Plus } from "lucide-react";
import { Header } from "./components/layout/header";
import { Button } from "./components/ui/button";
import { Card } from "./components/card";
import React from "react";
import { clientsService } from "./services/clientsService";

function App() {
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    clientsService
      .getClients()
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col px-24 py-12">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-100 ">
              Dashboard Overview
            </h1>
            <p className="text-primary-100 mt-2 text-sm">
              Real-time performance metrics for October 2024
            </p>
          </div>
          <Button className="flex items-center bg-primary-gradient-right gap-2 p-4 font-bold ">
            <Plus />
            Add Subscription
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          <Card
            title="Total Clients"
            className="w-full"
            description="Number of active clients in October 2024"
            data={clients.length.toString()}
            icon={<GroupIcon />}
          />
        </div>
      </main>
    </>
  );
}

export default App;
