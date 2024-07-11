"use client"
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
// import { AuthResponse } from '@supabase/supabase-js';

// type SignUpResponse = AuthResponse & {
//   user: {
//     id: string;
//     email: string;
//     // Add any other properties you expect the user object to have
//   };
// };

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };
  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('User signed up:', data.user);
    }
  }
  
  signUp('user@example.com', 'password123');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-[2.5rem] font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-3" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-3" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-3" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;