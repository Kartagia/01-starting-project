import LinkListComponent from "@/components/LinkListComponent.mjs";
import Title from "@/components/title.mjs";
import { getNewsForYearAndMonth } from "@/lib/dummyNews.mjs";

/**
 * The page for showing the archived messages from a month of a year..
 * @param {*} param0 
 * @returns {React.Component}
 */
export default async function ArchiveYearListPage({params}) {
    const year = Number.parseInt(params.year);
    const month = Number.parseInt(params.month);

    if (!Number.isSafeInteger(year)) {
        throw new RangeError(`The year should be an integer`);
    } else if (!Number.isSafeInteger(month)) {
        throw new RangeError(`The month of year should be an integer`);
    }

    const news = await getNewsForYearAndMonth(year, month);

    return (<section>
        <LinkListComponent title={(<>News Arrhive on {month}/{year}</>)} items={news}/>
    </section>)
}