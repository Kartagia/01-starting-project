import Title from "@/components/title.mjs";
import { getAvailableNewsMonths, getNewsForYear } from "@/lib/dummyNews.mjs";
import Link from "next/link";

/**
 * The page for showing the archived messages from a year.
 * @param {*} param0 
 * @returns {React.Component}
 */
export default async function ArchiveYearListPage({params}) {
    const year = Number.parseInt(params.year);

    const news = await (getNewsForYear(year).then( (entries) => {
        entries.forEach( ([id, newsItem]) => {
            console.log(`News[${id}]:${newsItem.title}`);
        })
        return entries;
    }));
    const months = await getAvailableNewsMonths(year);

    return (<section id="archive-header">
        <header><Title>News Archive on {year}</Title>
            <nav>
                <ul>
                    {months.map( month => (<li key={month}><Link href={`/archive/${year}/${month}`}>{month}</Link></li>))}
                </ul>
            </nav>
        </header>
        <main>
            {news.map( ([id, newsItem]) => (<article key={newsItem.id}><Link href={`/news/${newsItem.slug}`}>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}></img>
            <Title>${newsItem.title}</Title>
            </Link></article>))}
        </main>
    </section>)
}