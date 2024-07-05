/**
 * The page for showing the archived messages from a month of a year..
 * @param {*} param0 
 * @returns {React.Component}
 */
export default function ArchiveYearListPage({params}) {
    const year = params.year;
    const month = params.month;

    return (<section>
        <header><Title>News Arichive on {month} of {year}</Title></header>
    </section>)
}