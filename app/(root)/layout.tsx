import { isAuthenticated } from "@/lib/actions/auth.action";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const RootLayout = async({ children }: { children: ReactNode }) => {
  const isUserAuthenticated  = await isAuthenticated();

  return (
    <div className="root-layout">
      {isUserAuthenticated && (
        <nav className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={38} height={32} />
            <h2 className="text-primary-100">PrepIt</h2>
          </Link>
          <LogoutButton />
        </nav>
      )}
      {children}
    </div>
  );
};

export default RootLayout;
