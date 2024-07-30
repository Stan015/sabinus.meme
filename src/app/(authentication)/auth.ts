"use server";

import { FormData } from "@/types";
// import { supabase } from "@/utils/supabaseClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function signIn(formData: FormData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    redirect("/error");
  } else {
    console.log("User signed in:", data.user);
    revalidatePath("/", "layout");
    redirect("/");
  }
}

export async function signUp(formData: FormData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
  
    if (error) {
      console.error("Error signing up:", error.message);
      redirect("/error");
    } 
    
    if (data) {
      console.log("User signed up:", data.user);
      revalidatePath("/", "layout");
      redirect("/");
    }

    const response = await fetch("http://localhost:3000/api/add-new-user-to-db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const postUserData = await response.json();

    if (!response.ok) {
      throw new Error( `"Something went wrong", ${postUserData.error}`);
    }

    console.log(data);
  } catch (error) {
    console.error((error as Error).message);
  }
}

export const handleGoogleSignUp = async (provider: Provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });

  if (error) {
    console.error("Error signing up with Google:", error.message);
    redirect("/error");
  }
  {
    console.log("Google sign-up initiated");
    revalidatePath("/", "layout");
    redirect("/");
  }
};

export const signOut = async () => {
  console.log("user just logged out");
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    return { error: error.message };
  }

  return { success: true };
};
