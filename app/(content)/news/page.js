import LinkListComponent from "@/components/LinkListComponent.mjs";
import Title from "@/components/title.mjs";
import { getAllNews, getAllPosts } from "@/lib/news.mjs";

import { Suspense} from "react";
import LoadingComponent from "@/components/LoadingComponent";

async function ShowNewsList() {
  const news = await getAllNews();
  return (<LinkListComponent items={news} />);
}

/**
 * The page showing all meals. 
 */
export default function NewsListPage() {
  return (
    <section>
      <header>
        <Title>News Page</Title>
      </header>
      <main>
        <Suspense fallback={(<LoadingComponent delay={0.50} steps={5} />)}>
          <ShowNewsList />
        </Suspense>
      </main>
    </section>
  );
}
