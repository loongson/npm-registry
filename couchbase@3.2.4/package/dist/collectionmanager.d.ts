import { Bucket } from './bucket';
import { RequestSpan } from './tracing';
import { NodeCallback } from './utilities';
/**
 * Provides options for configuring a collection.
 *
 * @category Management
 */
export interface ICollectionSpec {
    /**
     * The name of the scope.
     */
    name: string;
    /**
     * The name of the scope containing this collection.
     */
    scopeName: string;
    /**
     * The maximum expiry for documents in this collection.
     *
     * @see {@link IBucketSettings.maxExpiry}
     */
    maxExpiry?: number;
}
/**
 * Contains information about a collection.
 *
 * @category Management
 */
export declare class CollectionSpec {
    /**
     * The name of the collection.
     */
    name: string;
    /**
     * The name of the scope this collection exists in.
     */
    scopeName: string;
    /**
     * The maximum expiry for documents in this collection.
     *
     * @see {@link IBucketSettings.maxExpiry}
     */
    maxExpiry: number;
    /**
     * @internal
     */
    constructor(data: CollectionSpec);
    /**
     * @internal
     */
    static _fromNsData(scopeName: string, data: any): CollectionSpec;
    /**
     * @internal
     */
    static _toNsData(data: ICollectionSpec): any;
}
/**
 * Contains information about a scope.
 *
 * @category Management
 */
export declare class ScopeSpec {
    /**
     * The name of the scope.
     */
    name: string;
    /**
     * The collections which exist in this scope.
     */
    collections: CollectionSpec[];
    /**
     * @internal
     */
    constructor(data: ScopeSpec);
    /**
     * @internal
     */
    static _fromNsData(data: any): ScopeSpec;
}
/**
 * @category Management
 */
export interface CreateCollectionOptions {
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
export interface GetAllScopesOptions {
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
export interface DropCollectionOptions {
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
export interface CreateScopeOptions {
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
export interface DropScopeOptions {
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
 * CollectionManager allows the management of collections within a Bucket.
 *
 * @category Management
 */
export declare class CollectionManager {
    private _bucket;
    /**
     * @internal
     */
    constructor(bucket: Bucket);
    private get _http();
    /**
     * Returns all configured scopes along with their collections.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAllScopes(options?: GetAllScopesOptions, callback?: NodeCallback<ScopeSpec[]>): Promise<ScopeSpec[]>;
    /**
     * Creates a collection in a scope.
     *
     * @deprecated Use the other overload instead.
     */
    createCollection(collectionName: string, scopeName: string, options?: CreateCollectionOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Creates a collection in a scope.
     *
     * @param collectionSpec Specifies the settings for the new collection.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    createCollection(collectionSpec: ICollectionSpec, options?: CreateCollectionOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Drops a collection from a scope.
     *
     * @param collectionName The name of the collection to drop.
     * @param scopeName The name of the scope containing the collection to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    dropCollection(collectionName: string, scopeName: string, options?: DropCollectionOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Creates a new scope.
     *
     * @param scopeName The name of the new scope to create.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    createScope(scopeName: string, options?: CreateScopeOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Drops a scope.
     *
     * @param scopeName The name of the scope to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    dropScope(scopeName: string, options?: DropScopeOptions, callback?: NodeCallback<void>): Promise<void>;
}
