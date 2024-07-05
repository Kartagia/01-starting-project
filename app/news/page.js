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
        <ul className="news-list">
        {[...news].map( (entry) => {
          const [id, newsEntry] = entry;
          return (
            <li key={id}>
              <Link href={`/news/${id}`}><img src={`/images/news/${newsEntry.image}`} alt={newsEntry.title}></img></Link>
              <span>{newsEntry.title}</span>
            </li>
          );
        })}
        </ul>
      </main>
    </section>
  );
}
