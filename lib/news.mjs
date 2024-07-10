import { BackendNewsService } from "./BackendNewsService.mjs";
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
 * @type {NewsService<string>|undefined}
 */
let defaultService;

/**
 * The current unregistering function.
 * @type {(() => undefined)|undefined}
 */
let unregisterFunction; 

/**
 * Register a news service as the service used to ackquire news.
 * @param {NewsService} service The new service.
 * @returns {() => undefined} The unscriber function closing the service.
 * @throws {Error} The service is already registered.
 */
export async function registerNewsService(service) {

  if (defaultService) {
    throw new Error("Cannot replace an existing service");
  }

  defaultService = service;

  unregisterFunction =  function() {
    if (defaultService === service) {
      defaultService = undefined;
    }
    if (unregisterFunction === this) {
      unregisterFunction = undefined;
    }
  }
}

/**
 * Close the current news service.
 * @returns {Promise<boolean>} The promise whether service
 * was closed. 
 */
export async function close() {
  if (unregisterFunction) {
    unregisterFunction();
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}

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

/**
 * Get all years with news.
 * @param {boolean} [ascending=false] Are the results ordered in ascending order. 
 * @returns {Promise<number[]>} The years with news.
 */
export async function getAvailableNewsYears(ascending = false) {
  return defaultService.getAvailableYears(ascending);
}

/**
 * Get all months of a year with news.
 * @param {number} year The year, whose months are queried.
 * @param {boolean} [ascending=false] Are the results ordered in ascending order. 
 * @returns {Promise<number[]>} The months of the year with news starting from 1.
*/
export async function getAvailableNewsMonths(year, ascending = false) {
  return defaultService.getAvailableMonthsOfYear(year, ascending);
}

/**
 * Get news for a year.
 * @param {number} year The year whose news are returned.
 * @returns {Promise<NewsEntry[]>} The news entried of the year.
 */
export async function getNewsForYear(year) {
  return defaultService.getAllForYear(year);
}

/**
 * Get news for a month of a year.
 * @param {number} year The year whose news are returned.
 * @param {number} month The month whose news are returned. Starts with 1.
 * @returns {Promise<NewsEntry[]>} The news entried of the month of the year.
 */
export async function getNewsForYearAndMonth(year, month) {
  return defaultService.getAllForYearAndMonth(year, month);
}

/**
 * Get the most recent news. 
 * @param {number} [count=3] The number of the latest news returned. 
 * @returns {Promise<NewsEntry[]>} The most recent news entries. The array
 * cannot have more elements than count, but may have less.
 */
export async function getLatestNews(count = 3) {
  return defaultService.getLatest(count);
}

registerNewsService(new BackendNewsService());
