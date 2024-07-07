import LinkListComponent from "@/components/LinkListComponent.mjs";
import Title from "@/components/title.mjs";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
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

  function checkInteger(value, message = `The value must be an integer`) {
    const result = +value;
    if (Number.isSafeInteger(result)) {
      return result;
    } else {
      throw new RangeError(nessage);
    }
  }

  function checkYear(year) {
    return checkInteger(year, "The year must be an integer");
  }
  function checkMonth(month) {
    const result = checkInteger(month, "The month must be an integer");
    if (result < 1 || result > 12) {
      throw new RangeError("The month of year must be from 1 to 12");
    } else {
      return result;
    }
  }

  // The year is given.
  if (selectedYear && selectedMonth) {
    // Tye year and month is given.
    const year = checkYear(selectedYear);
    const month = checkMonth(selectedMonth);
    links = [];
    news = await getNewsForYearAndMonth(year, month);
  } else if (selectedYear && !selectedMonth) {
    // The Year is selected.
    const year = checkYear(selectedYear);

    // The year is okay.
    news  = await getNewsForYear(year);
    const availableMonths = await getAvailableNewsMonths(year);
    links = availableMonths.map((month) => ({
        key: month,
        href: `${year}/${month}`,
        title: `${month}`,
        toString() {
          return this.title;
        },
      }));
  } else {
    // The year is not given - creating the available years.
    const years = await getAvailableNewsYears();
    links = years.map((year) => ({
        key: year,
        href: `/archive/${year}`,
        title: `${year}`,
        toString() {
          return this.title;
        },
      }));
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
