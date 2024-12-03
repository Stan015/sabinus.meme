"use server";

import type { FormData } from "@/types";
import type { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Invalid email or password. Please try again.");
      }
      if (error.message.includes("Email not confirmed")) {
        throw new Error(
          "Your email address is not confirmed. Please check your inbox.",
        );
      }
      throw new Error("An unexpected error occurred during sign-in.");
    }

    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    console.error("Error during sign-in:", (error as Error).message);
    throw error;
  }
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const origin = ((await headers()) as unknown as UnsafeUnwrappedHeaders).get(
    "origin",
  );

  // Check if username or email already exists
  try {
    const response = await fetch(`${origin}/api/check-username-and-email`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-username": `${formData.username}`,
        "x-email": `${formData.email}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.details) {
        const { username, email } = errorResponse.details;

        if (username) {
          throw new Error(username);
        }
        if (email) {
          throw new Error(email);
        }
      }
      throw new Error(errorResponse.error || "Validation failed");
    }
  } catch (error) {
    console.error("Validation error:", (error as Error).message);
    throw error;
  }

  // Proceed with sign-up
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${origin}/api/auth/confirm`,
    },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    throw new Error(error.message);
  }

  if (data) {
    try {
      const response = await fetch(`${origin}/api/add-new-user-to-db`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const postUserData = await response.json();
        throw new Error(
          postUserData.error || "Error adding user to the database",
        );
      }
    } catch (error) {
      console.error("Error adding user to database:", (error as Error).message);
      throw error;
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export const handleGoogleSignUp = async (provider: Provider) => {
  const supabase = await createClient();
  const origin = ((await headers()) as unknown as UnsafeUnwrappedHeaders).get(
    "origin",
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/api/auth/confirm`,
    },
  });

  if (error) {
    console.error("Error signing up with Google:", error.message);
  }

  if (data?.url) {
    redirect(data.url);
  } else {
    console.error("Error: No URL returned from Google sign-up.");
  }
};

export const signOut = async () => {
  const supabase = await createClient();

  console.log("user just logged out");
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    return { error: error.message };
  }

  return { success: true };
};

export const recoverPassword = async (email: string) => {};
