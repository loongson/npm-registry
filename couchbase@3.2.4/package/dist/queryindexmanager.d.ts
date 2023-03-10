import { Cluster } from './cluster';
import { RequestSpan } from './tracing';
import { NodeCallback } from './utilities';
/**
 * Contains a specific index configuration for the query service.
 *
 * @category Management
 */
export declare class QueryIndex {
    /**
     * The name of the index.
     */
    name: string;
    /**
     * Whether this is a primary or secondary index.
     */
    isPrimary: boolean;
    /**
     * The type of index.
     */
    type: string;
    /**
     * The current state of the index.
     */
    state: string;
    /**
     * The keyspace which this index covers.
     */
    keyspace: string;
    /**
     * The keys for this index.
     */
    indexKey: string[];
    /**
     * The conditional expression to limit the indexes scope.
     */
    condition?: string;
    /**
     * Information about the partitioning of this index.
     */
    partition?: string;
    /**
     * @internal
     */
    constructor(data: QueryIndex);
}
/**
 * @category Management
 */
export interface CreateQueryIndexOptions {
    /**
     * Whether or not the call should ignore the index already existing when
     * determining whether the call was successful.
     */
    ignoreIfExists?: boolean;
    /**
     * The number of replicas of this index that should be created.
     */
    numReplicas?: number;
    /**
     * Specifies whether this index creation should be deferred until a later
     * point in time when they can be explicitly built together.
     */
    deferred?: boolean;
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
    /**
     * The timeout for this operation, represented in milliseconds.
     */
    timeout?: number;
}
/**
 * @category Management
 */
export interface CreatePrimaryQueryIndexOptions {
    /**
     * The name of this primary index.
     */
    name?: string;
    /**
     * Whether or not the call should ignore the index already existing when
     * determining whether the call was successful.
     */
    ignoreIfExists?: boolean;
    /**
     * The number of replicas of this index that should be created.
     */
    numReplicas?: number;
    /**
     * Specifies whether this index creation should be deferred until a later
     * point in time when they can be explicitly built together.
     */
    deferred?: boolean;
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
    /**
     * The timeout for this operation, represented in milliseconds.
     */
    timeout?: number;
}
/**
 * @category Management
 */
export interface DropQueryIndexOptions {
    /**
     * Whether or not the call should ignore the index already existing when
     * determining whether the call was successful.
     */
    ignoreIfNotExists?: boolean;
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
    /**
     * The timeout for this operation, represented in milliseconds.
     */
    timeout?: number;
}
/**
 * @category Management
 */
export interface DropPrimaryQueryIndexOptions {
    /**
     * The name of the primary index to drop.
     */
    name?: string;
    /**
     * Whether or not the call should ignore the index already existing when
     * determining whether the call was successful.
     */
    ignoreIfNotExists?: boolean;
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
    /**
     * The timeout for this operation, represented in milliseconds.
     */
    timeout?: number;
}
/**
 * @category Management
 */
export interface GetAllQueryIndexesOptions {
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
    /**
     * The timeout for this operation, represented in milliseconds.
     */
    timeout?: number;
}
/**
 * @category Management
 */
export interface BuildQueryIndexOptions {
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
    /**
     * The timeout for this operation, represented in milliseconds.
     */
    timeout?: number;
}
/**
 * @category Management
 */
export interface WatchQueryIndexOptions {
    /**
     * Specifies whether the primary indexes should be watched as well.
     */
    watchPrimary?: boolean;
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
}
/**
 * QueryIndexManager provides an interface for managing the
 * query indexes on the cluster.
 *
 * @category Management
 */
export declare class QueryIndexManager {
    private _cluster;
    /**
     * @internal
     */
    constructor(cluster: Cluster);
    private get _http();
    private _createIndex;
    /**
     * Creates a new query index.
     *
     * @param bucketName The name of the bucket this index is for.
     * @param indexName The name of the new index.
     * @param fields The fields which this index should cover.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    createIndex(bucketName: string, indexName: string, fields: string[], options?: CreateQueryIndexOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Creates a new primary query index.
     *
     * @param bucketName The name of the bucket this index is for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    createPrimaryIndex(bucketName: string, options?: CreatePrimaryQueryIndexOptions, callback?: NodeCallback<void>): Promise<void>;
    private _dropIndex;
    /**
     * Drops an existing query index.
     *
     * @param bucketName The name of the bucket containing the index to drop.
     * @param indexName The name of the index to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    dropIndex(bucketName: string, indexName: string, options?: DropQueryIndexOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Drops an existing primary index.
     *
     * @param bucketName The name of the bucket containing the primary index to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    dropPrimaryIndex(bucketName: string, options?: DropPrimaryQueryIndexOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Returns a list of indexes for a specific bucket.
     *
     * @param bucketName The name of the bucket to fetch indexes for.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAllIndexes(bucketName: string, options?: GetAllQueryIndexesOptions, callback?: NodeCallback<QueryIndex[]>): Promise<QueryIndex[]>;
    /**
     * Starts building any indexes which were previously created with deferred=true.
     *
     * @param bucketName The name of the bucket to perform the build on.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    buildDeferredIndexes(bucketName: string, options?: BuildQueryIndexOptions, callback?: NodeCallback<string[]>): Promise<string[]>;
    /**
     * Waits for a number of indexes to finish creation and be ready to use.
     *
     * @param bucketName The name of the bucket to watch for indexes on.
     * @param indexNames The names of the indexes to watch.
     * @param timeout The maximum time to wait for the index, expressed in milliseconds.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    watchIndexes(bucketName: string, indexNames: string[], timeout: number, options?: WatchQueryIndexOptions, callback?: NodeCallback<void>): Promise<void>;
}
