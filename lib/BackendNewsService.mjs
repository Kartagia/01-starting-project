import { NewsService } from "./NewsService.mjs";

/**
 * The properties of the backend news service.
 * @template [ID=string] The identifier type of the service.
 * @typedef {Object} BackendNewsServiceProps
 * @property {string} [protocol="http"] The protocol scheme used.
 * @property {string} [host="localhost"] The host to connect.
 * @property {string|number} [port] The port to connect.
 */
/**
 * A news service using backend.
 * @template [ID=string] The identifier type of the service.
 * @extends {NewsService<ID>}
 */
export class BackendNewsService extends NewsService {

  /**
   * Create a new backend using news service.
   * @param {BackendNewsServiceProps<ID>} [params] The parameters to the backend.
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
 * @template [ID=string] The identifier type of the service.
 * @param {BackendNewsServiceProps<ID>} [params] THe construction parametsr. 
 * @returns {BackendNewsService<ID>}
 */
export async function createService(params = {}) {
  return new BackendNewsService(params);
}
