"use client";
import {
  SignOut,
  FileText,
  Pulse,
  Toolbox,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import SidebarItem from "./SidebarItem";
import Link from "next/link";

interface SidebarProps {
  role: "admin" | "user";
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  subMenu?: { label: string; href: string }[];
}

const menuItems: Record<"admin" | "user", MenuItem[]> = {
  admin: [
    {
      title: "Dashboard",
      icon: <Pulse size={24} className="text-primary-500" />,
      href: "/admin",
    },
    // {
    //   title: "Master Formulir",
    //   icon: <FileText size={24} className="text-primary-500" />,
    //   subMenu: [
    //     {
    //       label: "Formulir Baru",
    //       href: "/admin/master-formulir/formulir-baru",
    //     },
    //     { label: "Monitoring", href: "/admin/master-formulir/monitoring" },
    //   ],
    // },
    {
      title: "Master Workorder",
      icon: <Toolbox size={24} className="text-primary-500" />,
      subMenu: [
        {
          label: "Jenis Workorder",
          href: "/admin/master-workorder/jenis-workorder",
        },
      ],
    },
  ],
  user: [
    {
      title: "Dashboard",
      icon: <Pulse size={24} className="text-primary-500" />,
      href: "/user",
    },
    {
      title: "Workorder",
      icon: <Toolbox size={24} className="text-primary-500" />,
      subMenu: [
        { label: "Normal", href: "/user/workorder/normal" },
        { label: "Lembur", href: "/user/workorder/lembur" },
      ],
    },
    {
      title: "Riwayat",
      icon: <ClockCounterClockwise size={24} className="text-primary-500" />,
      subMenu: [
        { label: "Normal", href: "/user/riwayat/normal" },
        { label: "Lembur", href: "/user/riwayat/lembur" },
      ],
    },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const menu = menuItems[role] ?? [];
  return (
    <div className="bg-standardWhite text-standardBlack p-4 flex flex-col justify-between border-r-2 border-grey-300 h-full w-full overflow-y-auto">
      <div>
        <div className="flex justify-between items-center mb-4 space-x-3">
          <h2 className="text-primary-500 font-medium">Menu</h2>
        </div>
        <nav className="space-y-4">
          {menu.map((item, index) =>
            item.subMenu ? (
              <SidebarItem
                key={index}
                title={item.title}
                icon={item.icon}
                subMenu={item.subMenu}
              />
            ) : (
              <Link
                key={index}
                href={item.href!}
                className="flex items-center space-x-3 font-medium text-primary-900 hover:bg-primary-100 pl-1 py-2 rounded"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )
          )}
        </nav>
      </div>
      <Link
        href="/logout"
        className="flex space-x-3 hover:bg-primary-100 text-primary-900 font-medium pl-1 py-2 rounded"
      >
        <SignOut size={24} className="text-danger-500" />
        <span>Keluar</span>
      </Link>
    </div>
  );
}
