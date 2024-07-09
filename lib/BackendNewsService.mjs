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
 */

export class BackendNewsService extends NewsService {



  /**
   * Create a new backend using news service.
   * @param {BackendNewsServiceProps} [params] The parameters to the backend.
   */
  constructor(params = {}) {
    const { articles = [], protocol = "http", host = "localhost", port = 8081 } = params;
    /**
     * The connection URL of the backend.
     * @type {string} The conneciton URL of the backend.
     */
    this.url = `${protocol}://${host}${port ? `:${port}` : ""}`;
  }

  getOne(id) {
    return new Promise((resolve, reject) => {
      this.getAll().then((entries) => {
        const entry = entries.find(([entryId]) => (id === entryId));
        if (entry) {
          resolve(entry[1]);
        } else {
          reject(new RangeError("No such news article exists."));
        }
      }, reject);
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      fetch(this.url).then((response) => {
        if (!response.ok) {
          reject(new Error("Failed to fetch news"));
        }
        resolve(response.json());
      });
    });
  }


}
