export function pathLastNode ({path}) {
    let pathParts = path.split("/");
    if (path.endsWith("/")) {
        return pathParts[pathParts.length-2];
    }

    else {
        return pathParts[pathParts.length-1];
    }
    return null;
}

export function pathLastNodeWithoutExtension ({path}) {
    const lastNode = pathLastNode({path: path});
    let lastNodeParts = lastNode.split(".");
    let lastNodeWithoutExtension = "";
    for (let i=0; i < lastNodeParts.length-1; i++) {
        lastNodeWithoutExtension += lastNodeParts[i];
    }
    return lastNodeWithoutExtension;
}

export function joinPath ({path1, path2}) {
    if (path1.endsWith("/")) {
        return path1 + path2;
    }
    else {
        return path1 + "/" + path2;
    }
}