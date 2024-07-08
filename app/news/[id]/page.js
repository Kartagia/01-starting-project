import classes from "@/app/globals.css";
import NewsLinkComponent from "@/components/NewsLinkComponent.mjs";

import Title from "@/components/title.mjs";
import { getPost } from "@/lib/dummyNews.mjs";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * The dynamic NextJS page of news details.
 */
export default async function NewsDetailPage({ params }) {
  const id = params.id;

  try {
    const newsItem = await getPost(id);

    if (!newsItem) {
        console.log(`The news item ${id} not found`);
      notFound();
    }

    if (newsItem) {
      return (
        <article className="news-article">
          <header>
            <NewsLinkComponent newsId={id} embedded={true} newsItem={newsItem} imageLink="fullscreen"/>
            <time dateTime={newsItem.date}>{newsItem.date}</time>
          </header>
          <main>{newsItem.content}</main>
        </article>
      );
    } else {
      throw Error("No such news exists");
    }
  } catch (err) {
    console.log(`The news item ${id} failed due error ${err}`);
    notFound();
  }
}
