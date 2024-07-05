import Link from "next/link";

/**
 * The main component of links.
 */
export default function MainComponent() {
  return (
    <>
      <Link href="/">News Page</Link>
      <Link href="/news">All News</Link>
    </>
  );
}
