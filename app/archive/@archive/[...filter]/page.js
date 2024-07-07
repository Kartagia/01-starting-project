import LinkListComponent from "@/components/LinkListComponent.mjs";
import Title from "@/components/title.mjs";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
} from "@/lib/dummyNews.mjs";
import Link from "next/link";

/**
 * The catch all implementation of the archive page.
 */
export default async function ArchivePage({ params }) {
  // Getting the parameters.
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  console.log(`Selected year: ${selectedYear ?? "No year selected"}`);
  console.log(`Selected month: ${selectedMonth ?? "No month selected"}`);

  /**
   * The links of the subcontext.
   */
  let links = [];

  /**
   * The shown news articles.
   */
  let news = [];

  // The year is given.
  if (selectedYear && !selectedMonth) {
    // The Year is selected.
    const year = +selectedYear;
    if (Number.isSafeInteger(year)) {
      // The year is okay.
      const loadedNews = await getNewsForYear(year);
      news.push(...loadedNews);
      const availableMonths = await getAvailableNewsMonths(year);
      links.push(
        ...availableMonths.map((month) => ({
          key: month,
          href: `${year}/${month}`,
          title: `${month}`,
          toString() {
            return this.title;
          },
        }))
      );
    } else {
      // The year is not okay.
      throw new RangeError(`The year must be an integer`);
    }
  } else {
    // The year is not given - creating the available years.
    const years = await getAvailableNewsYears();
    links.push(
      ...years.map((year) => ({
        key: year,
        href: `/archive/${year}`,
        title: `${year}`,
        toString() {
          return this.title;
        },
      }))
    );
  }

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
              <li key={link.key}>
                <Link href={`/archive/${link.href}`}>{`${link}`}</Link>
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
