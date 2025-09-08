import { FieldHub } from "./FieldHub.js";



export class StyleConfigFieldSet {
    
    static fromGeneDict ({geneDict}) {
        /* 
        geneDict = {
            "fieldName": {
                "value": "something",
                "possibleValue": ["v1", "v2"] / ["*"/null (all possible value]
            }
        } 
        */
        return new StyleConfigFieldSet({
            geneDict: geneDict
        });
    }

    constructor ({fields, geneDict}) {
        this.fieldNameToField = {};

        if (geneDict) {
            this._loadFieldsFromGeneDict({geneDict: geneDict})
        }

        else if (fields) {
            this._loadFieldsFromFieldNameList({fieldNameList: fields});
        }
    }

    getFieldValue ({fieldName}) {
        const field = this.fieldNameToField[fieldName];
        return field.value;
    }

    setFieldValue ({fieldName, value}) {
        const field = this.fieldNameToField[fieldName];
        if (field) {
            field.value = value;
        }
    }

    getFieldObj ({fieldName}) {
        return this.fieldNameToField[fieldName];
    }

    getAllFieldNames () {
        return Object.keys(this.fieldNameToField);
    }

    getAllAvailableFieldNames () {
        return Object.keys(FieldHub.fieldNameToFieldClass);
    }

    getStyleDeclerationText () {
        let declerationText = "";
        for (let fieldName in this.fieldNameToField) {
            const field = this.fieldNameToField[fieldName];
            declerationText += field.getStyleDeclerationText() + "\n";
        }
        return declerationText.trim();
    }

    toGeneDict () {
        const geneDict = {}
        for (let fieldName in this.fieldNameToField) {
            geneDict[fieldName] = this.fieldNameToField[fieldName].toGeneDict();
        }
        return geneDict;
    }


    _loadFieldsFromFieldNameList ({fieldNameList}) {
        for (let fieldName of fieldNameList) {
            const fieldClass = FieldHub.getFieldClass({
                fieldName: fieldName
            });

            const fieldObj = new fieldClass({});
            this.fieldNameToField[fieldName] = fieldObj;
        }
    }

    _loadFieldsFromGeneDict ({geneDict}) {
        for (let fieldName in geneDict) {
            const fieldClass = FieldHub.getFieldClass({
                fieldName: fieldName
            });
            const fieldObj = fieldClass.fromGeneDict({
                geneDict: geneDict[fieldName]
            });
            this.fieldNameToField[fieldName] = fieldObj;
        }
    }
}
















// export class StyleConfigFieldSet {
//     static fromDICT ({dict}) {
//         return new StyleConfigFieldSet({dict: dict});
//     }
    

//     // fields = ["fieldName", "fieldName2"]
//     /* dict = {
//         "fieldName" : {
//             value: "something",
//             possibleValue: ["v1", "v2"] / "*" (all value) / null (all value)
//         }
//     } */
//     constructor ({fields, dict}) {
//         this.fieldNameToField = {};

//         let fieldObjs = null;
//         if (dict) {
//             fieldObjs = Utility.getFieldClassObjectsFromDict({
//                 fieldNameToConfig: dict
//             });
//         }
//         else if (fields) {
//             fieldObjs = Utility.getFieldClassObjects ({
//                 fields: fields
//             });
//         }

//         if (fieldObjs) {
//             for (let fieldObj of fieldObjs) {
//                 this.fieldNameToField[fieldObj.fieldName] = fieldObj;
//             }
//         }
//     }

//     toDICT () {
//         const fieldNameToConfig = {}

//         for (let fieldName in this.fieldNameToField) {
//             fieldNameToConfig[fieldName] = this.fieldNameToField[field].toDICT();
//         }
//         return fieldNameToConfig;
//     }

//     get ({fieldName}) {
//         return this.fieldNameToField[fieldName];
//     }

//     remove ({fieldName}) {
//         const field = this.fieldNameToField[fieldName];
//         if (field) {
//             delete this.fieldNameToField[fieldName];
//         }
//         return field;
//     }
    
// }

// class Utility {
//     static fieldNameToFieldClass = {
//         [Color.fieldName]: Color,

//     };

//     static getFieldClasses ({fields}) {
//         const fieldClasses = [];
//         for (let field of fields) {
//             if (field in Utility.fieldNameToFieldClass) {
//                 fieldClasses.push(Utility.fieldNameToFieldClass[field])
//             };
//         }
//         return fieldClasses;
//     }

//     static getFieldClassObjects ({fields}) {
//         const fieldClasses = Utility.getFieldClasses({fields: fields});
//         const fieldClassObjects = []
        
//         for (let fieldClass of fieldClasses) {
//             const fieldClassObject = new fieldClass()
//             fieldClassObjects.push(fieldClassObject);
//         }

//         return fieldClassObjects;
//     }

//     static getFieldClassObjectsFromDict ({fieldNameToConfig}) {
//         const fieldClasses = Utility.getFieldClasses({
//             fields: Object.keys(fieldNameToConfig)
//         });

//         const fieldClassObjects = [];
//         for (let fieldClass of fieldClasses) {
//             const fieldClassObject = new fieldClass ({
//                 value: fieldNameToConfig[fieldClass.fieldName].value,
//                 possibleValue: fieldNameToConfig[fieldClass.fieldName].possibleValue
//             });
//             fieldClassObjects.push(fieldClassObject);
//         }

//         return fieldClassObjects;
//     }
// }