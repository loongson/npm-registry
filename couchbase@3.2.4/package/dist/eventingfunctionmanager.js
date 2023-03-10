"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventingFunctionManager = exports.EventingState = exports.EventingFunctionState = exports.EventingFunction = exports.EventingFunctionSettings = exports.EventingFunctionConstantBinding = exports.EventingFunctionUrlBinding = exports.EventingFunctionUrlAuthBearer = exports.EventingFunctionUrlAuthDigest = exports.EventingFunctionUrlAuthBasic = exports.EventingFunctionBucketBinding = exports.EventingFunctionKeyspace = exports.EventingFunctionUrlAuthMethod = exports.EventingFunctionBucketAccess = exports.EventingFunctionLogLevel = exports.EventingFunctionLanguageCompatibility = exports.EventingFunctionStatus = exports.EventingFunctionProcessingStatus = exports.EventingFunctionDeploymentStatus = exports.EventingFunctionDcpBoundary = void 0;
const errors_1 = require("./errors");
const httpexecutor_1 = require("./httpexecutor");
const utilities_1 = require("./utilities");
/**
 * Represents the various dcp boundary options for eventing functions.
 *
 * @category Management
 */
var EventingFunctionDcpBoundary;
(function (EventingFunctionDcpBoundary) {
    /**
     * Indicates all documents should be processed by the function.
     */
    EventingFunctionDcpBoundary["Everything"] = "everything";
    /**
     * Indicates that only documents modified after a function is created
     * should be processed by the function.
     */
    EventingFunctionDcpBoundary["FromNow"] = "from_now";
})(EventingFunctionDcpBoundary = exports.EventingFunctionDcpBoundary || (exports.EventingFunctionDcpBoundary = {}));
/**
 * Represents the various possible deployment statuses for an eventing function.
 *
 * @category Management
 */
var EventingFunctionDeploymentStatus;
(function (EventingFunctionDeploymentStatus) {
    /**
     * Indicates that the function is deployed.
     */
    EventingFunctionDeploymentStatus["Deployed"] = "deployed";
    /**
     * Indicates that the function has not yet been deployed.
     */
    EventingFunctionDeploymentStatus["Undeployed"] = "undeployed";
})(EventingFunctionDeploymentStatus = exports.EventingFunctionDeploymentStatus || (exports.EventingFunctionDeploymentStatus = {}));
/**
 * Represents the various possible processing statuses for an eventing function.
 *
 * @category Management
 */
var EventingFunctionProcessingStatus;
(function (EventingFunctionProcessingStatus) {
    /**
     * Indicates that the eventing function is currently running.
     */
    EventingFunctionProcessingStatus["Running"] = "running";
    /**
     * Indicates that the eventing function is currently paused.
     */
    EventingFunctionProcessingStatus["Paused"] = "paused";
})(EventingFunctionProcessingStatus = exports.EventingFunctionProcessingStatus || (exports.EventingFunctionProcessingStatus = {}));
/**
 * Represents the authentication method to use for a URL binding.
 *
 * @category Management
 */
var EventingFunctionStatus;
(function (EventingFunctionStatus) {
    /**
     * Indicates that the eventing function is undeployed.
     */
    EventingFunctionStatus["Undeployed"] = "undeployed";
    /**
     * Indicates that the eventing function is deploying.
     */
    EventingFunctionStatus["Deploying"] = "deploying";
    /**
     * Indicates that the eventing function is deployed.
     */
    EventingFunctionStatus["Deployed"] = "deployed";
    /**
     * Indicates that the eventing function is undeploying.
     */
    EventingFunctionStatus["Undeploying"] = "undeploying";
    /**
     * Indicates that the eventing function is paused.
     */
    EventingFunctionStatus["Paused"] = "paused";
    /**
     * Indicates that the eventing function is pausing.
     */
    EventingFunctionStatus["Pausing"] = "pausing";
})(EventingFunctionStatus = exports.EventingFunctionStatus || (exports.EventingFunctionStatus = {}));
/**
 * Represents the language compatibility levels of an eventing function.
 *
 * @category Management
 */
