import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const sectionRouter = createTRPCRouter({
  createSectionWithProducts: protectedProcedure
    .input(z.object({ label: z.string(), pids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.create({
        data: {
          label: input.label,
          products: {
            connect: input.pids.map((pid) => {
              return { pid };
            }),
          },
        },
      });
    }),

  crateSection: protectedProcedure
    .input(z.object({ label: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.create({
        data: {
          label: input.label,
        },
      });
    }),

  addProductsToSection: protectedProcedure
    .input(z.object({ sid: z.string(), pids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.update({
        where: {
          id: input.sid,
        },
        data: {
          products: {
            connect: input.pids.map((pid) => {
              return { pid };
            }),
          },
        },
      });
    }),

  removeProductsFromSection: protectedProcedure
    .input(z.object({ sid: z.string(), pids: z.string().array() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.update({
        where: {
          id: input.sid,
        },
        data: {
          products: {
            disconnect: input.pids.map((pid) => {
              return { pid };
            }),
          },
        },
      });
    }),

  deleteSection: protectedProcedure
    .input(z.object({ sid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shopSection.delete({
        where: {
          id: input.sid,
        },
      });
    }),

  // Read only
  getAllSesctions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shopSection.findMany();
  }),
});
