/* Have to edit */

import { StyleConfigFieldSet } from "./StyleConfigFieldSet.js";


export class HookStyleConfig {
    constructor ({tmptHookStyleConfig, hookIdLikeClassName, configurationDict}) {
        this.hookIdLikeClassName = null;
        this.styleConfigFieldSet = null;
        this.bodyElmt = null;

        // Assigning variables
        this.hookIdLikeClassName = hookIdLikeClassName;

        const styleConfigGeneDict = tmptHookStyleConfig.styleConfigFieldSet.toGeneDict();
        this.styleConfigFieldSet = StyleConfigFieldSet.fromGeneDict({
            geneDict: styleConfigGeneDict
        });

        this.bodyElmt = this._createBodyElmt();

        // Extra Logic
        this._addDefaultClassNamesToBodyElmt();
    }

    updateBodyElmt () {
        const firstLine = `.${this.hookIdLikeClassName} {\n`;
        const lastLine = `}\n`;
        const middlePartOfDeclerationBlock = this.styleConfigFieldSet.getStyleDeclerationText();

        const declerationBlockText = firstLine + middlePartOfDeclerationBlock + lastLine;
        this.bodyElmt.innerHTML = declerationBlockText;
    }

    getFieldValue ({fieldName}) {
        return this.styleConfigFieldSet.getFieldValue({
            fieldName: fieldName
        });
    }

    getFieldPossibleValues ({fieldName}) {
        return this.styleConfigFieldSet.getFieldPossibleValues({
            fieldName: fieldName
        });
    }

    setFieldValue ({fieldName, value}) {
        return this.styleConfigFieldSet.setFieldValue({
            fieldName: fieldName,
            value: value
        });
    }

    getAllFieldNames () {
        return this.styleConfigFieldSet.getAllFieldNames();
    }
    
    getConfigurationDict () {
        const configuration = {};
        const geneDict = this.styleConfigFieldSet.toGeneDict()
        for (let fieldName in geneDict) {
            configuration[fieldName] = geneDict[fieldName].value;
        }
        return configuration;
    }
    
    configureByConfigurationDict ({configurationDict}) {
        for (let fieldName in configurationDict) {
            this.styleConfigFieldSet.setFieldValue({
                fieldName: fieldName,
                value: configurationDict[fieldName]
            });
        }
    }

    _createBodyElmt () {
        return document.createElement("style");
    }

    _addDefaultClassNamesToBodyElmt () {
        const defaultClassNames = [
            "--cmpthookstyleconfig--"
        ];
        for (let className of defaultClassNames) {
            this.bodyElmt.classList.add(className);
        }
    }
}