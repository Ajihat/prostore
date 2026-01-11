"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { subscribeToNewsletter } from "@/lib/actions/newsletter.actions";
import { insertNewsletterSubscriber } from "@/lib/validators";
import { objectToFormData } from "@/lib/utils";

type FormValues = z.infer<typeof insertNewsletterSubscriber>;

const Newsletter = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(insertNewsletterSubscriber),
  });

  const onSubmit = async (data: FormValues) => {
    setSuccess(false);
    try {
      const formData = objectToFormData(data);
      await subscribeToNewsletter(formData);
      reset();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">Newsletter</h2>
      <p className="text-md mt-2">
        Subscribe to our newsletter to get the best offer alerts!
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex space-x-2">
          <Input type="email" placeholder="Your email" {...register("email")} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        {errors.email && (
          <p className="text-destructive text-xs mt-1 block">
            {errors.email.message}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-xs mt-1">
            Subscribed successfully!
          </p>
        )}
        {error && <p className="text-destructive text-xs mt-1">{error}</p>}
      </form>
    </div>
  );
};

export default Newsletter;