var EventingFunctionLanguageCompatibility;
(function (EventingFunctionLanguageCompatibility) {
    /**
     * Indicates that the function should run with compatibility with
     * Couchbase Server 6.0.0.
     */
    EventingFunctionLanguageCompatibility["Version_6_0_0"] = "6.0.0";
    /**
     * Indicates that the function should run with compatibility with
     * Couchbase Server 6.5.0.
     */
    EventingFunctionLanguageCompatibility["Version_6_5_0"] = "6.5.0";
    /**
     * Indicates that the function should run with compatibility with
     * Couchbase Server 6.6.2.
     */
    EventingFunctionLanguageCompatibility["Version_6_6_2"] = "6.6.2";
})(EventingFunctionLanguageCompatibility = exports.EventingFunctionLanguageCompatibility || (exports.EventingFunctionLanguageCompatibility = {}));
/**
 * Represents the various log levels for an eventing function.
 *
 * @category Management
 */
var EventingFunctionLogLevel;
(function (EventingFunctionLogLevel) {
    /**
     * Indicates to use INFO level logging.
     */
    EventingFunctionLogLevel["Info"] = "INFO";
    /**
     * Indicates to use ERROR level logging.
     */
    EventingFunctionLogLevel["Error"] = "ERROR";
    /**
     * Indicates to use WARNING level logging.
     */
    EventingFunctionLogLevel["Warning"] = "WARNING";
    /**
     * Indicates to use DEBUG level logging.
     */
    EventingFunctionLogLevel["Debug"] = "DEBUG";
    /**
     * Indicates to use TRACE level logging.
     */
    EventingFunctionLogLevel["Trace"] = "TRACE";
})(EventingFunctionLogLevel = exports.EventingFunctionLogLevel || (exports.EventingFunctionLogLevel = {}));
/**
 * Represents the various bucket access levels for an eventing function.
 *
 * @category Management
 */
var EventingFunctionBucketAccess;
(function (EventingFunctionBucketAccess) {
    /**
     * Indicates that the function can only read the associated bucket.
     */
    EventingFunctionBucketAccess["ReadOnly"] = "r";
    /**
     * Indicates that the function can both read and write the associated bucket.
     */
    EventingFunctionBucketAccess["ReadWrite"] = "rw";
})(EventingFunctionBucketAccess = exports.EventingFunctionBucketAccess || (exports.EventingFunctionBucketAccess = {}));
/**
 * Represents the authentication method to use for a URL binding.
 *
 * @category Management
 */
var EventingFunctionUrlAuthMethod;
(function (EventingFunctionUrlAuthMethod) {
    /**
     * Indicates that no authentication should be used.
     */
    EventingFunctionUrlAuthMethod["None"] = "no-auth";
    /**
     * Indicates that Basic should be used.
     */
    EventingFunctionUrlAuthMethod["Basic"] = "basic";
    /**
     * Indicates that Digest should be used.
     */
    EventingFunctionUrlAuthMethod["Digest"] = "digest";
    /**
     * Indicates that Bearer should be used.
     */
    EventingFunctionUrlAuthMethod["Bearer"] = "bearer";
})(EventingFunctionUrlAuthMethod = exports.EventingFunctionUrlAuthMethod || (exports.EventingFunctionUrlAuthMethod = {}));
/**
 * Specifies the bucket/scope/collection used by an eventing function.
 *
 * @category Management
 */
class EventingFunctionKeyspace {
    constructor(v) {
        this.bucket = v.bucket;
        this.scope = v.scope;
        this.collection = v.collection;
    }
}
exports.EventingFunctionKeyspace = EventingFunctionKeyspace;
/**
 * Specifies a bucket binding for an eventing function.
 *
 * @category Management
 */
