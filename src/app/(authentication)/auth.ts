import { FormData } from "@/types";
import { supabase } from "../lib/supabaseClient";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error("Error signing in:", error.message);
  } else {
    console.log("User signed in:", data.user);
    redirect('/')
  }
}

export async function signUp(formData: FormData) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error("Error signing up:", error.message);
  } else {
    console.log("User signed up:", data.user);
    redirect('/')
  }
}

export const handleGoogleSignUp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Error signing up with Google:", error.message);
  } else {
    console.log("Google sign-up initiated");
    redirect('/')
  }
};
