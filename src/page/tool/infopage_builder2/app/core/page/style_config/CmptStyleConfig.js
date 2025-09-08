import { StyleConfigFieldSet } from "./StyleConfigFieldSet.js";


export class CmptStyleConfig {
    constructor ({tmptStyleConfig, cmptIdLikeClassName, configurationDict}) {
        this.cmptIdLikeClassName = null;
        this.styleConfigFieldSet = null;
        this.bodyElmt = null;

        // Assigning variables
        this.cmptIdLikeClassName = cmptIdLikeClassName;

        const styleConfigGeneDict = tmptStyleConfig.styleConfigFieldSet.toGeneDict();
        this.styleConfigFieldSet = StyleConfigFieldSet.fromGeneDict({
            geneDict: styleConfigGeneDict
        });

        this.bodyElmt = this._createBodyElmt();

        // Extra Logic
        this._addDefaultClassNamesToBodyElmt();
        this.configureByConfigurationDict({
            configurationDict: configurationDict
        });
        this.updateBodyElmt();
    }

    updateBodyElmt () {
        const firstLine = `.${this.cmptIdLikeClassName} {\n`;
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

    setFieldValue ({fieldName, value, render}) {
        const r = this.styleConfigFieldSet.setFieldValue({
            fieldName: fieldName,
            value: value
        });
        if (render) {this.updateBodyElmt()}
        return r;
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
            "--cmptstyleconfig--"
        ];
        for (let className of defaultClassNames) {
            this.bodyElmt.classList.add(className);
        }
    }
}