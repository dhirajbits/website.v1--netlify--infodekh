import { TmptSet } from "./TmptSet.js";
import { pathLastNode, joinPath } from "../utility/path.js";
import { getDirectoryRegisterEntries } from "../utility/fetch_file.js";


export class TmptHub {
    constructor ({dirFetchUrl}) {
        this.dirFetchUrl = dirFetchUrl;
        this.tmptSetNameToDirUrl = {};
        this.tmptSetNameToTmptSet = {};
    }

    async zInit () {
        return await this.basicLoad();
    }

    async basicLoad () {
        // Get register entries
        const entries = await getDirectoryRegisterEntries({
            dirUrl: this.dirFetchUrl
        });
        
        // Handle template files
        const tmptSetNameToDirUrl = {};
        for (let rsrcPath of entries) {
            const lastNode = pathLastNode({path: rsrcPath});
            
            if (lastNode.startsWith("set.")) {
                let tmptSetName = lastNode;
                if (tmptSetName.startsWith("set.")) {
                    tmptSetName = tmptSetName.replace("set.", "");
                }

                const fullResourcePath = joinPath({
                    path1: this.dirFetchUrl,
                    path2: rsrcPath
                });
                tmptSetNameToDirUrl[tmptSetName] = fullResourcePath;
            }
        }
        this.tmptSetNameToDirUrl = tmptSetNameToDirUrl;
        await this._loadTmptSets();
    }

    async getTmptByRefId ({tmptRefId}) {
        const [setName, groupName, tmptName] = tmptRefId.split(".");
        const tmptSet = this.tmptSetNameToTmptSet[setName];
        if (tmptSet) {
            return await tmptSet.getTmpt({
                groupName: groupName,
                tmptName: tmptName
            });
        }
    }

    async zGetTmptByRefId ({tmptRefId}) {
        return await this.getTmptByRefId({tmptRefId: tmptRefId});
    }

    getTmptSet ({tmptSetName}) {
        return this.tmptSetNameToTmptSet[tmptSetName];
    }

    getAllTmptSetNames () {
        return Object.keys(this.tmptSetNameToTmptSet);
    }

    async _loadTmptSets () {
        for (let tmptSetName in this.tmptSetNameToDirUrl) {
            const tmptSet = new TmptSet({
                dirFetchUrl: this.tmptSetNameToDirUrl[tmptSetName],
                setName: tmptSetName
            });
            await tmptSet.basicLoad();
            this.tmptSetNameToTmptSet[tmptSetName] = tmptSet;
        }
    }
}