export class TmptDefinitionBlob {
    static fromHWD ({}) {}

    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        return this.fromDICT({dict: dict});
    }

    static fromDICT ({dict}) {
        return new TmptDefinitionBlob(dict);
    }

    constructor ({id, body, bodystyle, thumbnail, thumbnailstyle}) {
        this.id = id;
        this.body = body;
        this.bodystyle = bodystyle;
        this.thumbnail = thumbnail;
        this.thumbnailstyle = thumbnailstyle;
    }

    toJSON () {
        return JSON.stringify(this.toDICT());
    }

    toDICT () {
        return {
            id: this.id,
            body: this.body,
            bodystyle: this.bodystyle,
            thumbnail: this.thumbnail,
            thumbnailstyle: this.thumbnailstyle
        };
    }
}