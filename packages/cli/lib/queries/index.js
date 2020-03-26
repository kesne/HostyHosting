"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var ContainerSize;
(function (ContainerSize) {
    ContainerSize["S1x1"] = "S1x1";
    ContainerSize["S2x2"] = "S2x2";
    ContainerSize["S4x4"] = "S4x4";
    ContainerSize["S8x8"] = "S8x8";
    ContainerSize["S16x16"] = "S16x16";
})(ContainerSize = exports.ContainerSize || (exports.ContainerSize = {}));
var DeploymentStrategy;
(function (DeploymentStrategy) {
    DeploymentStrategy["Replace"] = "REPLACE";
    DeploymentStrategy["Recreate"] = "RECREATE";
})(DeploymentStrategy = exports.DeploymentStrategy || (exports.DeploymentStrategy = {}));
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.CreateApiKeyRequest = graphql_tag_1.default `
    mutation CreateAPIKeyRequest {
  createAPIKeyRequest
}
    `;
exports.GetApiKeyFromRequest = graphql_tag_1.default `
    query GetAPIKeyFromRequest($uuid: String!) {
  getAPIKeyFromRequest(uuid: $uuid)
}
    `;
