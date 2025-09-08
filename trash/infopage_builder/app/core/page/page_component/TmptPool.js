export class TmptPool {
    static fromDICT ({tmptPoolDict, tmpthub}) {
        if (!tmptPoolDict) {tmptPoolDict = {}}
        let tmptsets = tmptPoolDict.tmptsets;
        if (!tmptsets) {tmptsets = []}
        return new TmptPool({tmptsets, tmpthub});
    }

    constructor ({tmptsets, tmpthub}) {
        this.tmptsets = tmptsets;
        this.tmpthub = tmpthub;
    }

    toDICT () {
        return {
            tmptsets: this.tmptsets
        };
    }

    getTmptSet ({tmptSetName}) {
        if (tmptSetName in this.tmptsets) {
            return this.tmpthub.getTmptSet({
                tmptSetName: tmptSetName
            });
        }
    }

    async getTmptByRefId ({refId}) {
        const setName = refId.split(".")[0];
        if (this.tmptsets.includes(setName)) {
            return await this.tmpthub.getTmptByRefId({tmptRefId: refId});
        }
        return null;
    }

    async zGetTmptByRefId ({refId}) {
        return await this.getTmptByRefId({refId: refId});
    }

    async getAllTmpts () {
        const refIdToTmpt = {};
        for (let tmptSetName of this.tmptsets) {
            const tmptsetObj = this.tmpthub.getTmptSet({
                tmptSetName: tmptSetName
            });
            const _refIdToTmpt = await tmptsetObj.getAllTmptsInRefIdToTmptFormat({
            });
            for (let refId in _refIdToTmpt) {
                refIdToTmpt[refId] = _refIdToTmpt[refId];
            }
        }
        return refIdToTmpt;
    }

    async zGetAllTmpts () {
        return await this.getAllTmpts();
    }
}