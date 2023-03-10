"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIndexManager = exports.SearchIndex = void 0;
const errors_1 = require("./errors");
const httpexecutor_1 = require("./httpexecutor");
const utilities_1 = require("./utilities");
/**
 * This class is currently incomplete and must be casted to `any` in
 * TypeScript to be used.
 *
 * @category Management
 */
class SearchIndex {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
    }
}
exports.SearchIndex = SearchIndex;
/**
 * SearchIndexManager provides an interface for managing the
 * search indexes on the cluster.
 *
 * @category Management
 */
class SearchIndexManager {
    /**
     * @internal
     */
    constructor(cluster) {
        this._cluster = cluster;
    }
    get _http() {
        return new httpexecutor_1.HttpExecutor(this._cluster._getClusterConn());
    }
    /**
     * Returns an index by it's name.
     *
     * @param indexName The index to retrieve.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getIndex(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/api/index/${indexName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new errors_1.IndexNotFoundError();
            }
            return JSON.parse(res.body.toString());
        }, callback);
    }
    /**
     * Returns a list of all existing indexes.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllIndexes(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/api/index`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to fetch search indices');
            }
            return JSON.parse(res.body.toString());
        }, callback);
    }
    /**
     * Creates or updates an existing index.
     *
     * @param indexDefinition The index to update.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async upsertIndex(indexDefinition, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const indexName = indexDefinition.name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Put,
                path: `/api/index/${indexName}`,
                contentType: 'application/json',
                body: JSON.stringify(indexDefinition),
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to create index');
            }
        }, callback);
    }
    /**
     * Drops an index.
     *
     * @param indexName The name of the index to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropIndex(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/api/index/${indexName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to delete search index');
            }
            return JSON.parse(res.body.toString());
        }, callback);
    }
    /**
     * Returns the number of documents that have been indexed.
     *
     * @param indexName The name of the index to return the count for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getIndexedDocumentsCount(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/api/index/${indexName}/count`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to get search indexed documents count');
            }
            return JSON.parse(res.body.toString());
        }, callback);
    }
    /**
     * Pauses the ingestion of documents into an index.
     *
     * @param indexName The name of the index to pause.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async pauseIngest(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/index/${indexName}/ingestControl/pause`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to pause search index ingestion');
            }
        }, callback);
    }
    /**
     * Resumes the ingestion of documents into an index.
     *
     * @param indexName The name of the index to resume.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async resumeIngest(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/index/${indexName}/ingestControl/resume`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to resume search index ingestion');
            }
        }, callback);
    }
    /**
     * Enables querying of an index.
     *
     * @param indexName The name of the index to enable querying for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async allowQuerying(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/index/${indexName}/queryControl/allow`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to allow search index quering');
            }
        }, callback);
    }
    /**
     * Disables querying of an index.
     *
     * @param indexName The name of the index to disable querying for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async disallowQuerying(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/index/${indexName}/queryControl/disallow`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to disallow search index quering');
            }
        }, callback);
    }
    /**
     * Freezes the indexing plan for execution of queries.
     *
     * @param indexName The name of the index to freeze the plan of.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async freezePlan(indexName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/index/${indexName}/planFreezeControl/freeze`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to freeze search index plan');
            }
        }, callback);
    }
    /**
     * Performs analysis of a specific document by an index.
     *
     * @param indexName The name of the index to use for the analysis.
     * @param document The document to analyze.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async analyzeDocument(indexName, document, options, callback) {
        if (options instanceof Function) {
            callback = arguments[2];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Search,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/index/${indexName}/analyzeDoc`,
                body: JSON.stringify(document),
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                throw new Error('failed to perform search index document analysis');
            }
            return JSON.parse(res.body.toString()).analyze;
        }, callback);
    }
}
exports.SearchIndexManager = SearchIndexManager;
