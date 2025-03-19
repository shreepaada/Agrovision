"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers } from "react-icons/fi";

export const RouteSelect = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      <NavLink href="/dashboard" title="Home" icon={FiHome} active={pathname === "/dashboard"} />
      <NavLink href="/insights" title="Insights" icon={FiUsers} active={pathname === "/insights"} />
    </div>
  );
};

const NavLink = ({
  href,
  title,
  icon: Icon,
  active,
}: {
  href: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) => {
  return (
    <Link href={href} className={`flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm transition-all ${active ? "bg-white text-black shadow" : "hover:bg-gray-200 text-gray-600"}`}>
      <Icon className={active ? "text-green-500" : ""} />
      <span>{title}</span>
    </Link>
  );
};
