import {V1ConfigMap, V1DaemonSet, V1Deployment, V1Pod, V1Secret, V1Service} from "@kubernetes/client-node";

class K8sResourceError extends Error {
    constructor(msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, K8sResourceError.prototype);
    }
}

interface IK8sResource {
    apiVersion: string;
    kind: K8sResourceKind;
}

enum K8sResourceKind {
    Deployment = 'Deployment',
    Service = 'Service',
    ConfigMap = 'ConfigMap',
    DaemonSet = 'DaemonSet',
    Secret = 'Secret',
    Pod = 'Pod',
}

function decodeK8sResource(doc: unknown) {
    if (!isValidK8sResource(doc)) {
        throw new K8sResourceError("Invalid Resource Definition: missing Kind")
    }

    switch ((doc as IK8sResource).kind) {
        case K8sResourceKind.Deployment: return doc as V1Deployment;
        case K8sResourceKind.Service:    return doc as V1Service;
        case K8sResourceKind.ConfigMap:  return doc as V1ConfigMap;
        case K8sResourceKind.Pod:        return doc as V1Pod;
        case K8sResourceKind.Secret:     return doc as V1Secret;
        case K8sResourceKind.DaemonSet:  return doc as V1DaemonSet;

        // TODO: add more kinds
    }

    throw new K8sResourceError("Unknown Resource: unsupported Kind")
}

function isValidK8sResource(doc: unknown): boolean {
    return typeof doc === 'object' && doc !== null && 'kind' in doc
}

export { decodeK8sResource }