import LinkListComponent from "@/components/LinkListComponent.mjs";
import Title from "@/components/title.mjs";
import Link from "next/link";

/**
 * The catch all implementation of the archive page.
 */
export default function ArchivePage() {
  /**
   * The links of the subcontext.
   */
  let links = [];

  /**
   * The shown news articles.
   */
  let news = [];

  const content = news.length ? (
    <LinkListComponent items={news} />
  ) : (
    <p>No news for the year or month</p>
  );

  return (
    <section>
      <header>
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link}>
                <Link href={`/archive/${link}`}>{link}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Title>Archive Page</Title>
      </header>
      <main>{content}</main>
    </section>
  );
}
