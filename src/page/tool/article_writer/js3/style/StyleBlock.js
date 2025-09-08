export class StyleBlock {
    constructor ({selector}) {
        this.selector = selector;
        this.blockBodyStr = "";
        this.OPENING_BRACKET = "{";
        this.CLOSING_BRACKET = "}";
    }


    addDeclaration (value) {
        for (let property in value) {
            this.blockBodyStr += `${property}: ${value[property]};\n`;
        }
    }

    
    removeDeclaration (value) {

    }


    toHtmlStr () {

    }

}