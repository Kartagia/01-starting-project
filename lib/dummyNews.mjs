import { NewsService } from "./news.mjs";

export const DUMMY_NEWS = [
  {
    id: "n1",
    slug: "will-ai-replace-humans",
    title: "Will AI Replace Humans?",
    image: "ai-robot.jpg",
    date: "2021-07-01",
    content:
      "Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.",
  },
  {
    id: "n2",
    slug: "beaver-plague",
    title: "A Plague of Beavers",
    image: "beaver.jpg",
    date: "2022-05-01",
    content:
      "Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?",
  },
  {
    id: "n3",
    slug: "couple-cooking",
    title: "Spend more time together!",
    image: "couple-cooking.jpg",
    date: "2024-03-01",
    content:
      "Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!",
  },
  {
    id: "n4",
    slug: "hiking",
    title: "Hiking is the best!",
    image: "hiking.jpg",
    date: "2024-01-01",
    content:
      "Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!",
  },
  {
    id: "n5",
    slug: "landscape",
    title: "The beauty of landscape",
    image: "landscape.jpg",
    date: "2022-07-01",
    content:
      "Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!",
  },
];

const news = new NewsService(
  DUMMY_NEWS.map((newsItem) => [newsItem.id, newsItem])
);

export async function getPost(id) {
  return news.getOne(id);
}

export async function getAllPosts() {
  return news.getAll();
}

/**
 * Get all news of a specific month of a year.
 * @param {number} year The year.
 * @param {number} month The month (base 1).
 * @returns {Promise<([id: string, article: import("./news.mjs").NewsArticle])[]>} The news articles in
 * specific month of a year.
 */
export async function getNewsForYearAndMonth(year, month) {
  return getAllPosts().then((articles) => {
    return articles.filter(([id, article]) => {
      const date = new Date(article.date);
      const dateYear = date.getFullYear();
      const dateMonth = date.getMonth() + 1;
      return dateYear === year && dateMonth === month;
    });
  });
}

/**
 * Get all news of a specific year.
 * @param {number} year The year.
 * @returns {Promise<([id: string, article: import("./news.mjs").NewsArticle])[]>} The news articles in
 * specific month of a year.
 */
export async function getNewsForYear(year) {
  return getAllPosts().then((articles) => {
    return articles.filter(([id, article]) => {
      const date = new Date(article.date);
      const dateYear = date.getFullYear();
      return dateYear === year;
    });
  });
}

/**
 * Get the years with news articles.
 * @returns {Promise<number[]>}
 */
export async function getAvailableNewsYears() {
  return news.getAll().then((allEntries) => {
    return allEntries
      .reduce((years, [id, article]) => {
        const year = new Date(article.date).getFullYear();

        if (!years.includes(year)) {
          years.push(year);
        }

        return years;
      }, [])
      .sort((a, b) => b - a);
  });
}

/**
 * Get the months of a year with news.
 * @returns {Promise<number[]>}
 */
export async function getAvailableNewsMonths(year) {
  return new Promise((resolve, reject) => {
    try {
      news.getAll().then((newsEntries) => {
        const results = newsEntries.reduce(
          (months, [id, article]) => {
            const date = new Date(article.date);
            const dateYear = date.getFullYear();
            const month = date.getMonth() + 1;

            if (dateYear == year && !months.includes(month)) {
              months.push(month);
            }

            return months;
          },
          []
        ).sort((a, b) => b - a);
        resolve(results);
      });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Get latest news. 
 * @param {number} [newsCount = 6] The number of news fetched. Defaults to 6.
 * @returns {Promise<[id, import("./news.mjs").NewsArticle[]]>} THe promise of the latest news.
 */
export async function getLatestNews(newsCount=6) {
  return getAllPosts().then( (news) => (news.sort( (a,b) => (new Date(a[1].date) - new Date(b[1].date))).slice(0,newsCount)));
}
