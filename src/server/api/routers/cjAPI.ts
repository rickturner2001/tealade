import { z } from "zod";
import {
  requestProductById,
  requestProductList,
  requestShipmentByVid,
} from "../../../functions";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const cjApiRouter = createTRPCRouter({
  /* TODO: Send a request for the latest updates by PID. Ensure that product.cost >= cj's listing price
              - Cj's listing price should include a shipment that matche product.shipments[0].est
                    the actual delivery should be <= shipments[0].est in terms of days. The actual price
                    should ALWAYS be <= shipments[0].cost
  */
});