class EventingFunctionBucketBinding {
    constructor(v) {
        this.alias = v.alias;
        this.name = v.name;
        this.access = v.access;
    }
    /**
     * @internal
     */
    static _fromEvtData(data) {
        return new EventingFunctionBucketBinding({
            name: new EventingFunctionKeyspace({
                bucket: data.bucket_name,
                scope: data.scope_name,
                collection: data.collection_name,
            }),
            alias: data.alias,
            access: data.access,
        });
    }
    /**
     * @internal
     */
    static _toEvtData(data) {
        return {
            bucket_name: data.name.bucket,
            scope_name: data.name.scope,
            collection_name: data.name.collection,
            alias: data.alias,
            access: data.access,
        };
    }
}
exports.EventingFunctionBucketBinding = EventingFunctionBucketBinding;
/**
 * Specifies that Basic authentication should be used for the URL.
 *
 * @category Management
 */
class EventingFunctionUrlAuthBasic {
    constructor(v) {
        /**
         * Sets the auth method to Basic.
         */
        this.method = EventingFunctionUrlAuthMethod.Basic;
        this.username = v.username;
        this.password = v.password;
    }
}
exports.EventingFunctionUrlAuthBasic = EventingFunctionUrlAuthBasic;
/**
 * Specifies that Digest authentication should be used for the URL.
 *
 * @category Management
 */
class EventingFunctionUrlAuthDigest {
    constructor(v) {
        /**
         * Sets the auth method to Digest.
         */
        this.method = EventingFunctionUrlAuthMethod.Digest;
        this.username = v.username;
        this.password = v.password;
    }
}
exports.EventingFunctionUrlAuthDigest = EventingFunctionUrlAuthDigest;
/**
 * Specifies that Bearer authentication should be used for the URL.
 *
 * @category Management
 */
class EventingFunctionUrlAuthBearer {
    constructor(v) {
        /**
         * Sets the auth method to Bearer.
         */
        this.method = EventingFunctionUrlAuthMethod.Bearer;
        this.key = v.key;
    }
}
exports.EventingFunctionUrlAuthBearer = EventingFunctionUrlAuthBearer;
/**
 * Specifies a url binding for an eventing function.
 *
 * @category Management
 */
class EventingFunctionUrlBinding {
    constructor(v) {
        this.hostname = v.hostname;
        this.alias = v.alias;
        this.auth = v.auth;
        this.allowCookies = v.allowCookies;
        this.validateSslCertificate = v.validateSslCertificate;
    }
    /**
     * @internal
     */
    static _fromEvtData(data) {
        let authObj;
        if (data.auth_type === EventingFunctionUrlAuthMethod.None) {
            authObj = undefined;
        }
        else if (data.auth_type === EventingFunctionUrlAuthMethod.Basic) {
            authObj = new EventingFunctionUrlAuthBasic({
                username: data.username,
                password: data.password,
            });
        }
        else if (data.auth_type === EventingFunctionUrlAuthMethod.Digest) {
            authObj = new EventingFunctionUrlAuthDigest({
                username: data.username,
                password: data.password,
            });
        }
        else if (data.auth_type === EventingFunctionUrlAuthMethod.Bearer) {
            authObj = new EventingFunctionUrlAuthBearer({
                key: data.bearer_key,
            });
        }
        else {
            throw new Error('invalid auth type specified');
        }
        return {
            hostname: data.hostname,
            alias: data.value,
            allowCookies: data.allow_cookies,
            validateSslCertificate: data.validate_ssl_certificate,
            auth: authObj,
        };
    }
    /**
     * @internal
     */
    static _toEvtData(data) {
        return {
            hostname: data.hostname,
            value: data.alias,
            allow_cookies: data.allowCookies,
            validate_ssl_certificate: data.validateSslCertificate,
            auth_type: data.auth
                ? data.auth.method
                : EventingFunctionUrlAuthMethod.None,
            username: data.username,
            password: data.password,
            bearer_key: data.key,
        };
    }
}
exports.EventingFunctionUrlBinding = EventingFunctionUrlBinding;
/**
 * Specifies a constant binding for an eventing function.
 *
 * @category Management
 */
