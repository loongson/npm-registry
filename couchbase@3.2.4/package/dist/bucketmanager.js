"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BucketManager = exports.BucketSettings = exports.CompressionMode = exports.EvictionPolicy = exports.StorageBackend = exports.BucketType = exports.ConflictResolutionType = void 0;
const errors_1 = require("./errors");
const httpexecutor_1 = require("./httpexecutor");
const utilities_1 = require("./utilities");
/**
 * Represents the various conflict resolution modes which can be used for
 * XDCR synchronization against a bucket.
 *
 * @category Management
 */
var ConflictResolutionType;
(function (ConflictResolutionType) {
    /**
     * Indicates that timestamps should be used for conflict resolution.  The most
     * recently modified document (according to each server, ie: time synchronization
     * is important) is the one selected to win.
     */
    ConflictResolutionType["Timestamp"] = "lww";
    /**
     * Indicates that the seqno of the document should be used for conflict resolution.
     */
    ConflictResolutionType["SequenceNumber"] = "seqno";
    /**
     * Indicates that custom conflict resolution should be used.
     *
     * @experimental This mode is only available in Couchbase Server 7.1 with the
     * "developer-preview" mode enabled.
     */
    ConflictResolutionType["Custom"] = "custom";
})(ConflictResolutionType = exports.ConflictResolutionType || (exports.ConflictResolutionType = {}));
/**
 * Represents the type of a bucket.
 *
 * @category Management
 */
var BucketType;
(function (BucketType) {
    /**
     * Indicates the bucket should be a Couchbase bucket.
     */
    BucketType["Couchbase"] = "membase";
    /**
     * Indicates the bucket should be a Memcached bucket.
     */
    BucketType["Memcached"] = "memcached";
    /**
     * Indicates the bucket should be a Ephemeral bucket.
     */
    BucketType["Ephemeral"] = "ephemeral";
})(BucketType = exports.BucketType || (exports.BucketType = {}));
/**
 * Represents the storage backend to use for a bucket.
 *
 * @category Management
 */
var StorageBackend;
(function (StorageBackend) {
    /**
     * Indicates the bucket should use the Couchstore storage engine.
     */
    StorageBackend["Couchstore"] = "couchstore";
    /**
     * Indicates the bucket should use the Magma storage engine.
     */
    StorageBackend["Magma"] = "magma";
})(StorageBackend = exports.StorageBackend || (exports.StorageBackend = {}));
/**
 * Represents the eviction policy that should be used for a bucket.
 *
 * @category Management
 */
var EvictionPolicy;
(function (EvictionPolicy) {
    /**
     * Indicates that both the document meta-data and value should be evicted.
     */
    EvictionPolicy["FullEviction"] = "fullEviction";
    /**
     * Indicates that only the value of a document should be evicted.
     */
    EvictionPolicy["ValueOnly"] = "valueOnly";
    /**
     * Indicates that the least recently used documents are evicted.
     */
    EvictionPolicy["NotRecentlyUsed"] = "nruEviction";
    /**
     * Indicates that nothing should be evicted.
     */
    EvictionPolicy["NoEviction"] = "noEviction";
})(EvictionPolicy = exports.EvictionPolicy || (exports.EvictionPolicy = {}));
/**
 * Specifies the compression mode that should be used for a bucket.
 *
 * @category Management
 */
var CompressionMode;
(function (CompressionMode) {
    /**
     * Indicates that compression should not be used on the server.
     */
    CompressionMode["Off"] = "off";
    /**
     * Indicates that compression should be used passively.  That is that if the
     * client sends data which is encrypted, it is stored on the server in its
     * compressed form, but the server does not actively compress documents.
     */
    CompressionMode["Passive"] = "passive";
    /**
     * Indicates that compression should be performed actively.  Even if the
     * client does not transmit the document in a compressed form.
     */
    CompressionMode["Active"] = "active";
})(CompressionMode = exports.CompressionMode || (exports.CompressionMode = {}));
/**
 * Represents the the configured options for a bucket.
 *
 * @category Management
 */
