import Link from "next/link";

/**
 * The main component of links.
 */
export default function MainMenuComponent() {
  return (
    <header>
      <ul id="main-header">
        <li>
          <Link href="/">News Page</Link>
        </li>
        <li>
          <Link href="/news">All News</Link>
        </li>
      </ul>
    </header>
  );
}
