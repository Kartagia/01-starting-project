import { NewsService } from "./NewsService.mjs";

/**
 * The import of the news article datatype.
 * @typedef {import("./NewsService.mjs").NewsArticle<string>} NewsArticle
 */

/**
 * The news entry of the news service.
 * @typedef {import("./NewsService.mjs").NewsEntry<string>} NewsEntry
 */

/**
 * The default news service providing the news. 
 * @type {NewsService<string>}
 */
let defaultService;

/**
 * Get all news arcticles.
 * @returns {Promise<[id: number, article: NewsArticle][]>} The promise of the
 * enws articles.
 */
export async function getAllNews() {
  return defaultService.getAll();
}

/**
 * Get a single article.
 * @param {string} id The identifier of the article.
 * @returns {Promise<NewsArticle>} The sought article.
 */
export async function getNewsArticle(id) {
  return defaultService.getOne(id);
}

/**
 * Get all news articles.
 * @returns {Promise<NewsEntry[]>} The promise of the
 * enws articles.
 * @deprecated Use getAllNews instaed.
 */
export async function getAllPosts() {
  return getAllNews();
}

/**
 * Get the post.
 * @param {string} id The idetnifier of the news article.
 * @returns {Promise<NewsArticle>}
 * @deprecated Use getNewsArticle instead.
 */
export async function getPost(id) {
  return getNewsArticle(id);
}

export async function getAvailableNewsYears(ascending = false) {
  return defaultService.getAvailableYears(ascending);
}

export async function getAvailableNewsMonths(year, ascending = false) {
  return defaultService.getAvailableMonthsOfYear(year, ascending);
}

export async function getNewsForYear(year) {
  return defaultService.getAllForYear(year);
}

export async function getNewsForYearAndMonth(year, month) {
  return defaultService.getAllForYearAndMonth(year, month);
}

export async function getLatestNews(count = 3) {
  return defaultService.getLatest(count);
}

