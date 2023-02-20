import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const discountRouter = createTRPCRouter({
  issueUnassignedDiscount: adminProcedure
    .input(z.object({ label: z.string(), value: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.discount.create({
        data: {
          label: input.label,
          value: input.value,
        },
      });
    }),

  // Override pre-assigned discount (handled at client-level)
  issueSectionDiscount: adminProcedure
    .input(
      z.object({
        pids: z.string().array(),
        label: z.string(),
        value: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.discount.create({
        data: {
          products: {
            connect: input.pids.map((pid) => {
              return { pid };
            }),
          },
          label: input.label,
          value: input.value,
        },
      });
    }),
  issueProductDiscount: adminProcedure
    .input(z.object({ pid: z.string(), label: z.string(), value: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.discount.create({
        data: {
          label: input.label,
          value: input.value,
          products: {
            connect: {
              pid: input.pid,
            },
          },
        },
      });
    }),

  editDisocuntValue: adminProcedure
    .input(z.object({ did: z.string(), newValue: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.discount.update({
        where: {
          id: input.did,
        },
        data: {
          value: input.newValue,
        },
      });
    }),

  deleteDiscount: adminProcedure
    .input(z.object({ did: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.discount.delete({
        where: {
          id: input.did,
        },
      });
    }),

  getAllDiscounts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.discount.findMany({
      include: {
        products: {
          include: {
            _count: true,
          },
        },
      },
    });
  }),

  getDiscountById: publicProcedure
    .input(z.object({ did: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.discount.findUnique({
        where: {
          id: input.did,
        },
        include: {
          products: {
            include: {
              discount: true,
              sections: true,
              tags: true,
              variants: true,
            },
          },
        },
      });
    }),

  getDiscountsCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.discount.count();
  }),
});