class BucketSettings {
    /**
     * @internal
     */
    constructor(data) {
        this.name = data.name;
        this.flushEnabled = data.flushEnabled;
        this.ramQuotaMB = data.ramQuotaMB;
        this.numReplicas = data.numReplicas;
        this.replicaIndexes = data.replicaIndexes;
        this.bucketType = data.bucketType;
        this.storageBackend = data.storageBackend;
        this.evictionPolicy = data.evictionPolicy;
        this.maxExpiry = data.maxExpiry;
        this.compressionMode = data.compressionMode;
        this.minimumDurabilityLevel = data.minimumDurabilityLevel;
    }
    /**
     * Same as {@link IBucketSettings.maxExpiry}.
     *
     * @deprecated Use {@link IBucketSettings.maxExpiry} instead.
     */
    get maxTTL() {
        return this.maxExpiry;
    }
    set maxTTL(val) {
        this.maxExpiry = val;
    }
    /**
     * Same as {@link IBucketSettings.evictionPolicy}.
     *
     * @deprecated Use {@link IBucketSettings.evictionPolicy} instead.
     */
    get ejectionMethod() {
        return this.evictionPolicy;
    }
    set ejectionMethod(val) {
        this.evictionPolicy = val;
    }
    /**
     * Same as {@link IBucketSettings.minimumDurabilityLevel}, but represented as
     * the raw server-side configuration string.
     *
     * @deprecated Use {@link IBucketSettings.minimumDurabilityLevel} instead.
     */
    get durabilityMinLevel() {
        return utilities_1.duraLevelToNsServerStr(this.minimumDurabilityLevel);
    }
    /**
     * @internal
     */
    static _toNsData(data) {
        return {
            name: data.name,
            flushEnabled: data.flushEnabled,
            ramQuotaMB: data.ramQuotaMB,
            replicaNumber: data.numReplicas,
            replicaIndexes: data.replicaIndexes,
            bucketType: data.bucketType,
            storageBackend: data.storageBackend,
            evictionPolicy: data.evictionPolicy,
            maxTTL: data.maxTTL || data.maxExpiry,
            compressionMode: data.compressionMode,
            durabilityMinLevel: data.durabilityMinLevel ||
                utilities_1.duraLevelToNsServerStr(data.minimumDurabilityLevel),
        };
    }
    /**
     * @internal
     */
    static _fromNsData(data) {
        return new BucketSettings({
            name: data.name,
            flushEnabled: data.controllers && data.controllers.flush,
            ramQuotaMB: data.ramQuotaMB,
            numReplicas: data.replicaNumber,
            replicaIndexes: data.replicaIndexes,
            bucketType: data.bucketType,
            storageBackend: data.storageBackend,
            evictionPolicy: data.evictionPolicy,
            maxExpiry: data.maxTTL,
            compressionMode: data.compressionMode,
            minimumDurabilityLevel: utilities_1.nsServerStrToDuraLevel(data.durabilityMinLevel),
            maxTTL: 0,
            durabilityMinLevel: '',
            ejectionMethod: '',
        });
    }
}
exports.BucketSettings = BucketSettings;
/**
 * We intentionally do not export this class as it is never returned back
 * to the user, but we still need the ability to translate to NS data.
 *
 * @internal
 */
class CreateBucketSettings extends BucketSettings {
    /**
     * @internal
     */
    constructor(data) {
        super(data);
        this.conflictResolutionType = data.conflictResolutionType;
    }
    /**
     * @internal
     */
    static _toNsData(data) {
        return {
            ...BucketSettings._toNsData(data),
            conflictResolutionType: data.conflictResolutionType,
        };
    }
}
/**
 * BucketManager provides an interface for adding/removing/updating
 * buckets within the cluster.
 *
 * @category Management
 */
class BucketManager {
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
     * Creates a new bucket.
     *
     * @param settings The settings to use for the new bucket.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async createBucket(settings, options, callback) {
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
            const bucketData = CreateBucketSettings._toNsData(settings);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/pools/default/buckets`,
                contentType: 'application/x-www-form-urlencoded',
                body: utilities_1.cbQsStringify(bucketData),
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 202) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('already exists')) {
                    throw new errors_1.BucketExistsError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to create bucket', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Updates the settings for an existing bucket.
     *
     * @param settings The new settings to use for the bucket.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async updateBucket(settings, options, callback) {
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
            const bucketData = BucketSettings._toNsData(settings);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/pools/default/buckets/${settings.name}`,
                contentType: 'application/x-www-form-urlencoded',
                body: utilities_1.cbQsStringify(bucketData),
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('not found')) {
                    throw new errors_1.BucketNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to update bucket', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Drops an existing bucket.
     *
     * @param bucketName The name of the bucket to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropBucket(bucketName, options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/pools/default/buckets/${bucketName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('not found')) {
                    throw new errors_1.BucketNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to drop bucket', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Fetches the settings in use for a specified bucket.
     *
     * @param bucketName The name of the bucket to fetch settings for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getBucket(bucketName, options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/pools/default/buckets/${bucketName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('not found')) {
                    throw new errors_1.BucketNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get bucket', undefined, errCtx);
            }
            const bucketData = JSON.parse(res.body.toString());
            return BucketSettings._fromNsData(bucketData);
        }, callback);
    }
    /**
     * Returns a list of existing buckets in the cluster.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllBuckets(options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/pools/default/buckets`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to get buckets', undefined, errCtx);
            }
            const bucketsData = JSON.parse(res.body.toString());
            const buckets = bucketsData.map((bucketData) => BucketSettings._fromNsData(bucketData));
            return buckets;
        }, callback);
    }
    /**
     * Flushes the bucket, deleting all the existing data that is stored in it.
     *
     * @param bucketName The name of the bucket to flush.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async flushBucket(bucketName, options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Management,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/pools/default/buckets/${bucketName}/controller/doFlush`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('not found')) {
                    throw new errors_1.BucketNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get bucket', undefined, errCtx);
            }
        }, callback);
    }
}
exports.BucketManager = BucketManager;