class EventingFunctionConstantBinding {
    constructor(v) {
        this.alias = v.alias;
        this.literal = v.literal;
    }
    /**
     * @internal
     */
    static _fromEvtData(data) {
        return new EventingFunctionConstantBinding({
            alias: data.value,
            literal: data.literal,
        });
    }
    /**
     * @internal
     */
    static _toEvtData(data) {
        return {
            value: data.alias,
            literal: data.literal,
        };
    }
}
exports.EventingFunctionConstantBinding = EventingFunctionConstantBinding;
/**
 * Specifies a number of options which can be used when updating or creating
 * a eventing function.
 *
 * @category Management
 */
class EventingFunctionSettings {
    constructor(v) {
        this.cppWorkerThreadCount = v.cppWorkerThreadCount;
        this.dcpStreamBoundary = v.dcpStreamBoundary;
        this.description = v.description;
        this.deploymentStatus = v.deploymentStatus;
        this.processingStatus = v.processingStatus;
        this.languageCompatibility = v.languageCompatibility;
        this.logLevel = v.logLevel;
        this.executionTimeout = v.executionTimeout;
        this.lcbInstCapacity = v.lcbInstCapacity;
        this.lcbRetryCount = v.lcbRetryCount;
        this.lcbTimeout = v.lcbTimeout;
        this.queryConsistency = v.queryConsistency;
        this.numTimerPartitions = v.numTimerPartitions;
        this.sockBatchSize = v.sockBatchSize;
        this.tickDuration = v.tickDuration;
        this.timerContextSize = v.timerContextSize;
        this.userPrefix = v.userPrefix;
        this.bucketCacheSize = v.bucketCacheSize;
        this.bucketCacheAge = v.bucketCacheAge;
        this.curlMaxAllowedRespSize = v.curlMaxAllowedRespSize;
        this.queryPrepareAll = v.queryPrepareAll;
        this.workerCount = v.workerCount;
        this.handlerHeaders = v.handlerHeaders;
        this.handlerFooters = v.handlerFooters;
        this.enableAppLogRotation = v.enableAppLogRotation;
        this.appLogDir = v.appLogDir;
        this.appLogMaxSize = v.appLogMaxSize;
        this.appLogMaxFiles = v.appLogMaxFiles;
        this.checkpointInterval = v.checkpointInterval;
    }
    /**
     * @internal
     */
    static _fromEvtData(data) {
        return new EventingFunctionSettings({
            cppWorkerThreadCount: data.cpp_worker_thread_count,
            dcpStreamBoundary: data.dcp_stream_boundary,
            description: data.description,
            logLevel: data.log_level,
            languageCompatibility: data.language_compatibility,
            executionTimeout: data.execution_timeout,
            lcbInstCapacity: data.lcb_inst_capacity,
            lcbRetryCount: data.lcb_retry_count,
            lcbTimeout: data.lcb_timeout,
            queryConsistency: data.n1ql_consistency,
            numTimerPartitions: data.num_timer_partitions,
            sockBatchSize: data.sock_batch_size,
            tickDuration: data.tick_duration,
            timerContextSize: data.timer_context_size,
            userPrefix: data.user_prefix,
            bucketCacheSize: data.bucket_cache_size,
            bucketCacheAge: data.bucket_cache_age,
            curlMaxAllowedRespSize: data.curl_max_allowed_resp_size,
            workerCount: data.worker_count,
            queryPrepareAll: data.n1ql_prepare_all,
            handlerHeaders: data.handler_headers,
            handlerFooters: data.handler_footers,
            enableAppLogRotation: data.enable_applog_rotation,
            appLogDir: data.app_log_dir,
            appLogMaxSize: data.app_log_max_size,
            appLogMaxFiles: data.app_log_max_files,
            checkpointInterval: data.checkpoint_interval,
            deploymentStatus: data.deployment_status
                ? EventingFunctionDeploymentStatus.Deployed
                : EventingFunctionDeploymentStatus.Undeployed,
            processingStatus: data.processing_status
                ? EventingFunctionProcessingStatus.Running
                : EventingFunctionProcessingStatus.Paused,
        });
    }
    /**
     * @internal
     */
    static _toEvtData(data) {
        if (!data) {
            return {
                deployment_status: false,
            };
        }
        return {
            cpp_worker_thread_count: data.cppWorkerThreadCount,
            dcp_stream_boundary: data.dcpStreamBoundary,
            description: data.description,
            log_level: data.logLevel,
            language_compatibility: data.languageCompatibility,
            execution_timeout: data.executionTimeout,
            lcb_inst_capacity: data.lcbInstCapacity,
            lcb_retry_count: data.lcbRetryCount,
            lcb_timeout: data.lcbTimeout,
            n1ql_consistency: data.queryConsistency,
            num_timer_partitions: data.numTimerPartitions,
            sock_batch_size: data.sockBatchSize,
            tick_duration: data.tickDuration,
            timer_context_size: data.timerContextSize,
            user_prefix: data.userPrefix,
            bucket_cache_size: data.bucketCacheSize,
            bucket_cache_age: data.bucketCacheAge,
            curl_max_allowed_resp_size: data.curlMaxAllowedRespSize,
            worker_count: data.workerCount,
            n1ql_prepare_all: data.queryPrepareAll,
            handler_headers: data.handlerHeaders,
            handler_footers: data.handlerFooters,
            enable_applog_rotation: data.enableAppLogRotation,
            app_log_dir: data.appLogDir,
            app_log_max_size: data.appLogMaxSize,
            app_log_max_files: data.appLogMaxFiles,
            checkpoint_interval: data.checkpointInterval,
            deployment_status: data.deploymentStatus === EventingFunctionDeploymentStatus.Deployed
                ? true
                : false,
            processing_status: data.processingStatus === EventingFunctionProcessingStatus.Running
                ? true
                : false,
        };
    }
}
exports.EventingFunctionSettings = EventingFunctionSettings;
/**
 * Describes an eventing function.
 *
 * @category Management
 */
