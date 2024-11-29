"use server";

import type { NextRequest } from "next/server";
import { createClient } from "./supabase/server";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export const fetchUsername = async (
  req?: NextRequest,
): Promise<string | null> => {
  try {
    const user = (await (await createClient()).auth.getUser()).data.user;

    const origin = ((await headers()) as unknown as UnsafeUnwrappedHeaders).get(
      "origin",
    );

    const response = await fetch(`${origin}/api/get-username`, {
      method: "GET",
      headers: {
        "x-user-email": `${user?.email}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    if (!data.username) {
      throw new Error("Username not found in response");
    }

    return data.username as string;
  } catch (error) {
    console.error("Failed to fetch username or upload image:", error);
    return null;
  }
};
