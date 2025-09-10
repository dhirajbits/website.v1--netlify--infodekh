import { TmptHWD } from "./TmptHWD.js";
import { TmptGroup } from "./TmptGroup.js";
import { getDirectoryRegisterEntries } from "../utility/fetch_file.js";
import { joinPath, pathLastNode, pathLastNodeWithoutExtension } from "../utility/path.js";


export class TmptSet {
    constructor ({dirFetchUrl, setName}) {
        this.dirFetchUrl = dirFetchUrl;
        this.setName = setName;
        this.tmptNameToFileUrl = {};
        this.tmptNameToTmpt = {};
        this.tmptGroupNameToGroup = {};
    }

    async zInit () {
        return await this.basicLoad();
    }

    async basicLoad () {
        // Get register entries
        const entries = await getDirectoryRegisterEntries({
            dirUrl: this.dirFetchUrl
        });
        
        // Handle paths (entry) in register
        const fileNameToUrl = {};
        const groupNameToDirUrl = {}
        for (let rsrcPath of entries) {
            const lastNode = pathLastNode({path: rsrcPath});
            
            if (lastNode.endsWith(".html")) {
                // Handle template files
                const tmptName = pathLastNodeWithoutExtension({
                    path: rsrcPath
                });
                const resourceFullPath = joinPath({
                    path1: this.dirFetchUrl,
                    path2: rsrcPath
                })
                fileNameToUrl[tmptName] = resourceFullPath;
            }
            
            else {
                // Handle template group
                let groupName = pathLastNode({
                    path: rsrcPath
                });
                if (groupName.startsWith("group.")) {
                    groupName = groupName.replace("group.", "");
                }
                const resourceFullPath = joinPath({
                    path1: this.dirFetchUrl,
                    path2: rsrcPath
                });
                groupNameToDirUrl[groupName] = resourceFullPath;
            }
        }
        this.tmptNameToFileUrl = fileNameToUrl;
        
        // Loading template groups
        await this._loadTmptGroups({
            groupNameToDirUrl: groupNameToDirUrl
        });
    }

    async getTmpt ({groupName, tmptName}) {
        // Handle template retrival from group
        if (groupName) {
            if (groupName in this.tmptGroupNameToGroup) {
                return await this.tmptGroupNameToGroup[groupName].getTmpt({
                    tmptName: tmptName
                });
            }
        }
        // Handle ungrouped template retrival
        else {
            if (tmptName in this.tmptNameToTmpt) {
                return this.tmptNameToTmpt[tmptName];
            }
            const tmpt = await this._createTmptFromDefinitionFileUrl({
                fileUrl: this.tmptNameToFileUrl[tmptName]
            });
            this.tmptNameToTmpt[tmptName] = tmpt;
            return tmpt;
        }
    }

    async zGetTmpt () {
        return await this.getTmpt();
    }

    async getAllTmptsInRefIdToTmptFormat () {
        const directTmptNames = this.getAllTmptNames();
        const groupNames = this.getAllGroupNames();

        const refIdToTmpt = {};

        // Adding directTmpt
        for (let tmptName of directTmptNames) {
            const tmpt = await this.getTmpt({groupName: "", tmptName: tmptName});
            refIdToTmpt[tmpt.refId] = tmpt;
        }
        // Adding templated from group
        for (let groupName of groupNames) {
            const tmptGroup = this.getGroup({groupName: groupName});
            const tmptNames = tmptGroup.getAllTmptNames();
            for (let tmptName of tmptNames) {
                const tmpt = await tmptGroup.getTmpt({tmptName: tmptName});
                refIdToTmpt[tmpt.refId] = tmpt;
            }
        }
        return refIdToTmpt;
    }

    async zGetAllTmptsInRefIdToTmptFormat () {
        return await this.getAllTmptsInRefIdToTmptFormat();
    }

    getAllTmptNames () {
        return Object.keys(this.tmptNameToFileUrl);
    }

    getGroup ({groupName}) {
        return this.tmptGroupNameToGroup[groupName];
    }

    getAllGroupNames () {
        return Object.keys(this.tmptGroupNameToGroup);
    }

    async _loadTmptGroups ({groupNameToDirUrl}) {
        const groupNameToTmptGroup = {};
        for (let groupName in groupNameToDirUrl) {
            const dirUrl = groupNameToDirUrl[groupName];
            const tmptGroup = new TmptGroup({
                dirFetchUrl: dirUrl,
                groupName: groupName,
                setName: this.setName,
            });
            await tmptGroup.basicLoad();
            groupNameToTmptGroup[groupName] = tmptGroup;
        }
        this.tmptGroupNameToGroup = groupNameToTmptGroup;
    }

    async _createTmptFromDefinitionFileUrl ({fileUrl}) {
        const tmptHWD = new TmptHWD({
            fileUrl: fileUrl,
            setName: this.setName,
            groupName: ""
        });
        await tmptHWD.load();
        return tmptHWD.toTmpt();
    }
}