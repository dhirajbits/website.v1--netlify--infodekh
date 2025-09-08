export class TmptDefinitionBlob {
    constructor ({refId, setName, groupName, body, bodystyle, thumbnail, thumbnailstyle, bodystyleconfig, hookstyleconfig}) {
        this.refId = refId || "";
        this.setName = setName || "";
        this.groupName = groupName || "";
        this.body = body || "";
        this.bodystyle = bodystyle || "";
        this.thumbnail = thumbnail || "";
        this.thumbnailstyle = thumbnailstyle || "";
        this.bodystyleconfig = bodystyleconfig || {};
        this.hookstyleconfig = hookstyleconfig || {};
    }
}