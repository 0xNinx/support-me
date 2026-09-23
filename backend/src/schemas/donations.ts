import { z } from "zod";

export const listDonationsQuerySchema = z.object({
  creatorUsername: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const createDonationSchema = z.object({
  creatorUsername: z.string().min(1, "creatorUsername is required"),
  senderAddress: z.string().min(1, "senderAddress is required"),
  amount: z.coerce.number().positive("amount must be a positive number"),
  currency: z.string().default("XLM"),
  message: z.string().max(500).optional(),
  transactionHash: z.string().optional(),
});