class EventingFunction {
    constructor(v) {
        this.name = v.name;
        this.code = v.code;
        this.version = v.version;
        this.enforceSchema = v.enforceSchema;
        this.handlerUuid = v.handlerUuid;
        this.functionInstanceId = v.functionInstanceId;
        this.metadataKeyspace = v.metadataKeyspace;
        this.sourceKeyspace = v.sourceKeyspace;
        this.bucketBindings = v.bucketBindings;
        this.urlBindings = v.urlBindings;
        this.constantBindings = v.constantBindings;
        this.settings = v.settings;
    }
    /**
     * @internal
     */
    static _fromEvtData(data) {
        return new EventingFunction({
            name: data.appname,
            code: data.appcode,
            settings: EventingFunctionSettings._fromEvtData(data.settings),
            version: data.version,
            enforceSchema: data.enforce_schema,
            handlerUuid: data.handleruuid,
            functionInstanceId: data.function_instance_id,
            metadataKeyspace: new EventingFunctionKeyspace({
                bucket: data.depcfg.metadata_bucket,
                scope: data.depcfg.metadata_scope,
                collection: data.depcfg.metadata_collection,
            }),
            sourceKeyspace: new EventingFunctionKeyspace({
                bucket: data.depcfg.source_bucket,
                scope: data.depcfg.source_scope,
                collection: data.depcfg.source_collection,
            }),
            constantBindings: data.depcfg.constants.map((bindingData) => EventingFunctionConstantBinding._fromEvtData(bindingData)),
            bucketBindings: data.depcfg.buckets.map((bindingData) => EventingFunctionBucketBinding._fromEvtData(bindingData)),
            urlBindings: data.depcfg.curl.map((bindingData) => EventingFunctionUrlBinding._fromEvtData(bindingData)),
        });
    }
    /**
     * @internal
     */
    static _toEvtData(data) {
        return {
            appname: data.name,
            appcode: data.code,
            settings: EventingFunctionSettings._toEvtData(data.settings),
            version: data.version,
            enforce_schema: data.enforceSchema,
            handleruuid: data.handlerUuid,
            function_instance_id: data.functionInstanceId,
            depcfg: {
                metadata_bucket: data.metadataKeyspace.bucket,
                metadata_scope: data.metadataKeyspace.scope,
                metadata_collection: data.metadataKeyspace.collection,
                source_bucket: data.sourceKeyspace.bucket,
                source_scope: data.sourceKeyspace.scope,
                source_collection: data.sourceKeyspace.collection,
                constants: data.constantBindings.map((binding) => EventingFunctionConstantBinding._toEvtData(binding)),
                buckets: data.bucketBindings.map((binding) => EventingFunctionBucketBinding._toEvtData(binding)),
                curl: data.urlBindings.map((binding) => EventingFunctionUrlBinding._toEvtData(binding)),
            },
        };
    }
}
exports.EventingFunction = EventingFunction;
/**
 * Describes the current state of an eventing function.
 *
 * @category Management
 */
