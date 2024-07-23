import {
  AtSymbolIcon,
  KeyIcon,
  // ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { FormData } from "@/types";
import { FC } from "react";

type Props = {
  formData: FormData;
  // setFormData: (formData: FormData) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const LoginForm: FC<Props> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form action={handleSubmit}>
      <h1 className="text-[2.5rem] font-bold w-2/3 text-center m-auto">
        Login
      </h1>
      <div className="w-full">
        <div>
          <label
            className="mb-3 mt-5 block text-lg font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-lg font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData?.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-50 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <Button className="mt-4 w-full flex items-center justify-center gap-4" type="submit" >
        Log in <ArrowRightIcon className=" h-5 w-5 text-gray-500" />
      </Button>
    </form>
  );
};
export default LoginForm;
