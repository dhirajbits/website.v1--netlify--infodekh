export class TemplateDefinitionBlob {
    constructor({body, preview, reader}) {
        this.body = body; //string (htmlcode)
        this.preview = preview; //string (htmlcode)
        this.reader = reader; //string
    }
}