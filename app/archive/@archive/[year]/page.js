import Title from "@/components/title.mjs";

/**
 * The page for showing the archived messages from a year.
 * @param {*} param0 
 * @returns {React.Component}
 */
export default function ArchiveYearListPage({params}) {
    const year = params.year;


    return (<section>
        <header><Title>News Arichive on ${year}</Title></header>
    </section>)
}