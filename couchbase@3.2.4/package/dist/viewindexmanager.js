"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewIndexManager = exports.DesignDocument = exports.DesignDocumentView = void 0;
const errors_1 = require("./errors");
const httpexecutor_1 = require("./httpexecutor");
const utilities_1 = require("./utilities");
/**
 * Contains information about a view in a design document.
 *
 * @category Management
 */
class DesignDocumentView {
    /**
     * @internal
     */
    constructor(...args) {
        let data;
        if (typeof args[0] === 'string' || typeof args[0] === 'function') {
            data = {
                map: args[0],
                reduce: args[1],
            };
        }
        else {
            data = args[0];
        }
        this.map = data.map;
        this.reduce = data.reduce;
    }
}
exports.DesignDocumentView = DesignDocumentView;
/**
 * Contains information about a design document.
 *
 * @category Management
 */
class DesignDocument {
    /**
     * @internal
     */
    constructor(...args) {
        let data;
        if (typeof args[0] === 'string') {
            data = {
                name: args[0],
                views: args[1],
            };
        }
        else {
            data = args[0];
        }
        this.name = data.name;
        this.views = data.views || {};
    }
    /**
     * Same as {@link DesignDocumentView}.
     *
     * @deprecated Use {@link DesignDocumentView} directly.
     */
    static get View() {
        return DesignDocumentView;
    }
    /**
     * @internal
     */
    static _fromNsData(ddocName, ddocData) {
        const views = {};
        for (const viewName in ddocData.views) {
            const viewData = ddocData.views[viewName];
            views[viewName] = new DesignDocumentView({
                map: viewData.map,
                reduce: viewData.reduce,
            });
        }
        return new DesignDocument({ name: ddocName, views: views });
    }
}
exports.DesignDocument = DesignDocument;
/**
 * ViewIndexManager is an interface which enables the management
 * of view indexes on the cluster.
 *
 * @category Management
 */
class ViewIndexManager {
    /**
     * @internal
     */
    constructor(bucket) {
        this._bucket = bucket;
    }
    get _http() {
        return new httpexecutor_1.HttpExecutor(this._bucket.conn);
    }
    /**
     * Returns a list of all the design documents in this bucket.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllDesignDocuments(options, callback) {
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
            const bucketName = this._bucket.name;
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/pools/default/buckets/${bucketName}/ddocs`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to get design documents', undefined, errCtx);
            }
            const ddocsData = JSON.parse(res.body.toString());
            const ddocs = ddocsData.rows.map((ddocData) => {
                const ddocName = ddocData.doc.meta.id.substr(8);
                return DesignDocument._fromNsData(ddocName, ddocData.doc.json);
            });
            return ddocs;
        }, callback);
    }
    /**
     * Returns the specified design document.
     *
     * @param designDocName The name of the design document to fetch.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getDesignDocument(designDocName, options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Views,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/_design/${designDocName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                if (res.statusCode === 404) {
                    throw new errors_1.DesignDocumentNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get the design document', undefined, errCtx);
            }
            const ddocData = JSON.parse(res.body.toString());
            return DesignDocument._fromNsData(designDocName, ddocData);
        }, callback);
    }
    /**
     * Creates or updates a design document.
     *
     * @param designDoc The DesignDocument to upsert.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async upsertDesignDocument(designDoc, options, callback) {
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
            const designDocData = {
                views: designDoc.views,
            };
            const encodedData = JSON.stringify(designDocData);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Views,
                method: httpexecutor_1.HttpMethod.Put,
                path: `/_design/${designDoc.name}`,
                contentType: 'application/json',
                body: encodedData,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 201) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to upsert the design document', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Drops an existing design document.
     *
     * @param designDocName The name of the design document to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropDesignDocument(designDocName, options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Views,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/_design/${designDocName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                if (res.statusCode === 404) {
                    throw new errors_1.DesignDocumentNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to drop the design document', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Publishes a development design document to be a production design document.
     * It does this by fetching the design document by the passed name with `dev_`
     * appended, and then performs an upsert of the production name (no `dev_`)
     * with the data which was just fetched.
     *
     * @param designDocName The name of the design document to publish.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async publishDesignDocument(designDocName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        const timer = new utilities_1.CompoundTimeout(timeout);
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const designDoc = await this.getDesignDocument(`dev_${designDocName}`, {
                parentSpan: parentSpan,
                timeout: timer.left(),
            });
            // Replace the name without the `dev_` prefix on it.
            designDoc.name = designDocName;
            await this.upsertDesignDocument(designDoc, {
                timeout: timer.left(),
            });
        }, callback);
    }
}
exports.ViewIndexManager = ViewIndexManager;
