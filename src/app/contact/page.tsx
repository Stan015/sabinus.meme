"use client";

import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log(form);
  };

  return (
    <div>
      <h1 className="text-[2.5rem] font-bold w-2/3 text-center m-auto">Contact Us</h1>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required 
            className="w-[20rem] h-16 bg-gray-100 dark:text-black rounded-xl text-center p-4 border border-white transition-all hover:border-blue-400 file:border-blue-500 file:rounded-lg cursor-pointer file:cursor-pointer"
        
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className='block text-lg font-medium text-gray-700 mb-3'>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-[20rem] h-16 bg-gray-100 dark:text-black rounded-xl text-center p-4 border border-white transition-all hover:border-blue-400 file:border-blue-500 file:rounded-lg cursor-pointer file:cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-3">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-[20rem] h-16 bg-gray-100 dark:text-black rounded-xl text-center p-4 border border-white transition-all hover:border-blue-400 file:border-blue-500 file:rounded-lg cursor-pointer file:cursor-pointer"
          />
        </div>
        <button type="submit" className="w-max px-6 py-4 bg-blue-500 hover:bg-blue-600 transition-all text-white text-[1.2rem] font-bold rounded-xl">Submit</button>
      </form>
    </div>
  );
};

export default Contact;