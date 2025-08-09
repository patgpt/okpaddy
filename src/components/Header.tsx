import Link from "next/link";
import ThemeController from "./ThemeController";

export default function Header() {
  return (
    <header className="navbar bg-base-100/80 supports-[backdrop-filter]:bg-base-100/70 border-base-300 border-b backdrop-blur">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          okpaddy
        </Link>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal gap-1">
          <li>
            <Link href="/" className="font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" className="font-medium">
              Services
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-medium">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" className="font-medium">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className="font-medium">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="ml-2 flex-none">
        <ThemeController />
      </div>
    </header>
  );
}