class EventingFunctionState {
    constructor(v) {
        this.name = v.name;
        this.status = v.status;
        this.numBootstrappingNodes = v.numBootstrappingNodes;
        this.numDeployedNodes = v.numDeployedNodes;
        this.deploymentStatus = v.deploymentStatus;
        this.processingStatus = v.processingStatus;
    }
    /**
     * @internal
     */
    static _fromEvtData(data) {
        return new EventingFunctionState({
            name: data.name,
            status: data.composite_status,
            numBootstrappingNodes: data.num_bootstrapping_nodes,
            numDeployedNodes: data.num_deployed_nodes,
            deploymentStatus: data.deployment_status
                ? EventingFunctionDeploymentStatus.Deployed
                : EventingFunctionDeploymentStatus.Undeployed,
            processingStatus: data.processing_status
                ? EventingFunctionProcessingStatus.Running
                : EventingFunctionProcessingStatus.Paused,
        });
    }
}
exports.EventingFunctionState = EventingFunctionState;
/**
 * Describes the current state of all eventing function.
 *
 * @category Management
 */
class EventingState {
    constructor(v) {
        this.numEventingNodes = v.numEventingNodes;
        this.functions = v.functions;
    }
    /**
     * @internal
     */
    static _fromEvtData(data) {
        return new EventingState({
            numEventingNodes: data.num_eventing_nodes,
            functions: data.apps.map((functionData) => EventingFunctionState._fromEvtData(functionData)),
        });
    }
}
exports.EventingState = EventingState;
/**
 * EventingFunctionManager provides an interface for managing the
 * eventing functions on the cluster.
 * Volatile: This API is subject to change at any time.
 *
 * @category Management
 */
