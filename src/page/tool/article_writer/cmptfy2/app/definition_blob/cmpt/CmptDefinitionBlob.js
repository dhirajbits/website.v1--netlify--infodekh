import { HookDefinitionBlob } from "./HookDefinitionBlob.js";

export class CmptDefinitionBlob {
    static fromHWD ({}) {}

    static fromJSON ({json}) {
        const dict = JSON.parse(json);
        return this.fromDICT({dict: dict})
    }

    static fromDICT({dict}) {
        return new CmptDefinitionBlob(dict);
    }

    constructor ({cmptName, tmptName, livingScopes, isScopeIsolated, hook, style}) {
        this._cmptName = "";
        this._tmptName = "";
        this._livingScopes = [];
        this._isScopeIsolated = false;
        this._hook = {};
        this._style = {};

        this.cmptName = cmptName;
        this.tmptName = tmptName;
        this.livingScopes = livingScopes;
        this.isScopeIsolated = isScopeIsolated;
        this.hook = hook;
        this.style = style;
    }


    get cmptName() {return this._cmptName;}
    get tmptName() {return this._tmptName;}
    get livingScopes() {return this._livingScopes;}
    get isScopeIsolated() {return this._isScopeIsolated;}
    get hook() {return this._hook;}
    get style() {return this._style;}


    set cmptName(value) {
        if (typeof value === "string") {
            this._cmptName = value;
        }
    }
    set tmptName (value) {
        if (typeof value === "string") {
            this._tmptName = value;
        }
    }
    set livingScopes (value) {
        if (!value) {return null;}
        if (value.length) {
            this._livingScopes = value;
        }
        else {
            this._livingScopes = [];
        }
    }
    set isScopeIsolated (value) {
        if (value) {this._isScopeIsolated = true}
        else {this._isScopeIsolated = false}
    }
    set hook (value) {
        if (typeof value === "object") {
            const hooks = {}
            for (const hookName in value) {
                const hookProps = value[hookName];
                const hookDefBlob = new HookDefinitionBlob({
                    hookName: hookProps.hookName,
                    hookType: hookProps.hookType,
                    definedScopes: hookProps.definedScopes,
                    style: hookProps.style,
                })
                hooks[hookDefBlob.hookName] = hookDefBlob;
            }
            this._hook = hooks;
        }
    }
    set style (value) {
        if (typeof value === "object") {
            this._style = value;
        }
    }


    toJSON () {
        return JSON.stringify(this.toDICT());
    }

    toDICT () {
        const hooksAsDict = {}
        for (let hookName of this.hook) {
            hooksAsDict[hookName] = this.hook[hookName].toDICT()
        }

        return {
            cmptName: this.cmptName,
            tmptName: this.tmptName,
            livingScopes: this.livingScopes,
            isScopeIsolated: this.isScopeIsolated,
            hook: hooksAsDict,
            style: this.style,
        }
    }
}