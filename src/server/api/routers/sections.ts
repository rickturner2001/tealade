import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const sectionRouter = createTRPCRouter({
  // Read only
  getAllSesctions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shopSection.findMany();
  }),

  getSectionById: publicProcedure
    .input(z.object({ sid: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.findUnique({
        where: {
          id: input.sid,
        },
        include: {
          products: {
            include: {
              discount: true,
              variants: true,
            },
          },
        },
      });
    }),

  getSectionCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shopSection.count();
  }),
});
