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

  /**
   * Get all news of the given month of a year.
   * @param {number} year The full year.
   * @param {number} month The month of year starting from 1.
 * @returns {Promise<([id: string, article: NewsArticle])[]>} The news articles in
 * specific month of a year.
   */
  async getAllForYearAndMonth(year, month) {
    return this.getAll().then((articles) => {
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
  async getAllForYear(year, ascending = false) {
    return this.getAll().then((articles) => {
      return articles.filter(([id, article]) => {
        const date = new Date(article.date);
        const dateYear = date.getFullYear();
        return dateYear === year;
      });
    })
  }

  /**
   * Get the months of year with news.
   * @param {number} year The year.
   * @param {boolean} [ascending=false] Is the order of the years ascending.
   */
  async getAvailableMonthsOfYear(year, ascending = false) {
    const sortFn = ascending ? ((a, b) => (a - b)) : ((a, b) => (b - a));
    return this.getAll().then((newsEntries) => {
      const results = newsEntries.reduce(
        (/** @type {number[]} */ months, [_, article]) => {
          const date = new Date(article.date);
          const dateYear = date.getFullYear();
          const month = date.getMonth() + 1;

          if (dateYear == year && !months.includes(month)) {
            months.push(month);
          }

          return months;
        }, /** @type {number[]} */[]
      ).sort(sortFn);
      return results;
    })
  }

  /**
   * Get the years with news articles.
   * @returns {Promise<number[]>}
  */
  async getAvailableYears(ascending = false) {
    const sortFn = ascending ? ((a, b) => (a - b)) : ((a, b) => (b - a));
    return this.getAll().then((allEntries) => {
      return allEntries
        .reduce((years, [_, article]) => {
          const year = new Date(article.date).getFullYear();

          if (!years.includes(year)) {
            years.push(year);
          }

          return years;
        }, /** @type {number[]} */[])
        .sort(sortFn);
    });
  }

  /**
   * Get the latest news of the service.
   * @param {number} [count=3] The number of latests news to return. 
   * @returns {Promise<[id: string, article: NewsArticle][]>} The lastest news.
   */
  async getLatest(count = 3) {
    return this.getAll().then((news) => (news.sort((a, b) => (new Date(a[1].date) - new Date(b[1].date))).slice(0, count)));
  }
}


