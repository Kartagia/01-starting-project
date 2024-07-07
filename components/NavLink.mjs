"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Is the link active.
 * @param {string} path The current path.
 * @param {string} prefix The active path prefix.
 * @returns {boolean} True, if and only if the path is active.
 */
function isActive(path, prefix) {
  return typeof path === "string" && path.startsWith(prefix);
}

/**
 * Navigation link component.
 */
export default function NavLink({ href, children }) {
  const path = usePathname();

  let classNames = [];

  if (isActive(path, href) && !classNames.includes("active")) {
    classNames = [...classNames, "active"];
  } else if (!isActive(path, href) && classNames.includes("active")) {
    classNames = classNames.filter( className => className !== "active");
  }

  const style = classNames?.length ? classNames.join(" ") : undefined;

  return (
    <Link href={href} className={isActive(path, href) ? "active": undefined}>
      {children}
    </Link>
  );
}
