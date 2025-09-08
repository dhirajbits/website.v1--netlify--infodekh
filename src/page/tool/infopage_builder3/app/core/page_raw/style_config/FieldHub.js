import { Color } from "./style_field/Color.js"; 


export class FieldHub {
    static fieldNameToFieldClass = {
        [Color.fieldName] : Color,
    }

    static getFieldClass ({fieldName}) {
        return this.fieldNameToFieldClass[fieldName];
    }
}