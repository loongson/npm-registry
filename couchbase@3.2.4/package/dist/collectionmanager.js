"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionManager = exports.ScopeSpec = exports.CollectionSpec = void 0;
const errors_1 = require("./errors");
const httpexecutor_1 = require("./httpexecutor");
const utilities_1 = require("./utilities");
/**
 * Contains information about a collection.
 *
 * @category Management
 */
class CollectionSpec {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
        this.scopeName = data.scopeName;
        this.maxExpiry = data.maxExpiry;
    }
    /**
     * @internal
     */
    static _fromNsData(scopeName, data) {
        return new CollectionSpec({
            name: data.name,
            scopeName: scopeName,
            maxExpiry: data.maxTTL,
        });
    }
    /**
     * @internal
     */
    static _toNsData(data) {
        return {
            name: data.name,
            maxTTL: data.maxExpiry,
        };
    }
}
exports.CollectionSpec = CollectionSpec;
/**
 * Contains information about a scope.
 *
 * @category Management
 */
class ScopeSpec {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
        this.collections = data.collections;
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        let collections;
        if (data.collections) {
            const scopeName = data.name;
            collections = data.collections.map((collectionData) => CollectionSpec._fromNsData(scopeName, collectionData));
        }
        else {
            collections = [];
        }
        return new ScopeSpec({
            name: data.name,
            collections: collections,
        });
    }
}
exports.ScopeSpec = ScopeSpec;
/**
 * CollectionManager allows the management of collections within a Bucket.
 *
 * @category Management
 */
class CollectionManager {
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
     * Returns all configured scopes along with their collections.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllScopes(options, callback) {
        if (options instanceof Function) {
            callback = arguments[0];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const bucketName = this._bucket.name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/pools/default/buckets/${bucketName}/scopes`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('not allowed on this version of cluster') ||
                    res.statusCode === 404) {
                    throw new errors_1.FeatureNotAvailableError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get scopes', undefined, errCtx);
            }
            const scopesData = JSON.parse(res.body.toString());
            const scopes = scopesData.scopes.map((scopeData) => ScopeSpec._fromNsData(scopeData));
            return scopes;
        }, callback);
    }
    /**
     * @internal
     */
    async createCollection() {
        let collectionSpec = arguments[0];
        let options = arguments[1];
        let callback = arguments[2];
        // Deprecated usage conversion for (name, scopeName, options, callback)
        if (typeof collectionSpec === 'string') {
            collectionSpec = {
                name: arguments[0],
                scopeName: arguments[1],
            };
            options = arguments[2];
            callback = arguments[3];
        }
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const bucketName = this._bucket.name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const collectionData = CollectionSpec._toNsData(collectionSpec);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/pools/default/buckets/${bucketName}/scopes/${collectionSpec.scopeName}/collections`,
                contentType: 'application/x-www-form-urlencoded',
                body: utilities_1.cbQsStringify(collectionData),
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('already exists') &&
                    errText.includes('collection')) {
                    throw new errors_1.CollectionExistsError(undefined, errCtx);
                }
                if (errText.includes('not found') && errText.includes('scope')) {
                    throw new errors_1.ScopeNotFoundError(undefined, errCtx);
                }
                if (errText.includes('not allowed on this version of cluster') ||
                    res.statusCode === 404) {
                    throw new errors_1.FeatureNotAvailableError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to create collection', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Drops a collection from a scope.
     *
     * @param collectionName The name of the collection to drop.
     * @param scopeName The name of the scope containing the collection to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropCollection(collectionName, scopeName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[2];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const bucketName = this._bucket.name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/pools/default/buckets/${bucketName}/scopes/${scopeName}/collections/${collectionName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('not found') && errText.includes('collection')) {
                    throw new errors_1.CollectionNotFoundError(undefined, errCtx);
                }
                if (errText.includes('not found') && errText.includes('scope')) {
                    throw new errors_1.ScopeNotFoundError(undefined, errCtx);
                }
                if (errText.includes('not allowed on this version of cluster') ||
                    res.statusCode === 404) {
                    throw new errors_1.FeatureNotAvailableError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to drop collection', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Creates a new scope.
     *
     * @param scopeName The name of the new scope to create.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async createScope(scopeName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const bucketName = this._bucket.name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/pools/default/buckets/${bucketName}/scopes`,
                contentType: 'application/x-www-form-urlencoded',
                body: utilities_1.cbQsStringify({
                    name: scopeName,
                }),
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('already exists') && errText.includes('scope')) {
                    throw new errors_1.ScopeExistsError(undefined, errCtx);
                }
                if (errText.includes('not allowed on this version of cluster') ||
                    res.statusCode === 404) {
                    throw new errors_1.FeatureNotAvailableError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to create scope', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Drops a scope.
     *
     * @param scopeName The name of the scope to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropScope(scopeName, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const bucketName = this._bucket.name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/pools/default/buckets/${bucketName}/scopes/${scopeName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('not found') && errText.includes('scope')) {
                    throw new errors_1.ScopeNotFoundError(undefined, errCtx);
                }
                if (errText.includes('not allowed on this version of cluster') ||
                    res.statusCode === 404) {
                    throw new errors_1.FeatureNotAvailableError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to drop scope', undefined, errCtx);
            }
        }, callback);
    }
}
exports.CollectionManager = CollectionManager;
