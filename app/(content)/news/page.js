import LinkListComponent from "@/components/LinkListComponent.mjs";
import Title from "@/components/title.mjs";
import { getAllPosts } from "@/lib/dummyNews.mjs";

import Link from "next/link";


/**
 * The page showing all meals. 
 */
export default async function NewsListPage() {
  const news = await getAllPosts();

  return (
    <section>
      <header>
        <Title>News Page</Title>
      </header>
      <main>
        <LinkListComponent items={news}/>
      </main>
    </section>
  );
}
