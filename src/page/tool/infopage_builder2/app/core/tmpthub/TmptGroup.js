import { TmptHWD } from "./TmptHWD.js";
import { getDirectoryRegisterEntries } from "../utility/fetch_file.js";
import { pathLastNode, pathLastNodeWithoutExtension, joinPath } from "../utility/path.js";


export class TmptGroup {
    constructor ({dirFetchUrl, groupName, setName}) {
        this.dirFetchUrl = dirFetchUrl;
        this.groupName = groupName;
        this.setName = setName;
        this.tmptNameToFileUrl = {}
        this.tmptNameToTmpt = {}

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
        const fileNameToUrl = {};
        for (let rsrcPath of entries) {
            const lastNode = pathLastNode({path: rsrcPath});
            
            if (lastNode.endsWith(".html")) {
                const tmptName = pathLastNodeWithoutExtension({
                    path: rsrcPath
                });

                const resourceFullPath = joinPath({
                    path1: this.dirFetchUrl,
                    path2: rsrcPath
                })
                fileNameToUrl[tmptName] = resourceFullPath;
            }
        }
        this.tmptNameToFileUrl = fileNameToUrl;
    }

    async getTmpt ({tmptName}) {
        if (tmptName in this.tmptNameToTmpt) {
            return this.tmptNameToTmpt[tmptName];
        }

        else if (tmptName in this.tmptNameToFileUrl) {
            const tmptHWD = new TmptHWD({
                fileUrl: this.tmptNameToFileUrl[tmptName],
                setName: this.setName,
                groupName: this.groupName
            });
            await tmptHWD.load();
            const tmpt = tmptHWD.toTmpt();
            this.tmptNameToTmpt[tmptName] = tmpt;
            return tmpt;
        }
    }
    
    async zGetTmpt ({tmptName}) {
        return await this.getTmpt({tmptName: tmptName});
    }

    getAllTmptNames () {
        return Object.keys(this.tmptNameToFileUrl);
    }

    _getGroupName () {
        const dirpathLastNode = pathLastNode({
            path: this.dirFetchUrl
        });

        if (dirpathLastNode.startsWith("group.")) {
            return dirpathLastNode.replace("group.", "");
        }
    }
}