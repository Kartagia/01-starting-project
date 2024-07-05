import classes from "@/app/globals.css";

import Title from "@/components/title.mjs";
import { getPost } from "@/lib/dummyNews.mjs";
import { notFound } from "next/navigation";

/**
 * The dynamic NextJS page of news details.
 */
export default async function NewsDetailPage({ params }) {
  const id = params.id;

  try {
    const post = await getPost(id);

    if (!post) {
      notFound();
    }

    if (post) {
      return (
        <article>
          <header>
            <Title>{post.title}</Title>
          </header>
          <main>{post.content}</main>
        </article>
      );
    } else {
      throw Error("No such news exists");
    }
  } catch (err) {
    notFound();
  }
}
