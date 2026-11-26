"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

export default function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: "Вихід із системи успішно виконано" });
  };

  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left" onClick={handleLogout}>
        Вийти
      </Link>
    </SignOutButton>
  );
}
