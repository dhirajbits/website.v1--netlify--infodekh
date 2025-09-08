import { StyleConfigField } from "./StyleConfigField.js";


export class Color extends StyleConfigField {
    static fieldName = "color";
    static possibleValues = ["white", "black", "red"];

    static fromGeneDict ({geneDict}) {
        return new Color(geneDict);
    }

    constructor ({value, possibleValues}) {
        super();

        this._possibleValues = this._getPossibleValues({
            givenPossibleValues: possibleValues,
            possibleValues: Color.possibleValues
        });
        
        this._value = this._possibleValues[0] || Color.possibleValues[0];
        this.value = value;
    }


    get fieldName () {return Color.fieldName;}
    get value () {return this._value;}
    get possibleValues() {return this._possibleValues;}
    
    set value (value) {
        if (this._possibleValues.includes(value)) {
            this._value = value;
        }
    }

    getStyleDeclerationDict () {
        const valueToStyleValue = {
            "white": "#ffffff",
            "black": "#000000",
            "red": "#ff0000",
        }
        
        const declerationDict = {};
        declerationDict[this.fieldName] = valueToStyleValue[this._value];
        return declerationDict;
    }

    getStyleDeclerationText () {
        const declerationDict = this.getStyleDeclerationDict();
        let declerationText = "";
        for (let fieldName in declerationDict) {
            declerationText += `${fieldName}: ${declerationDict[fieldName]};` + "\n";
        }
        return declerationText.trim();
    }

    toGeneDict () {
        return {
            value: this._value,
            possibleValues: this._possibleValues
        };
    }


}