import { IllegalHookAttachmentError } from "../error/IllegalHookAttachmentError.js";
import { CmptNodeHookAttachingError } from "../error/CmptNodeHookAttachingError.js";
import { insertItemAtIndexInArray } from "../../utility/array.js";

export class CmptNodeHookAttacher {
	constructor({ cmpt, hookName }) {
		this.cmpt = cmpt; // Cmpt
		this.cmptHook = cmpt.hookNameToHook[hookName]; // CmptHook

		this.hookType = this.cmptHook.type; // String
		this.isAttached = false; // Boolean
		this.attachedToCmptNode = null; // Cmpt
		this.attachedToText = null; // String
		this.attachedToHtml = null; // String
		this.attachedToCmptNodeList = []; // Array [Cmpt]
	}

	attachTo({ value }) {}

	attachToCmptNode({ cmptNode }, deep = true) {
		if (this.hookType !== "cmpt") return this._illegalHookAttachment();

		// Updating cmpt hook
		if (deep) {
			let error = this.cmptHook.attachToCmpt({ cmpt: cmptNode.cmpt });
			if (error) this._hookAttachingError();
		}

		// Updating cmpt node attachment props
		this._resetAttachmentProps();
		this.attachedToCmptNode = cmptNode;
		this.isAttached = true;
	}

	attachToText({ text }, deep = true) {
		if (this.hookType !== "data") return this._illegalHookAttachment();

		// Updating cmpt hook
		if (deep) {
			const error = this.cmptHook.attachToText({
				text: text,
			});
			if (error) this._hookAttachingError();
		}

		// Updating CmptNode hook attachment
		this._resetAttachmentProps();
		this.attachedToText = text;
		this.isAttached = true;
	}

	attachToHtml({ html }, deep = true) {
		if (this.hookType !== "html") return this._illegalHookAttachment();

		// Updating cmpt hook
		if (deep) {
			const error = this.cmptHook.attachToHtml({
				html: html,
			});
			if (error) this._hookAttachingError();
		}

		// Updating CmptNode hook attachment
		this._resetAttachmentProps();
		this.attachedToHtml = html;
		this.isAttached = true;
	}

	attachACmptNode({ cmptNode }, deep = true) {
		if (this.hookType !== "cmptlist") return this._illegalHookAttachment();

		// Updating cmpt hook
		if (deep) {
			let error = this.cmptHook.attachACmpt({ cmpt: cmptNode.cmpt });
			if (error) this._hookAttachingError();
		}

		// Updating - attaching cmptNode (index of attaching inside cmptlist )
		// ... it will done by deeper cmpt object
		if (!deep) {
			if (cmptNode.attacher.attachedAtIndex < 0) 
            cmptNode.attacher.attachedAtIndex = 0;
			
         if (cmptNode.attacher.attachedAtIndex >= this.attachedToCmptList.length)
				cmptNode.attacher.attachedAtIndex = this.attachedToCmptList.length;
		}

      else {
         cmptNode.attacher.attachedAtIndex = cmptNode.cmpt.attachedAtIndex;
      }

		// Updating cmpt node attachment props
		const oldAttachedCmpts = this.attachedToCmptList;
		this._resetAttachmentProps();
		this.attachedToCmptList = insertItemAtIndexInArray({
			index: cmpt.attachedAtIndex,
			item: cmpt,
			arr: oldAttachedCmpts,
		});
		this.isAttached = true;

		// Updating each attached cmpt (index of attachemnt)
		for (let i = 0; i < this.attachedToCmptList; i++) {
         const cmpt = this.attachedToCmptList[i];
         cmpt.attachedAtIndex = i;
      }
	}

	_resetAttachmentProps() {
		this.isAttached = false;
		this.attachedToCmpt = null;
		this.attachedToText = null;
		this.attachedToHtml = null;
		this.attachedToCmptList = [];
	}

	_illegalHookAttachment(msg) {
		if (!msg) msg = "Illegal Hook attachment opration.";
		throw new IllegalHookAttachmentError(msg);
	}

	_hookAttachingError(msg) {
		if (!msg) msg = "Error in Attaching hook.";
		CmptNodeHookAttachingError(msg);
	}
}
