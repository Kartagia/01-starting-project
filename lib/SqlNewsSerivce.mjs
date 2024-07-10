import sql from 'better-sqlite3';

/**
 * The SQL using news service.
 * @module data/news/SqlNewsService
 */

import { NewsService } from "./NewsService.mjs";
import { BackendNewsService } from "./BackendNewsService.mjs";
import Database from 'better-sqlite3';

/**
 * Data source properties.
 * @template [ID=string] The identifier type used.
 * @template [DBID=number] The identifier type used on databse.
 * @typedef {Object} DataSourceProps
 * @property {string} databaseName
 * @property {(source: ID) => DBID} [idParser] The parser to convert external identifier
 * to the database identifier.
 * @property {(source: DBID) => ID} [idFormatter] The formatter converting database idetitifer
 * to the external identifier.
 */

/**
 * The SQL using news service.
 * @template [ID=string] The identifier type used.
 * @extends {NewsService<ID>}
 */
export class SqlNewsService extends NewsService {

    /**
     * Create a new SQL using data service. 
     * @param {DataSourceProps<ID>} params  The parameters defining the database.
     */
    constructor(params) {
        super();
        this.databaseName = params.databaseName;
        this.parseId = params.idParser ?? (value => (+value));
        this.formatId = params.idFormatter ?? (value => String(value));

    }



    /**
     * @inheritdoc
     */
    async getOne(id) {
        return new Promise((resolve, reject) => {
            try {
                const dbId = this.parseId(id);
                this._fetchOne(dbId).then(
                    (dbRow) => { resolve({ ...dbRow, id: this.formatId(dbRow.id) }) }, reject);
            } catch (err) {
                console.error(`Getting database entry for id ${id} failed`);
                reject(err);
            }
        });
    }

    /**
     * @inheritdoc
     */
    async getAll() {
        return new Promise((resolve, reject) => {
            try {
                this._fetchAll().then(
                    (entries) => {
                        resolve(entries.map((dbRow) => {
                            const id = this.formatId(dbRow.id)
                            return [id, { ...dbRow, id }];
                        }))
                    })
            } catch (err) {
                console.error(`Getting database entries failed`);
                reject(err);
            }
        });
    }

    /**
     * Fetch the entry from the database.
     * @param {DBID} dbId the databse identifier.
     * @returns {Promise<import('./NewsService.mjs').NewsArticle<DBID>}
     */
    async _fetchOne(dbId) {
        reject(new Error("No database connection"));
    }

    /**
     * Fetch the entry from the database.
     * @param {DBID} dbId the databse identifier.
     * @returns {Promise<import('./NewsService.mjs').NewsEntry<DBID>[]>}
     */
    async _fetchAll() {
        reject(new Error("No database connection"));
    }

}

/**
 * File based database conneciton.
 */
export class BetterSqlLiteDatabaseService extends SqlNewsService {

    /**
     * The database connection. 
     * @type {Database}
     */
    #dbh;

    /**
     * Creates a new 
     * @param { {fileName?: string} & DataSourceProps<ID>} props 
     */
    constructor(props) {
        super(props);
        this.file = props.fileName ?? `${props.databaseName}.db`;
        this.#dbh = sql(this.file);
    }


    /**
     * @inehritdoc
     */
    async _fetchOne(dbId) {
        return this.#dbh.prepare("SELECT * FROM news WHERE id=?").get(dbId);
    }

    /**
     * @inehritdoc
     */
    async _fetchAll() {
        return this.#dbh.prepare("SELECT * FROM news").all();
    }
}

/**
 * The SQL using news servicd using backend 
 */
export class RemoteSqlNewsService extends SqlNewsService {

    /**
     * Creates a new 
     * @param {import("./BackendNewsService.mjs").BackendNewsServiceProps & DataSourceProps<ID>} props 
     */
    constructor(props) {
        super(props);
    }


}