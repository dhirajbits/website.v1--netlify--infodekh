import { TmptMngr } from "../tmpt/TmptMngr.js";



export class TmptLoader {
    static TEMPLATE_DIRPATH_RELATIVE_TO_INDEXJS = "./js/asset/template/";
    static TEMPLATE_DIRPATH = "../asset/template";


    static async loadTemplates ({groups, tmptMngr}) {
        if (typeof groups !== "object") {
            groups = [groups];
        }
        else if (!groups) {
            groups = ["."];
        }
        
        let tmptFilepaths = [];

        // Get register file of template group
        for (let group of groups) {
            const filepath = this.TEMPLATE_DIRPATH + "/" +
                                group + "/" + "_register.js";
            const registerModule = await import(filepath)
            const tmptRegister = registerModule.register;
            
            
            const tmptRelativeFilepathPrefix = this.TEMPLATE_DIRPATH_RELATIVE_TO_INDEXJS  + "/" + group + "/";

            for (let i=0; i < tmptRegister.length; i++) {
                let tmptFilepath = tmptRegister[i];
                if (tmptFilepath.startsWith("./")) {
                    tmptFilepath = tmptFilepath.replace(
                        "./",
                        tmptRelativeFilepathPrefix
                    );
                }

                else if (tmptFilepath.startsWith("/")) {
                    tmptFilepath = tmptFilepath.replace(
                        "/",
                        tmptRelativeFilepathPrefix
                    );
                }

                else {
                    tmptFilepath = tmptRelativeFilepathPrefix + "/" + tmptFilepath;
                }
                tmptRegister[i] = tmptFilepath;
            }
            tmptFilepaths = [...tmptFilepaths, ...tmptRegister];
        }


        // Create TmptMngr object
        if (!tmptMngr) {
            tmptMngr = new TmptMngr({name: groups[0]});
        }


        // Add all template
        for (let filepath of tmptFilepaths) {
            await tmptMngr.createTmpt({
                url: filepath
            })
        }

        // Return TmptMngr object
        return tmptMngr;
    }

    // static async loadAllInfopageTemplates({cmptTemplateMngr}) {
    //     const registerModule = await import(TemplateLoader.INFOPAGE_TEMPLATE_REGISTER_FILEPATH);
        
    //     for (let templateFilepath of registerModule.register) {
    //         const response = await fetch(
    //             "./js/" + 
    //             this.INFOPAGE_TEMPLATE_DIRPATH + 
    //             templateFilepath
    //         );
    //         if (response.ok) {
    //             cmptTemplateMngr.createTemplate({
    //                 text: await response.text()
    //             })
    //         }

    //         else {
    //             console.error(
    //                 `Unable to fetch template file: '${templateFilepath}'`
    //             );
    //         }
    //     }
    // }
}