class EventingFunctionManager {
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
     * Creates or updates an eventing function.
     *
     * @param functionDefinition The description of the eventing function to upsert.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async upsertFunction(functionDefinition, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const functionName = functionDefinition.name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const encodedData = EventingFunction._toEvtData(functionDefinition);
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/v1/functions/${functionName}`,
                contentType: 'application/json',
                body: JSON.stringify(encodedData),
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('err_collection_missing')) {
                    throw new errors_1.CollectionNotFoundError(undefined, errCtx);
                }
                if (errText.includes('err_src_mb_same')) {
                    throw new errors_1.EventingFunctionIdenticalKeyspaceError(undefined, errCtx);
                }
                if (errText.includes('err_handler_compilation')) {
                    throw new errors_1.EventingFunctionCompilationFailureError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to upsert function', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Deletes an eventing function.
     *
     * @param name The name of the eventing function to delete.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async dropFunction(name, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const functionName = name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Delete,
                path: `/api/v1/functions/${functionName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('err_app_not_found_ts')) {
                    throw new errors_1.EventingFunctionNotFoundError(undefined, errCtx);
                }
                if (errText.includes('err_app_not_deployed')) {
                    throw new errors_1.EventingFunctionNotDeployedError(undefined, errCtx);
                }
                if (errText.includes('err_app_not_undeployed')) {
                    throw new errors_1.EventingFunctionDeployedError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to drop function', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Fetches all eventing functions.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getAllFunctions(options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/api/v1/functions`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to get functions', undefined, errCtx);
            }
            const functionsData = JSON.parse(res.body.toString());
            const functions = functionsData.map((functionData) => EventingFunction._fromEvtData(functionData));
            return functions;
        }, callback);
    }
    /**
     * Fetches a specific eventing function.
     *
     * @param name The name of the eventing function to fetch.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async getFunction(name, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const functionName = name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/api/v1/functions/${functionName}`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('err_app_not_found_ts')) {
                    throw new errors_1.EventingFunctionNotFoundError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to get function', undefined, errCtx);
            }
            const functionData = JSON.parse(res.body.toString());
            return EventingFunction._fromEvtData(functionData);
        }, callback);
    }
    /**
     * Deploys an eventing function.
     *
     * @param name The name of the eventing function to deploy.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async deployFunction(name, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const functionName = name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/v1/functions/${functionName}/deploy`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('err_app_not_found_ts')) {
                    throw new errors_1.EventingFunctionNotFoundError(undefined, errCtx);
                }
                if (errText.includes('err_app_not_bootstrapped')) {
                    throw new errors_1.EventingFunctionNotBootstrappedError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to deploy function', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Undeploys an eventing function.
     *
     * @param name The name of the eventing function to undeploy.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async undeployFunction(name, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const functionName = name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/v1/functions/${functionName}/undeploy`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('err_app_not_found_ts')) {
                    throw new errors_1.EventingFunctionNotFoundError(undefined, errCtx);
                }
                if (errText.includes('err_app_not_deployed')) {
                    throw new errors_1.EventingFunctionNotDeployedError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to undeploy function', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Pauses an eventing function.
     *
     * @param name The name of the eventing function to pause.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async pauseFunction(name, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const functionName = name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/v1/functions/${functionName}/pause`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('err_app_not_found_ts')) {
                    throw new errors_1.EventingFunctionNotFoundError(undefined, errCtx);
                }
                if (errText.includes('err_app_not_bootstrapped')) {
                    throw new errors_1.EventingFunctionNotBootstrappedError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to pause function', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Resumes an eventing function.
     *
     * @param name The name of the eventing function to resume.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async resumeFunction(name, options, callback) {
        if (options instanceof Function) {
            callback = arguments[1];
            options = undefined;
        }
        if (!options) {
            options = {};
        }
        const functionName = name;
        const parentSpan = options.parentSpan;
        const timeout = options.timeout;
        return utilities_1.PromiseHelper.wrapAsync(async () => {
            const res = await this._http.request({
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Post,
                path: `/api/v1/functions/${functionName}/resume`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                const errText = res.body.toString().toLowerCase();
                if (errText.includes('err_app_not_found_ts')) {
                    throw new errors_1.EventingFunctionNotFoundError(undefined, errCtx);
                }
                if (errText.includes('err_app_not_deployed')) {
                    throw new errors_1.EventingFunctionNotDeployedError(undefined, errCtx);
                }
                throw new errors_1.CouchbaseError('failed to resume function', undefined, errCtx);
            }
        }, callback);
    }
    /**
     * Fetches the status of all eventing functions.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    async functionsStatus(options, callback) {
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
                type: httpexecutor_1.HttpServiceType.Eventing,
                method: httpexecutor_1.HttpMethod.Get,
                path: `/api/v1/status`,
                parentSpan: parentSpan,
                timeout: timeout,
            });
            if (res.statusCode !== 200) {
                const errCtx = httpexecutor_1.HttpExecutor.errorContextFromResponse(res);
                throw new errors_1.CouchbaseError('failed to fetch functions status', undefined, errCtx);
            }
            const statusData = JSON.parse(res.body.toString());
            return EventingState._fromEvtData(statusData);
        }, callback);
    }
}
exports.EventingFunctionManager = EventingFunctionManager;
