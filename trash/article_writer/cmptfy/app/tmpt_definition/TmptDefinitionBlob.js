export class TmptDefinitionBlob {
    
    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        return new TmptDefinitionBlob(dict);
    }

    constructor ({body, bodystyle, thumbnail, thumbnailstyle}) {
        this.body = body;
        this.bodystyle = bodystyle;
        this.thumbnail = thumbnail;
        this.thumbnailstyle = thumbnailstyle;
    }

    toJSON () {
        return JSON.stringify({
            body: this.body,
            bodystyle: this.bodystyle,
            thumbnail: this.thumbnail,
            thumbnailstyle: this.thumbnailstyle
        });
    }
}