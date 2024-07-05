/**
 * The module containing news retaled models.
 * @module data/news
 */

/**
 * Structure containing news article.
 * @typedef {Object} NewsArticle
 * @property {string|React.Component} title The title of the article.
 * @property {string|React.Component} [ingress} The ingress of the article.
 * @property {string} slug The slug of the news article.
 * @property {string} id The identifier of the article.
 * @property {string} image THe image href.
 * @property {string} date The date of the article in format "YYYY-MM-DD"
 * @property {string|React.Component} content The content of the article.
 */

/**
 * The class covering the news service.
 */
export class NewsService {
  /**
   * The news articles.
   * @type {Map<string, NewsArticle>}
   */
  news = new Map();

  /**
   * Create a enw enws srvice with given initial articles.
   * @param {(NewsArticle|[id: string, article: NewsArticle])[]} [articles] The initial articles.
   */
  constructor(articles = []) {
    articles.forEach((entry) => {
      if (Array.isArray(entry)) {
        this.news.set(entry[0], entry[1]);
      } else {
        /** @todo Add slug generation */
        throw new Error("Articles without identifier not supported");
      }
    });
  }

  /**
   * Get post.
   * @param {string} id The post identifier.
   * @returns {Promise<NewsArticle>} The promise of an article with id.
   */
  getOne(id) {
    return new Promise((resolve, reject) => {
      if (this.news.has(id)) {
        resolve(this.news.get(id));
      } else {
        reject("No such news exists.");
      }
    });
  }

  /**
   * Get all posts of the service.
   * @returns {Promise<[id: string, article: NewsArticle][]>} The all posts of the service.
   */
  getAll() {
    const result = new Promise((resolve, reject) => {
      /**
       * @type {[string, NewsArticle][]}
       */
      const entries = [...this.news.entries()].map(
        ([/** @type {NewsArticle} */ key, /** @type {string} */ article]) => ([key, article])
      );
      resolve(entries);
    });
    return result;
  }
}
