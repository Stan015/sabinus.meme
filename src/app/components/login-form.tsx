"use client";

import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import type { FormData } from "@/types";
import { type FC, useState } from "react";
import { FormkitEyeclosed, RadixIconsEyeOpen } from "@/(icons)/icons";

type Props = {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  errorMessage: string | null;
  emailErrorMessage: string | null;
  passwordErrorMessage: string | null;
};

const LoginForm: FC<Props> = ({
  formData,
  handleChange,
  handleSubmit,
  errorMessage,
  emailErrorMessage,
  passwordErrorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form action={handleSubmit}>
      <h1 className="text-[2.5rem] dark:text-clr-light font-bold w-2/3 text-center m-auto">
        Login
      </h1>
      <div className="w-full">
        <div className="h-[6.2rem]">
          <label
            className="mb-2 mt-5 block text-lg font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border-2 border-gray-200 focus:border-blue hover:border-blue transition-all outline-none bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {emailErrorMessage && (
            <p className="text-[0.7rem] leading-tight text-red-600 mt-1">
              {emailErrorMessage}
            </p>
          )}
        </div>
        <div className="h-[5.7rem]">
          <label
            className="mb-2 mt-0 block text-lg font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <input
              className="block w-full rounded-md border-2 border-gray-200 hover:border-blue focus:border-blue transition-all outline-none bg-white py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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
      </div>
      <Button
        className="mt-4 w-full flex items-center justify-center gap-4"
        type="submit"
      >
        Log in <ArrowRightIcon className=" h-5 w-5 text-gray-500" />
      </Button>
    </form>
  );
};
export default LoginForm;
