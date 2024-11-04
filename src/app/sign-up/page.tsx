"use client";
import type { FormData } from "@/types";
import { useState } from "react";
import { handleGoogleSignUp, signUp } from "@/(authentication)/auth";
import { Button } from "@/components/button";
import Image from "next/image";

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await signUp(formData);
  };

  return (
    <section className="min-h-dvh w-full flex items-center justify-center ">
      <div className="bg-white mt-[6rem] p-8 rounded shadow-md w-full max-w-md">
        <form action={handleSubmit}>
          <h1 className="text-[2.5rem] dark:text-clr-light font-bold mb-6 text-center">Sign Up</h1>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-3"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-gray-200 hover:border-blue focus:border-blue transition-all outline-none bg-white py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-gray-200 hover:border-blue focus:border-blue transition-all outline-none bg-white py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-3"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border-2 border-gray-200 hover:border-blue focus:border-blue transition-all outline-none bg-white py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="flex items-center justify-center w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
          >
            Sign Up
          </Button>
          <Button
            onClick={async () => await handleGoogleSignUp("google")}
            className="flex gap-4 items-center justify-center mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            <Image
              src="/icons8-google-48.png"
              alt="Google Icon"
              width={17}
              height={17}
            />
            Sign Up with Google
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
