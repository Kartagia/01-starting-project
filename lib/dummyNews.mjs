import { NewsService } from "./news.mjs";

const news = new NewsService([
  ["ai-robot", { title: "Ai Robot", content: "An article about AI robot" }],
  [
    "beaver",
    {
      title: "The Damn Beaver Damn",
      content: "The damned beaver damn waterlogged a hunting lodge",
    },
  ],
]);

export async function getPost(id) {
  return news.getOne(id);
}

export async function getAllPosts() {
  return news.getAll();
}
