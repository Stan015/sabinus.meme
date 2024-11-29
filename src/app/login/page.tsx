"use client";

import type { FormData } from "@/types";
import { useState } from "react";
import { handleGoogleSignUp, signIn } from "@/(authentication)/auth";
import LoginForm from "../components/login-form";
import { Button } from "@/components/button";
import Image from "next/image";

export default function Login() {
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
    await signIn(formData);
  };

  return (
    <section className="min-h-[calc(100dvh-8rem)] mb-[2rem] w-full px-[10%] max-md:my-5 flex items-center justify-center ">
      <div className="bg-white mt-[6rem] p-8 rounded shadow-md w-full max-w-md">
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
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
