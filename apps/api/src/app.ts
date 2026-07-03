import Fastify from "fastify";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import {clientsRoutes} from "./routes/clients.routes";
import {plansRoutes} from "./routes/plans.routes";
import {subscriptionRoute} from "./routes/subscriptions.route";
import "dotenv/config";

export const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(clientsRoutes);
app.register(plansRoutes);
app.register(subscriptionRoute);

app.listen(
  {
    port: Number(process.env.PORT) || 3000,
    host: "0.0.0.0",
  },
  (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
  },
);
