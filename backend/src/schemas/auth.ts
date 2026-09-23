import { z } from "zod";
import { stellarAddress } from "./common";

export const challengeSchema = z.object({
  walletAddress: stellarAddress,
});

export const verifySchema = z.object({
  walletAddress: stellarAddress,
  signedMessage: z.string().min(1, "signedMessage is required"),
});
