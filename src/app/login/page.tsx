"use client";

import { useState } from "react";
import { handleGoogleSignUp, signIn } from "@/(authentication)/auth";
import LoginForm from "../components/login-form";
import { FormData } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import Image from "next/image";

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    signIn(formData);
  };

  return (
    <div className="h-[calc(100svh-6rem)] flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        <Button
            onClick={handleGoogleSignUp}
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
      </div>
    </div>
  );
}
