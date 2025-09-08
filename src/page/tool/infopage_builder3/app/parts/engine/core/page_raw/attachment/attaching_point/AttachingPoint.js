export class AttachingPoint {
	static fromGeneDict({ geneDict, attachingPointLocationRaw }) {
		return new AttachingPoint({
			geneDict: geneDict,
			attachingPointLocationRaw: attachingPointLocationRaw,
		});
	}

	constructor({ attachingPointLocationRaw, geneDict }) {
		if (geneDict) {
			this._constructFromGeneDict({
				geneDict: geneDict,
				attachingPointLocationRaw: attachingPointLocationRaw,
			});
		}

		// DEFINING PROPERTIES
		else {
			this.location = attachingPointLocationRaw; // AttachingPointLocationRaw
			this.isAttached = false; // Boolean
			this.attachedAttacherLocCmptRawRefId = ""; // String
			this.attachedAttacherLocHookName = ""; // String
			this.attachedAtIndex = 0; // Integer
		}
	}

	resetAttachmentProps(index = false) {
		this.isAttached = false; 
      this.attachedAttacherLocCmptRawRefId = ""; 
      this.attachedAttacherLocHookName = "";
		if (index) this.attachedAtIndex = 0;
	}

	toGeneDict() {
		return {
			isAttached: this.isAttached,
			attachedAttacherLocCmptRawRefId:
				this.attachedAttacherLocCmptRawRefId,
			attachedAttacherLocHookName: this.attachedAttacherLocHookName,
			attachedAtIndex: this.attachedAtIndex,
		};
	}

	_constructFromGeneDict({ geneDict, attachingPointLocationRaw }) {
      this.location = attachingPointLocationRaw;
      this.isAttached = geneDict.isAttached || false;
      this.attachedAttacherLocCmptRawRefId = geneDict.attachedAttacherLocCmptRawRefId || "";
      this.attachedAttacherLocHookName = geneDict.attachedAttacherLocHookName || "";
      this.attachedAtIndex = geneDict.attachedAtIndex || 0;
   }
}
