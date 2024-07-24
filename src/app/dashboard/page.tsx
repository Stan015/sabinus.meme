"use client";

import { signOut } from "@/(authentication)/auth";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await signOut();

    if (response.error) {
      console.error(response.error);
      router.push("/error");
    } else {
      router.push("/login");
    }
  };

  return (
    <section>
      <h1>Hello Dashboard</h1>
      <Button type="button" onClick={handleSignOut}>
        Sign Out
      </Button>
    </section>
  );
};

export default Dashboard;
