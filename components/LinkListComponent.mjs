import Link from "next/link";
import Title from "./title.mjs";

/**
 * The properties of the link list component.
 * @typedef {Object} LinkListProps
 * @property {string} [title] The title of the list.
 * @property {[string, ITEM][]} [items=[]] The list entries.
 * @property {string} [imageRoot="/images/news"] The root path to the images of the items.
 * @property {string} [detailRoot="/news"] The root path of the image details.
 */

/**
 * The component for showing link lists.
 * @template [ITEM=import("@/lib/news.mjs").NewsArticle] The item.
 * @param {LinkListProps} [props] The properties of the list.
 * @param {string} title Title of the component.
 * @param {[id: string, item: ITEM][]} items The
 */
export default function LinkListComponent(props = {}) {
  const {
    title = undefined,
    items = [],
    detailRoot = "/news",
    imageRoot = "/images/news",
  } = props;
  return (
    <>
      {title && (
        <header>
          <Title>{title}</Title>
        </header>
      )}
      <main className="news-list">
        {items.map(([id, newsItem]) => (
          <article key={newsItem.id}>
            <Link href={`${detailRoot}/${id}`}>
              <img
                src={`${imageRoot}/${newsItem.image}`}
                alt={newsItem.title}
              ></img>
              <Title>{newsItem.title}</Title>
            </Link>
          </article>
        ))}
      </main>
    </>
  );
}
