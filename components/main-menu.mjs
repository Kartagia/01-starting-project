import Link from "next/link";

/**
 * The main component of links.
 */
export default function MainMenuComponent() {
  return (
    <header>
      <ul id="main-header">
        <li>
          <Link href="/">NextNews</Link>
        </li>
        <li>
          <Link href="/news">News</Link>
        </li>
      </ul>
    </header>
  );
}
