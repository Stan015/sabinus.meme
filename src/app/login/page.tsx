"use client";

import type { FormData } from "@/types";
import { useState } from "react";
import { handleGoogleSignUp, signIn } from "@/(authentication)/auth";
import LoginForm from "../components/login-form";
import { Button } from "@/components/button";
import Image from "next/image";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(4, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters"),
});

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null,
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      loginSchema.parse(formData);
      await signIn(formData);
      setEmailErrorMessage(null);
      setPasswordErrorMessage(null);
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const emailErrors = error.errors
          .filter((err) => err.path.includes("email"))
          .map((err) => err.message);
        const passwordErrors = error.errors
          .filter((err) => err.path.includes("password"))
          .map((err) => err.message);

        setEmailErrorMessage(emailErrors.join(", "));
        setPasswordErrorMessage(passwordErrors.join(", "));
      } else {
        setErrorMessage("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100dvh-8rem)] mb-[2rem] w-full px-[10%] max-md:my-5 flex items-center justify-center ">
      <div className="bg-white mt-[6rem] p-8 rounded shadow-md w-full max-w-md">
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
        />
        <Button
          onClick={async () => await handleGoogleSignUp("google")}
          className="flex gap-2 items-center justify-center mt-4 bg-blue text-white hover:bg-blue-deep w-full"
        >
          <Image
            src="/icons8-google-48.png"
            alt="Google Icon"
            width={17}
            height={17}
          />
          Sign In with Google
        </Button>
      </div>
    </section>
  );
}
