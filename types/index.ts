import { z } from "zod";
import {
  insertProductSchema,
  insertNewsletterSubscriber,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type NewsletterSubscriber = z.infer<
  typeof insertNewsletterSubscriber
> & {
  id: string;
  addedAt: Date;
};
