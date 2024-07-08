import Title from "@/components/title.mjs";
import { getAvailableNewsYears } from "@/lib/dummyNews.mjs";
import Link from "next/link";

/**
 * The archive page with selecting archived news by year and month.
 *
 */
export default async function ArchivePage() {
  const newsYears = await getAvailableNewsYears();

  return (
    <header>
      <nav>
        <ul>
          {newsYears.map((link) => (
            <li key={link}>
              <Link href={`/archive/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Title>Archive Page</Title>
    </header>
  );
}
