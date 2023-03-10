"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcbVersion = exports.connect = void 0;
const binding_1 = __importDefault(require("./binding"));
const cluster_1 = require("./cluster");
/**
 * Acts as the entrypoint into the rest of the library.  Connecting to the cluster
 * and exposing the various services and features.
 *
 * @param connStr The connection string to use to connect to the cluster.
 * @param options Optional parameters for this operation.
 * @param callback A node-style callback to be invoked after execution.
 *
 * @category Core
 */
async function connect(connStr, options, callback) {
    return cluster_1.Cluster.connect(connStr, options, callback);
}
exports.connect = connect;
/**
 * Exposes the underlying libcouchbase library version that is being used by the
 * SDK to perform I/O with the cluster.
 */
exports.lcbVersion = binding_1.default.lcbVersion;
__exportStar(require("./analyticsindexmanager"), exports);
__exportStar(require("./analyticstypes"), exports);
__exportStar(require("./authenticators"), exports);
__exportStar(require("./binarycollection"), exports);
__exportStar(require("./bucket"), exports);
__exportStar(require("./bucketmanager"), exports);
__exportStar(require("./cluster"), exports);
__exportStar(require("./collection"), exports);
__exportStar(require("./collectionmanager"), exports);
__exportStar(require("./crudoptypes"), exports);
__exportStar(require("./datastructures"), exports);
__exportStar(require("./diagnosticstypes"), exports);
__exportStar(require("./errorcontexts"), exports);
__exportStar(require("./errors"), exports);
__exportStar(require("./eventingfunctionmanager"), exports);
__exportStar(require("./generaltypes"), exports);
__exportStar(require("./logging"), exports);
__exportStar(require("./metrics"), exports);
__exportStar(require("./mutationstate"), exports);
__exportStar(require("./queryindexmanager"), exports);
__exportStar(require("./querytypes"), exports);
__exportStar(require("./scope"), exports);
__exportStar(require("./sdspecs"), exports);
__exportStar(require("./searchfacet"), exports);
__exportStar(require("./searchindexmanager"), exports);
__exportStar(require("./searchquery"), exports);
__exportStar(require("./searchsort"), exports);
__exportStar(require("./searchtypes"), exports);
__exportStar(require("./streamablepromises"), exports);
__exportStar(require("./tracing"), exports);
__exportStar(require("./transcoders"), exports);
__exportStar(require("./usermanager"), exports);
__exportStar(require("./viewexecutor"), exports);
__exportStar(require("./viewindexmanager"), exports);
__exportStar(require("./viewtypes"), exports);
