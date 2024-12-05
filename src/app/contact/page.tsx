"use client";

import { EosIconsThreeDotsLoading } from "@/(icons)/icons";
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      toast.success("Message sent successfully");
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Failed to send message:", (error as Error).message);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100dvh-16rem)] mb-[2rem] mt-[8rem] px-[10%] flex flex-col items-center gap-5">
      <h1 className="text-[2.5rem] max-md:text-[1.5rem] font-bold w-2/3 text-center">
        Contact Us
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 flex flex-col items-center"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700 dark:text-clr-dark mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-[25rem] max-sm:w-[18.5rem] h-10 bg-gray-100 dark:text-black rounded-xl p-4 border border-white transition-all hover:border-blue cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 dark:text-clr-dark mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-[25rem] max-sm:w-[18.5rem] h-10 bg-gray-100 dark:text-black rounded-xl p-4 border border-white transition-all hover:border-blue cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-lg font-medium text-gray-700 dark:text-clr-dark mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter your message..."
            required
            className="w-[25rem] max-sm:w-[18.5rem] h-[10rem] bg-gray-100 dark:text-black rounded-xl p-4 border border-white transition-all hover:border-blue cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="w-[10rem] flex items-center justify-center max-sm:w-[18.5rem] py-3 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] font-bold rounded-xl"
        >
          {loading ? (
            <>
              Sending <EosIconsThreeDotsLoading />
            </>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;
