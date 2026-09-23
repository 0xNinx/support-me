import { z } from "zod";
import { assetCode, stellarAddress, txHash } from "./common";

export const listDonationsQuerySchema = z.object({
  creatorUsername: z.string().optional(),
});

export const createDonationSchema = z.object({
  creatorUsername: z.string().min(1, "creatorUsername is required"),
  senderAddress: stellarAddress,
  amount: z.coerce.number().positive("amount must be a positive number"),
  currency: assetCode.default("XLM"),
  message: z.string().max(500).optional(),
  transactionHash: txHash.optional(),
});
