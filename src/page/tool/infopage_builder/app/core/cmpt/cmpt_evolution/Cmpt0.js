export class Cmpt0 {
	constructor({ id, refId, styleId, idLikeClassName, nickname }) {
		this.id = null;
		this.refId = null;
		this.styleId = null;
		this.idLikeClassName = null;
		this.nickname = nickname || "unnamed";

		this.id = id || IdUtility.getUniqueId();
		this.refId = refId || this._generateNewRefId();
		this.styleId = styleId || this._generateNewStyleId();
		this.idLikeClassName =
			idLikeClassName || this._genereateIdLikeClassName();
	}

	toDICT() {
		return {
			id: this.id,
			refId: this.refId,
			styleId: this.styleId,
			idLikeClassName: this.idLikeClassName,
			nickname: this.nickname,
		};
	}

	toGeneDict() {
		return {
			id: this.id,
			refId: this.refId,
			styleId: this.styleId,
			idLikeClassName: this.idLikeClassName,
			nickname: this.nickname,
		};
	}

	_generateNewRefId() {
		return `--cmpt--refId${this.id}--`;
	}

	_generateNewStyleId() {
		return `--cmpt--styleId${this.id}--`;
	}

	_genereateIdLikeClassName() {
		return `--cmpt--idLikeClassName${this.id}--`;
	}
}

class IdUtility {
	static counter = 0;

	static getUniqueId() {
		this.counter += 1;
		return `${Date.now()}${this.counter}`;
	}
}
