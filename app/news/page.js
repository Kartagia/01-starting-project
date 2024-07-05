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
        <Title>News Articles</Title>
      </header>
      <main>
        {[...news].map( (entry) => {
          const [id, newsEntry] = entry;
          return (
            <article key={id}>
              <Link href={`/news/${id}`}>{newsEntry.title}</Link>
            </article>
          );
        })}
      </main>
    </section>
  );
}
