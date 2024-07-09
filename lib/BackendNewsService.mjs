"use server";
import { NewsService } from "./news.mjs";

/**
 * The properties of the backend news service.
 * @typedef {Object} BackendNewsServiceProps
 * @property {string} [protocol="http"] The protocol scheme used.
 * @property {string} [host="localhost"] The host to connect.
 * @property {string|number} [port] The port to connect.
 */
/**
 * A news service using backend.
 * @extends {NewsService}
 */
class BackendNewsService extends NewsService {

  /**
   * Create a new backend using news service.
   * @param {BackendNewsServiceProps} [params] The parameters to the backend.
   */
  constructor(params = {}) {
    super();
    const { articles = [], protocol = "http", host = "localhost", port = 8081 } = params;
    /**
     * The connection URL of the backend.
     * @type {string} The conneciton URL of the backend.
     */
    this.url = `${protocol}://${host}${port ? `:${port}` : ""}/news`;
  }

  /**
   * @inheritdoc
   */
  getOne(id) {
    return new Promise((resolve, reject) => {

      try {
        let resourceId = undefined;
        if (typeof id === "string" && id.startsWith("n")) {
          resourceId = +(id.substring(1));
        } else if (typeof id === "number" && Number.isSafeInteger(id) &&
          id > 0) {
          resourceId = id;
        } else {
          throw Error("An invalid identifier");
        }
        fetch(`${this.url}/${resourceId}`, {
          headers: {
            "Accept": "application/json"
          },

        }).then((response) => {
          try {
            if (response.ok) {
              response.json().then(
                (entry) => {
                  resolve(entry)
                }, reject);
            } else {
              console.error(`Failed to parse JSON`, error);
              return reject(new Error("Failed to fetch news"));
            }
          } catch (fetchError) {
            console.error(`Featch faield due error: ${fetchError}`)
          }
        });
      } catch (err) {
        console.log(`Failed due error: ${err}`);
        reject(err);
      }
    });
  }

  /**
   * @inheritdoc
   */
  getAll() {
    try {
      console.log(`Testing: ${this.url}`);
      const url = new URL(this.url);
    } catch (err) {
      console.log(`Parse failed due error: ${err}`);
    }

    return new Promise((resolve, reject) => {
      try {
        fetch(this.url, {
          headers: {
            "Accept": "application/json"
          },

        }).then((response) => {
          try {
            console.log(`Got response ${response}}`);
            if (response.ok) {
              response.json().then(
                (entries) => {
                  console.log(`Got ${entries.length} entries:`);
                  resolve(entries.map((entry) => {
                    return [`n${entry.id}`, entry]
                  }));
                }, reject);
            } else {
              console.error(`Failed to parse JSON`);
              return reject(new Error("Failed to fetch news"));
            }
          } catch (fetchError) {
            console.error(`Featch faield due error: ${fetchError}`);
            return reject(fetchError);
          }
        });
      } catch (err) {
        console.log(`Failed due error: ${err}`);
        return reject(err);
      }
    });
  }
}

/**
 * Createa a new news service.
 * @param {BackendNewsServiceProps} [params] THe construction parametsr. 
 * @returns 
 */
export async function createService(params = {}) {
  return new BackendNewsService(params);
}

/**
 * @inheritdoc
 */
const defaultService = new BackendNewsService();


/**
 * Get all news arcticles.
 * @returns {Promise<[id: number, article: import("./news.mjs").NewsArticle][]>} The promise of the
 * enws articles.
 */
export async function getAllNews() {
  return defaultService.getAll();
}

/**
 * Get a single article.
 * @param {string} id The identifier of the article.
 * @returns {Promise<import("./news.mjs").NewsArticle>} The sought article.
 */
export async function getNewsArticle(id) {
  return defaultService.getOne(id);
}

/**
 * Get all news articles.
 * @returns {Promise<[id: number, article: import("./news.mjs").NewsArticle][]>} The promise of the
 * enws articles.
 * @deprecated Use getAllNews instaed.
 */
export async function getAllPosts() {
  return getAllNews();
}

/**
 * Get the post.
 * @param {string} id The idetnifier of the news article.
 * @returns {Promise<import("./news.mjs").NewsArticle>}
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
