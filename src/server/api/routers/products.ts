import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
export const productRouter = createTRPCRouter({
  // Categories

  // Categories Queries
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({});
  }),
  // Categories Mutations
  blukCreateNewCategory: publicProcedure
    .input(z.object({ label: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.category.createMany({
        data: {
          label: input.label,
        },
      });
    }),

  createNewSubCategory: publicProcedure
    .input(z.object({ label: z.string(), category: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.subCategory.createMany({
        data: {
          categoryLabel: input.category,
          label: input.label,
        },
      });
    }),
});
