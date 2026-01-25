"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { objectToFormData } from "@/lib/utils";

import { signInFormSchema } from "@/lib/validators";
import { signInWithCredentials } from "@/lib/actions/user.actions";

type FormValues = z.infer<typeof signInFormSchema>;

const CredentialsSignInForm = () => {
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(signInFormSchema),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (data: FormValues) => {
    setLoginError("");
    try {
      const formData = objectToFormData(data);
      const response = await signInWithCredentials({}, formData);
      if (response.success) {
      } else {
        setLoginError(response.message);
      }
    } catch {
      setLoginError("Error! Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">
            <div className="flex w-full justify-between mb-1 h-[16px]">
              <span>E-mail</span>
              {errors.email && (
                <span className="text-destructive text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Your e-mail"
          />
        </div>
      </div>
      <div className="space-y-6 mt-4">
        <div>
          <Label htmlFor="password">
            <div className="flex w-full justify-between mb-1 h-[16px]">
              <span>Password</span>
              {errors.password && (
                <span className="text-destructive text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Your password"
          />
        </div>
      </div>
      <div>
        <Button
          className="w-full mt-6"
          variant="default"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </div>
      <div className="h-[20px] mt-1">
        {loginError && (
          <span className="text-destructive text-xs ">{loginError}</span>
        )}
      </div>
      <div className="text-sm text-center text-muted-foreground mt-8">
        Don&apos;t have an account?{" "}
        <Link href={"/sign-up"} className="underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
