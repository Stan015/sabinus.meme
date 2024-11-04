"use server";

import type { FormData } from "@/types";
import type { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    redirect("/error");
  } else {
    // console.log("User signed in:", data.user);
    revalidatePath("/", "layout");
    redirect("/");
  }
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error("Error signing up:", error.message);
    redirect("/error");
  }

  if (data) {
    // console.log("User signed up:", data.user);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME}/api/add-new-user-to-db`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const postUserData = await response.json();

      if (!response.ok) {
        throw new Error(`"Something went wrong", ${postUserData.error}`);
      }

      // console.log(data, postUserData);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export const handleGoogleSignUp = async (provider: Provider) => {
  const supabase = await createClient();
  const origin = (headers() as unknown as UnsafeUnwrappedHeaders).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${origin}/api/auth/confirm`,
    },
  });

  if (error) {
    console.error("Error signing up with Google:", error.message);
    redirect("/error");
  }

  // console.log("Google sign-up initiated", data);

  revalidatePath("/", "layout");
  redirect(`${data.url}`);
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
