"use client";
import { Bell, User } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex h-full w-full justify-between items-center bg-standardWhite border-b-2 border-grey-300 text-primary-500 py-4 px-12">
      <Link
        href="https://www.pdam-sby.go.id/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <Image
          src="/images/logo-pdam.svg"
          alt="logo pdam"
          width={40}
          height={40}
        />
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/login" className="cursor-pointer">
          <User size={24} />
        </Link>
        <div>Profile</div>
        <div>
          <Bell size={24} />
        </div>
      </div>
    </div>
  );
}
