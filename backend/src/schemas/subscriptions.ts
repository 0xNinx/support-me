import { z } from "zod";
import { assetCode, stellarAddress, txHash } from "./common";

export const listSubscriptionsQuerySchema = z.object({
  creatorUsername: z.string().optional(),
  supporterAddress: z.string().optional(),
});

export const createSubscriptionSchema = z.object({
  creatorUsername: z.string().min(1, "creatorUsername is required"),
  supporterAddress: stellarAddress,
  token: assetCode,
  amount: z.coerce.number().positive("amount must be a positive number"),
  intervalSecs: z.coerce.number().int().positive("intervalSecs must be a positive integer"),
  onChainId: z.coerce.number().int().nonnegative("onChainId is required"),
  subscribeTxHash: txHash.optional(),
});
