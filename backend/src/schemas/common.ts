import { z } from "zod";
import { StrKey } from "@stellar/stellar-sdk";

// Building blocks shared by the per-route schemas, so the same kind of field
// (a wallet address, an asset code, a numeric id in the URL) is validated the
// same way everywhere it appears.

export const stellarAddress = z
  .string()
  .refine((value) => StrKey.isValidEd25519PublicKey(value), {
    message: "Must be a valid Stellar wallet address",
  });

// Stellar asset codes are 1-12 alphanumeric characters (e.g. "XLM", "USDC").
export const assetCode = z
  .string()
  .regex(/^[a-zA-Z0-9]{1,12}$/, "Must be a valid asset code (1-12 letters or digits)");

export const txHash = z.string().min(1).max(128);

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer"),
});
