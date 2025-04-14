"use client";

import config from "@/../portfolio.config";
import Container from "@/components/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <Container>
      <nav className="py-10 lg:py-16 2xl:py-24">
        <div className="flex w-full items-center justify-between">
          <p className="text-base font-medium md:text-lg lg:text-xl 2xl:text-2xl">
            <Link href="/">{config.name}</Link>
          </p>
          <div className="flex gap-3 md:gap-6">
            <ul className="flex items-center gap-3 text-sm text-black md:gap-6 md:text-base 2xl:text-xl">
              <li className="hidden md:block">
                <Link
                  className="block text-ruby hover:underline"
                  href={`mailto:${config.email}`}
                >
                  {config.email}
                </Link>
              </li>
              <li>
                <Link
                  className={`block hover:text-ruby hover:underline ${
                    pathname === "/about/" ? "underline" : ""
                  }`}
                  href="/about/"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={`block hover:text-ruby hover:underline ${
                    pathname.startsWith("/blog/") ? "underline" : ""
                  }`}
                  href="/blog/"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={`block hover:text-ruby hover:underline ${
                    pathname.startsWith("/projects/") ? "underline" : ""
                  }`}
                  href="/projects/"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  className={`block hover:text-ruby hover:underline ${
                    pathname.startsWith("/photos/") ? "underline" : ""
                  }`}
                  href="/photos/albums/"
                >
                  Photos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Container>
  );
}
