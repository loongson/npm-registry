/// <reference types="node" />
import { IncrementOptions, DecrementOptions, AppendOptions, PrependOptions, BinaryCollection } from './binarycollection';
import { Connection } from './connection';
import { CounterResult, ExistsResult, GetReplicaResult, GetResult, LookupInResult, MutateInResult, MutationResult } from './crudoptypes';
import { CouchbaseList, CouchbaseMap, CouchbaseQueue, CouchbaseSet } from './datastructures';
import { DurabilityLevel, StoreSemantics } from './generaltypes';
import { Scope } from './scope';
import { LookupInSpec, MutateInSpec } from './sdspecs';
import { RequestSpan } from './tracing';
import { Transcoder } from './transcoders';
import { NodeCallback, Cas } from './utilities';
/**
 * @category Key-Value
 */
export interface GetOptions {
    /**
     * Specifies a list of fields within the document which should be fetched.
     * This allows for easy retrieval of select fields without incurring the
     * overhead of fetching the whole document.
     */
    project?: string[];
    /**
     * Indicates that the expiry of the document should be fetched alongside
     * the data itself.
     */
    withExpiry?: boolean;
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface ExistsOptions {
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
 * @category Key-Value
 */
export interface InsertOptions {
    /**
     * Specifies the expiry time for this document, specified in seconds.
     */
    expiry?: number;
    /**
     * Specifies the level of synchronous durability for this operation.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the number of nodes this operation should be persisted to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityPersistTo?: number;
    /**
     * Specifies the number of nodes this operation should be replicated to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityReplicateTo?: number;
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface UpsertOptions {
    /**
     * Specifies the expiry time for this document, specified in seconds.
     */
    expiry?: number;
    /**
     * Specifies that any existing expiry on the document should be preserved.
     */
    preserveExpiry?: boolean;
    /**
     * Specifies the level of synchronous durability for this operation.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the number of nodes this operation should be persisted to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityPersistTo?: number;
    /**
     * Specifies the number of nodes this operation should be replicated to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityReplicateTo?: number;
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface ReplaceOptions {
    /**
     * Specifies the expiry time for this document, specified in seconds.
     */
    expiry?: number;
    /**
     * Specifies that any existing expiry on the document should be preserved.
     */
    preserveExpiry?: boolean;
    /**
     * If specified, indicates that operation should be failed if the CAS
     * has changed from this value, indicating that the document has changed.
     */
    cas?: Cas;
    /**
     * Specifies the level of synchronous durability for this operation.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the number of nodes this operation should be persisted to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityPersistTo?: number;
    /**
     * Specifies the number of nodes this operation should be replicated to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityReplicateTo?: number;
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface RemoveOptions {
    /**
     * If specified, indicates that operation should be failed if the CAS
     * has changed from this value, indicating that the document has changed.
     */
    cas?: Cas;
    /**
     * Specifies the level of synchronous durability for this operation.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the number of nodes this operation should be persisted to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityPersistTo?: number;
    /**
     * Specifies the number of nodes this operation should be replicated to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityReplicateTo?: number;
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
 * @category Key-Value
 */
export interface GetAnyReplicaOptions {
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface GetAllReplicasOptions {
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface TouchOptions {
    /**
     * Specifies the level of synchronous durability for this operation.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the number of nodes this operation should be persisted to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityPersistTo?: number;
    /**
     * Specifies the number of nodes this operation should be replicated to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityReplicateTo?: number;
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
 * @category Key-Value
 */
export interface GetAndTouchOptions {
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface GetAndLockOptions {
    /**
     * Specifies an explicit transcoder to use for this specific operation.
     */
    transcoder?: Transcoder;
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
 * @category Key-Value
 */
export interface UnlockOptions {
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
 * @category Key-Value
 */
export interface LookupInOptions {
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
 * @category Key-Value
 */
export interface MutateInOptions {
    /**
     * Specifies the expiry time for this document, specified in seconds.
     */
    expiry?: number;
    /**
     * Specifies that any existing expiry on the document should be preserved.
     */
    preserveExpiry?: boolean;
    /**
     * If specified, indicates that operation should be failed if the CAS
     * has changed from this value, indicating that the document has changed.
     */
    cas?: Cas;
    /**
     * Specifies the level of synchronous durability for this operation.
     */
    durabilityLevel?: DurabilityLevel;
    /**
     * Specifies the number of nodes this operation should be persisted to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityPersistTo?: number;
    /**
     * Specifies the number of nodes this operation should be replicated to
     * before it is considered successful.  Note that this option is mutually
     * exclusive of {@link durabilityLevel}.
     */
    durabilityReplicateTo?: number;
    /**
     * Specifies the store semantics to use for this operation.
     */
    storeSemantics?: StoreSemantics;
    /**
     * The parent tracing span that this operation will be part of.
     */
    parentSpan?: RequestSpan;
    /**
     * The timeout for this operation, represented in milliseconds.
     */
    timeout?: number;
    /**
     * Specifies whether the operation should be performed with upsert semantics,
     * creating the document if it does not already exist.
     *
     * @deprecated Use {@link MutateInOptions.storeSemantics} instead.
     */
    upsertDocument?: boolean;
}
/**
 * Exposes the operations which are available to be performed against a collection.
 * Namely the ability to perform KV operations.
 *
 * @category Core
 */
export declare class Collection {
    /**
     * @internal
     */
    static get DEFAULT_NAME(): string;
    private _scope;
    private _name;
    private _conn;
    /**
    @internal
    */
    constructor(scope: Scope, collectionName: string);
    /**
    @internal
    */
    get conn(): Connection;
    /**
    @internal
    */
    get scope(): Scope;
    /**
    @internal
    */
    get transcoder(): Transcoder;
    /**
     * The name of the collection this Collection object references.
     */
    get name(): string;
    private get _lcbScopeColl();
    /**
     * Retrieves the value of a document from the collection.
     *
     * @param key The document key to retrieve.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    get(key: string, options?: GetOptions, callback?: NodeCallback<GetResult>): Promise<GetResult>;
    private _projectedGet;
    /**
     * Checks whether a specific document exists or not.
     *
     * @param key The document key to check for existence.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    exists(key: string, options?: ExistsOptions, callback?: NodeCallback<ExistsResult>): Promise<ExistsResult>;
    /**
     * Retrieves the value of the document from any of the available replicas.  This
     * will return as soon as the first response is received from any replica node.
     *
     * @param key The document key to retrieve.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAnyReplica(key: string, options?: GetAnyReplicaOptions, callback?: NodeCallback<GetReplicaResult>): Promise<GetReplicaResult>;
    /**
     * Retrieves the value of the document from all available replicas.  Note that
     * as replication is asynchronous, each node may return a different value.
     *
     * @param key The document key to retrieve.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAllReplicas(key: string, options?: GetAllReplicasOptions, callback?: NodeCallback<GetReplicaResult[]>): Promise<GetReplicaResult[]>;
    /**
     * Inserts a new document to the collection, failing if the document already exists.
     *
     * @param key The document key to insert.
     * @param value The value of the document to insert.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    insert(key: string, value: any, options?: InsertOptions, callback?: NodeCallback<MutationResult>): Promise<MutationResult>;
    /**
     * Upserts a document to the collection.  This operation succeeds whether or not the
     * document already exists.
     *
     * @param key The document key to upsert.
     * @param value The new value for the document.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    upsert(key: string, value: any, options?: UpsertOptions, callback?: NodeCallback<MutationResult>): Promise<MutationResult>;
    /**
     * Replaces the value of an existing document.  Failing if the document does not exist.
     *
     * @param key The document key to replace.
     * @param value The new value for the document.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    replace(key: string, value: any, options?: ReplaceOptions, callback?: NodeCallback<MutationResult>): Promise<MutationResult>;
    /**
     * Remove an existing document from the collection.
     *
     * @param key The document key to remove.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    remove(key: string, options?: RemoveOptions, callback?: NodeCallback<MutationResult>): Promise<MutationResult>;
    /**
     * Retrieves the value of the document and simultanously updates the expiry time
     * for the same document.
     *
     * @param key The document to fetch and touch.
     * @param expiry The new expiry to apply to the document, specified in seconds.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAndTouch(key: string, expiry: number, options?: GetAndTouchOptions, callback?: NodeCallback<GetResult>): Promise<GetResult>;
    /**
     * Updates the expiry on an existing document.
     *
     * @param key The document key to touch.
     * @param expiry The new expiry to set for the document, specified in seconds.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    touch(key: string, expiry: number, options?: TouchOptions, callback?: NodeCallback<MutationResult>): Promise<MutationResult>;
    /**
     * Locks a document and retrieves the value of that document at the time it is locked.
     *
     * @param key The document key to retrieve and lock.
     * @param lockTime The amount of time to lock the document for, specified in seconds.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAndLock(key: string, lockTime: number, options?: GetAndLockOptions, callback?: NodeCallback<GetResult>): Promise<GetResult>;
    /**
     * Unlocks a previously locked document.
     *
     * @param key The document key to unlock.
     * @param cas The CAS of the document, used to validate lock ownership.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    unlock(key: string, cas: Cas, options?: UnlockOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Performs a lookup-in operation against a document, fetching individual fields or
     * information about specific fields inside the document value.
     *
     * @param key The document key to look in.
     * @param specs A list of specs describing the data to fetch from the document.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    lookupIn(key: string, specs: LookupInSpec[], options?: LookupInOptions, callback?: NodeCallback<LookupInResult>): Promise<LookupInResult>;
    /**
     * Performs a mutate-in operation against a document.  Allowing atomic modification of
     * specific fields within a document.  Also enables access to document extended-attributes.
     *
     * @param key The document key to mutate.
     * @param specs A list of specs describing the operations to perform on the document.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    mutateIn(key: string, specs: MutateInSpec[], options?: MutateInOptions, callback?: NodeCallback<MutateInResult>): Promise<MutateInResult>;
    /**
     * Returns a CouchbaseList permitting simple list storage in a document.
     *
     * @param key The document key the data-structure resides in.
     */
    list(key: string): CouchbaseList;
    /**
     * Returns a CouchbaseQueue permitting simple queue storage in a document.
     *
     * @param key The document key the data-structure resides in.
     */
    queue(key: string): CouchbaseQueue;
    /**
     * Returns a CouchbaseMap permitting simple map storage in a document.
     *
     * @param key The document key the data-structure resides in.
     */
    map(key: string): CouchbaseMap;
    /**
     * Returns a CouchbaseSet permitting simple set storage in a document.
     *
     * @param key The document key the data-structure resides in.
     */
    set(key: string): CouchbaseSet;
    /**
     * Returns a BinaryCollection object reference, allowing access to various
     * binary operations possible against a collection.
     */
    binary(): BinaryCollection;
    private _getReplica;
    private _store;
    private _counter;
    /**
     * @internal
     */
    _binaryIncrement(key: string, delta: number, options?: IncrementOptions, callback?: NodeCallback<CounterResult>): Promise<CounterResult>;
    /**
     * @internal
     */
    _binaryDecrement(key: string, delta: number, options?: DecrementOptions, callback?: NodeCallback<CounterResult>): Promise<CounterResult>;
    /**
     * @internal
     */
    _binaryAppend(key: string, value: string | Buffer, options?: AppendOptions, callback?: NodeCallback<MutationResult>): Promise<MutationResult>;
    /**
     * @internal
     */
    _binaryPrepend(key: string, value: string | Buffer, options?: PrependOptions, callback?: NodeCallback<MutationResult>): Promise<MutationResult>;
}
