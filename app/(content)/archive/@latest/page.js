import LinkListComponent from "@/components/LinkListComponent.mjs";
import { getLatestNews } from "@/lib/dummyNews.mjs";

export default async function LatestNewsPage() {
  const news = await getLatestNews(3);

  return (
    <>
      <LinkListComponent items={news} title="Latest News" />
    </>
  );
}
