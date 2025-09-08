import { insertItemAtIndexInArray } from "../../utility/array.js";
import { CmptHook3__withStyleConfig } from "./CmptHook3__withStyleConfig.js";


export class CmptHook4__withAttachments extends CmptHook3__withStyleConfig {
    constructor ({attachmentsDict, styleConfigDict, styleDeclerationDict, tmptHook, elmt, id, idLikeClassName, base}) {
        if (!attachmentsDict) {attachmentsDict = {}}
        super({
            styleConfigDict: styleConfigDict,
            styleDeclerationDict: styleDeclerationDict,
            tmptHook: tmptHook,
            elmt: elmt,
            id: id,
            idLikeClassName: idLikeClassName,
            base: base
        });

        this.attachments = null;
        /* hookType: typeof(attachments)
        cmpt: string (cmpt.refId)
        data: string (text)
        grab: null
        html: string (html code)
        cmptlist: [string, string] (string-> cmpt.refId)
        */
        this.isAttached = false;

        this.attachedCmptRefIds = [] // When hook type is cmptlist
        this.attachedCmpts = [];

        this.attachedCmptRefId = null; // When hook type is cmpt
        this.attachedCmpt = null  // When hook type is cmpt
        
        this.attachedText = null  // When hook type is data
        this.attachedHtml = null  // When hook type is html 


        // Assigning properties
        this.isAttached = attachmentsDict.isAttached || false;
        this.attachedCmptRefIds = attachmentsDict.attachedCmptRefIds || [];
        this.attachedCmptRefId = attachmentsDict.attachedCmptRefId || [];
        this.attachedText = attachmentsDict.attachedText || "";
        this.attachedHtml = attachmentsDict.attachedHtml || "";
    }

    toGeneDict () {
        const geneDict = super.toGeneDict();
        geneDict["attachmentsDict"] = {
            isAttached: this.isAttached,
            attachedCmptRefIds: this.attachedCmptRefId,
            attachedCmptRefId: this.attachedCmptRefId,
            attachedText: this.attachedText,
            attachedHtml: this.attachedHtml
        }
        return geneDict;
    }

    attach ({value}) {
        switch (this.type) {
            case "cmpt":
                return this.attachCmpt({cmpt: value});
                break;
            case "data":
                return this.attachData({text: value});
                break;
            case "grab":
                throw new Error("Can't attach to 'grab' type core-cmpthook.")
                break;
            case "html":
                return this.attachHtml({htmlCode: value});
                break;
            case "cmptlist":
                return this.attachCmptInCmptList({cmpt: value});
                break;
            default:
                throw new Error(`Undefined core-cmpthook type: '${this.type}.`);
        }
    }

    attachCmpt ({cmpt}) {
        // Updating hook attachment-properties
        // this.attachments = cmpt.refId;
        this.isAttached = true;
        this.attachedCmptRefId = cmpt.refId;
        this.attachedCmpt = cmpt;

        // Updating hook bodyElmt
        this.bodyElmt.appendChild(cmpt.bodyElmt);

        // Updating cmpt attachment-properties
        cmpt.attachedToCmptRefId = this.base.refId;
        cmpt.attachedToCmpt = this.base;

        cmpt.attachedToHookName = this.name;
        cmpt.attachedToHook = this;

        cmpt.attachedToHookAtIndex = null;
    }

    attachData ({text}) {
        if (typeof(text) !== "string") {text = ""}
        
        // Updating hook attachment-properties
        // this.attachments = text;
        this.isAttached = true;
        this.attachedText = text;

        // Updating hook bodyElmt
        this.bodyElmt.textContent = text;
    }


    attachHtml ({htmlCode}) {
        if (typeof(htmlCode) !== "string") {htmlCode = ""}
        
        // Updating hook attachment-properties
        // this.attachments = htmlCode;
        this.isAttached = true;
        this.attachedHtml = htmlCode;

        // Updating hook bodyElmt
        this.bodyElmt.innerHTML = htmlCode;
    }

