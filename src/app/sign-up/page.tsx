"use client";

import type { FormData } from "@/types";
import { useState } from "react";
import { handleGoogleSignUp, signUp } from "@/(authentication)/auth";
import { Button } from "@/components/button";
import Image from "next/image";
import { KeyIcon } from "@heroicons/react/24/outline";
import {
  EosIconsThreeDotsLoading,
  FormkitEyeclosed,
  RadixIconsEyeOpen,
} from "@/(icons)/icons";
import { z } from "zod";
import Link from "next/link";

const signUpSchema = z.object({
  username: z.string().min(6, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address").min(4, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters"),
});

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null,
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      signUpSchema.parse(formData);
      await signUp(formData);

      setUsernameErrorMessage(null);
      setEmailErrorMessage(null);
      setPasswordErrorMessage(null);
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const err of error.errors) {
          if (err.path.includes("username"))
            setUsernameErrorMessage(err.message);
          if (err.path.includes("email")) setEmailErrorMessage(err.message);
          if (err.path.includes("password"))
            setPasswordErrorMessage(err.message);
        }
      } else if (
        error instanceof Error &&
        error.message.includes("Username already exists")
      ) {
        setUsernameErrorMessage(
          "Username already exists. Please choose a different one.",
        );
        console.error(error.message);
      } else if ((error as Error).message.includes("Email already exists")) {
        setEmailErrorMessage((error as Error).message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100dvh-8rem)] mb-[2rem] w-full flex px-[10%] max-md:my-5 items-center justify-center ">
      <div className="bg-white mt-[6rem] p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[2.5rem] dark:text-clr-light font-bold mb-6 text-center">
            Sign Up
          </h1>
          <div className="h-[6.2rem]">
            <label
              className="mb-2 mt-5 block text-lg font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              onChange={handleChange}
              className="block w-full text-clr-light rounded-md border-2 border-gray-200 hover:border-blue focus:border-blue transition-all outline-none bg-white py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
            />
            {usernameErrorMessage && (
              <p className="text-[0.7rem] leading-tight text-red-600 mt-1">
                {usernameErrorMessage}
              </p>
            )}
          </div>
          <div className="h-[6.2rem]">
            <label
              className="mb-2 block text-lg font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full text-clr-light rounded-md border-2 border-gray-200 hover:border-blue focus:border-blue transition-all outline-none bg-white py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
            />
            {emailErrorMessage && (
              <p className="text-[0.7rem] leading-tight text-red-600 mt-1">
                {emailErrorMessage}
              </p>
            )}
          </div>
          <div className="h-[6.2rem]">
            <label
              className="mb-2 block text-lg font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <input
                className="block w-full text-clr-light rounded-md border-2 border-gray-200 hover:border-blue focus:border-blue transition-all outline-none bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData?.password}
                onChange={handleChange}
              />
              <button
                type="button"
                aria-label="toggle show password"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 top-1/2"
              >
                {!showPassword ? (
                  <FormkitEyeclosed className="h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                ) : (
                  <RadixIconsEyeOpen className="h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                )}
              </button>
            </div>
            {(errorMessage || passwordErrorMessage) && (
              <p className="text-[0.7rem] leading-tight text-red-600 mt-1">
                {errorMessage || passwordErrorMessage}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="flex gap-2 items-center justify-center mt-4 bg-blue text-white hover:bg-blue-deep w-full"
          >
            {loading ? (
              <>
                Signing Up <EosIconsThreeDotsLoading />
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
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
            Sign Up with Google
          </Button>
          <p className="text-[0.8rem]  text-clr-light leading-tight w-full text-center mt-2">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-deep hover:underline ">
              Login.
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
