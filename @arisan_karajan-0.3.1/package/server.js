#! /usr/bin/env node

//region 1. Platform Libraries
const request = require('superagent');
//endregion

//region 2. Project Libraries
const Karajan = require('./lib/Karajan.js').default;
//endregion

//region H. Business Helpers
const makeMetadataRequest = key => request
    .get(`http://metadata.google.internal/computeMetadata/v1/project/${key}`)
    .set('Metadata-Flavor', 'Google')
    .buffer();

const makeCustomMetadataRequest = key => makeMetadataRequest(`attributes/${key}`);
//endregion

const karajan = new Karajan();

const configs = {
    heartbeatInterval: makeCustomMetadataRequest('clio-heartbeat-interval'),
    mongoUrl: makeCustomMetadataRequest('clio-mongo-url'),
    projectId: makeMetadataRequest('project-id'),
};

const configKeys = Object.keys(configs);
const configRequests = configKeys.map(key => configs[key]);
Promise
    .all(configRequests)
    .then((responses) => {
        responses.forEach((response, index) => {
            const key = configKeys[index];
            configs[key] = isNaN(response.text) ? response.text : parseInt(response.text, 10);
        });
        karajan.initialize(configs, (err) => {
            if (err) {
                console.log(err.toString());
                throw err;
            }
            karajan.connectToDb((connectToDbErr) => {
                if (connectToDbErr) {
                    throw connectToDbErr;
                }
                karajan.start();
            });
        });
    });
