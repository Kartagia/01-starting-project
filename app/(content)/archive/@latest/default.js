import LinkListComponent from "@/components/LinkListComponent.mjs";
import { getLatestNews } from "@/lib/news.mjs";
import React from "react";

/**
 * The default latest news page. This is actually the implementation of the
 * latest branch. 
 * @returns {React.Component}
 */
export default async function LatestNewsPage() {
    const news = await getLatestNews(3);

    return (
        <>
            <LinkListComponent items={news} title="Latest News" />
        </>
    );
}