    attachCmptInCmptList ({cmpt}) {
        // Checking for this.attchedCmpt filling status
        if (this.attachedCmptRefIds.length !== this.attachedCmpts.length) {
            throw new Error("core-cmpt attachedCmpt is not filled a/c to reference ids in this.attachments.")
        }

        // Updating hook attachment-properties
        this.attachedCmptRefIds = insertItemAtIndexInArray({
            index: cmpt.attachToHookAtIndex,
            item: cmpt.refId,
            arr: this.attachedCmptRefIds
        });

        this.attachedCmpts = insertItemAtIndexInArray({
            index: cmpt.attachedToHookAtIndex,
            item: cmpt,
            arr: this.attachedCmpts
        });
        
        // Updating all attached cmpt attachingIndex
        for (let i=0; i < this.attachedCmpts.length; i++) {
            this.attachedCmpts[i].attachedToHookAtIndex = i;
        }

        // Updating cmpt attaching-properties
        cmpt.attachedToCmptRefId = this.base.refId;
        cmpt.attachedToCmpt = this.base;

        cmpt.attachedToHookName = this.name;
        this.attachedToHook = this;

        // Updating hook bodyElmt
        this.bodyElmt.innerHtml = "";
        for (let cmpt in this.attachedCmpts) {
            cmpt.fitInsideElmt(this.bodyElmt);
        }
    }

    detach ({value}) {
        switch (this.type) {
            case "cmpt":
                return this.detachCmpt({cmpt: value});
                break;
            case "data":
                return this.detachData({text: value});
                break;
            case "grab":
                throw new Error("Can't detach from 'grab' type core-cmpthook.")
                break;
            case "html":
                return this.detachHtml({htmlCode: value});
                break;
            case "cmptlist":
                return this.detachCmptInCmptList({cmpt: value});
                break;
            default:
                throw new Error(`Undefined core-cmpthook type: '${this.type}.`);
        }
    }
    
    detachCmpt ({cmpt}) {
        if (cmpt.refId !== this.attachedCmptRefId) {return ;}
        
        // Updating hook attachment-properties
        this.isAttached = false;
        this.attachedCmptRefId = null;
        this.attachedCmpt = null;

        // Updating hook bodyElmt
        try{
            this.bodyElmt.removeChild(cmpt.bodyElmt);
        } catch {}

        // Updating cmpt attachment-properties
        cmpt.attachedToCmptRefId = null;
        cmpt.attachedToCmpt = null;

        cmpt.attachedToHookName = null;
        cmpt.attachedToHook = null;

        cmpt.attachedToHookAtIndex = null;
    }

    detachData ({text}) {
        if (typeof(text) !== "string") {text = ""}
        if (text !== this.attachedText) {return;}
        
        // Updating hook attachment-properties
        this.isAttached = false;
        this.attachedData = null;


        // Updating hook bodyElmt
        this.bodyElmt.textContent = "";
    }

    detachHtml ({htmlCode}) {
        if (typeof(htmlCode) !== "string") {htmlCode = ""}
        if (htmlCode !== this.attachedHtml) {return;}

        // Updating hook attachment-properties
        this.isAttached = false;
        this.attachedHtml = null;

        // Updating hook bodyElmt
        this.bodyElmt.innerHTML = "";
    }

    detachCmptInCmptList ({cmpt}) {
        // Checking for this.attchedCmpt filling status
        if (this.attachedCmptRefIds.length !== this.attachedCmpts.length) {
            throw new Error("core-cmpt attachedCmpt is not filled a/c to reference ids in this.attachments.")
        }

        if (!cmpt in this.attachedCmpts) {return;}

        // Updating hook attachment-properties
        this.attachedCmptRefId = this.attachments.filter(
            cmptRefId => cmptRefId !== cmpt.refId
        )

        this.attachedCmpts = this.attachedCmpts.filter(
            attachedCmpt => attachedCmpt !== cmpt
        )
        
        // Updating all attached cmpt attachingIndex
        for (let i=0; i < this.attachedCmpts.length; i++) {
            this.attachedCmpts[i].attachedToHookAtIndex = i;
        }

        // Updating cmpt attaching-properties
        cmpt.attachedToCmptRefId = null;
        cmpt.attachedToCmpt = null;

        cmpt.attachedToHookName = null;
        cmpt.attachedToHook = null;

        // Updating hook bodyElmt
        this.bodyElmt.innerHtml = "";
        for (let cmpt in this.attachedCmpts) {
            cmpt.fitInsideElmt(this.bodyElmt);
        }
    }
}