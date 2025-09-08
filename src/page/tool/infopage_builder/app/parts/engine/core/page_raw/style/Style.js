import { StyleElmt } from "./StyleElmt.js";


export class Style extends StyleElmt{
    constructor ({selector}) {
        super({innerHtml: ""});

        this._selector = selector;
        this._OPENING_BRACKET = "{";
        this._declerationText = "";
        this._CLOSING_BRACKET = "}";

        this._firstLine = "\n" + selector + this._OPENING_BRACKET + "\n";
        this._lastLine = this._CLOSING_BRACKET + "\n";
        this.configurations = {};
    }


    addDeclerations (value, render=false, persistant=true) {
        let newDecrelation = "";
        for (let property in value) {
            newDecrelation += this._generateDeclerationLine({
                property: property,
                value: value[property]
            })
            
            if (persistant) {
                this.configurations[property] = value[property];
            }
        }

        this._declerationText += newDecrelation;
        if (render) {this._render()}
    }


    removeDeclerations (value, render=false, persistant=true) {
        for (let property in value) {
            this._declerationText.replace(this._generateDeclerationLine({
                property: property,
                value: value[property]
            }), "");
            if (persistant) {
                delete this.configurations[property];
            }
        }

        if (render) {this._render()}
    }

    


    toHtmlStr () {
        if (this._declerationText) {
            return this._firstLine + this._declerationText + this._lastLine;
        }
        return "";
    }


    _render() {
        this.bodyElmt.innerHTML = this.toHtmlStr();
    }

    _generateDeclerationLine ({property, value}) {
        return `${property}: ${value};\n`;
    }

}