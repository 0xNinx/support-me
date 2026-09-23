import { z } from "zod";
import { assetCode, txHash } from "./common";

export const listWithdrawalsQuerySchema = z.object({
  creatorUsername: z.string().optional(),
});

export const createWithdrawalSchema = z.object({
  creatorUsername: z.string().min(1, "creatorUsername is required"),
  amountIn: z.coerce.number().positive("amountIn must be a positive number"),
  amountOut: z.coerce.number().nonnegative().optional(),
  fee: z.coerce.number().nonnegative().optional(),
  currency: assetCode.default("USDC"),
  anchorTxId: z.string().min(1, "anchorTxId is required").max(128),
  stellarTxId: txHash.optional(),
  status: z.string().min(1).max(32).default("completed"),
});
