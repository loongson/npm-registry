import { Bucket } from './bucket';
import { RequestSpan } from './tracing';
import { NodeCallback } from './utilities';
/**
 * Contains information about a view in a design document.
 *
 * @category Management
 */
export declare class DesignDocumentView {
    /**
     * The mapping function to use for this view.
     */
    map: string;
    /**
     * The reduction function to use for this view.
     */
    reduce: string | undefined;
    constructor(data: {
        map: string;
        reduce?: string;
    });
    /**
     * @deprecated
     */
    constructor(map: string, reduce?: string);
}
/**
 * Contains information about a design document.
 *
 * @category Management
 */
export declare class DesignDocument {
    /**
     * Same as {@link DesignDocumentView}.
     *
     * @deprecated Use {@link DesignDocumentView} directly.
     */
    static get View(): any;
    /**
     * The name of the design document.
     */
    name: string;
    /**
     * A map of the views that exist in this design document.
     */
    views: {
        [viewName: string]: DesignDocumentView;
    };
    constructor(data: {
        name: string;
        views?: {
            [viewName: string]: DesignDocumentView;
        };
    });
    /**
     * @deprecated
     */
    constructor(name: string, views: {
        [viewName: string]: DesignDocumentView;
    });
    /**
     * @internal
     */
    static _fromNsData(ddocName: string, ddocData: any): DesignDocument;
}
/**
 * @category Management
 */
export interface GetAllDesignDocumentOptions {
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
export interface GetDesignDocumentOptions {
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
export interface UpsertDesignDocumentOptions {
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
export interface DropDesignDocumentOptions {
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
export interface PublishDesignDocumentOptions {
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
 * ViewIndexManager is an interface which enables the management
 * of view indexes on the cluster.
 *
 * @category Management
 */
export declare class ViewIndexManager {
    private _bucket;
    /**
     * @internal
     */
    constructor(bucket: Bucket);
    private get _http();
    /**
     * Returns a list of all the design documents in this bucket.
     *
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getAllDesignDocuments(options?: GetAllDesignDocumentOptions, callback?: NodeCallback<DesignDocument[]>): Promise<DesignDocument[]>;
    /**
     * Returns the specified design document.
     *
     * @param designDocName The name of the design document to fetch.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    getDesignDocument(designDocName: string, options?: GetDesignDocumentOptions, callback?: NodeCallback<DesignDocument>): Promise<DesignDocument>;
    /**
     * Creates or updates a design document.
     *
     * @param designDoc The DesignDocument to upsert.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    upsertDesignDocument(designDoc: DesignDocument, options?: UpsertDesignDocumentOptions, callback?: NodeCallback<void>): Promise<void>;
    /**
     * Drops an existing design document.
     *
     * @param designDocName The name of the design document to drop.
     * @param options Optional parameters for this operation.
     * @param callback A node-style callback to be invoked after execution.
     */
    dropDesignDocument(designDocName: string, options?: DropDesignDocumentOptions, callback?: NodeCallback<void>): Promise<void>;
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
    publishDesignDocument(designDocName: string, options?: PublishDesignDocumentOptions, callback?: NodeCallback<void>): Promise<void>;
}
