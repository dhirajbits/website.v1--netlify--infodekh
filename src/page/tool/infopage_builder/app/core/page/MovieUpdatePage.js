import { Cmpt } from "../cmpt/Cmpt.js";
import { Page } from "./Page2.js";

export class MovieUpdatePage extends Page {

    static async zConstructor ({tmpthub, geneDict}) {
        const plateformCmpt = await getPlateformCmpt({tmpthub: tmpthub});
        return new MovieUpdatePage({
            plateformCmpt: plateformCmpt,
            tmpthub: tmpthub,
            geneDict: geneDict
        });
    }

    static async zFromGeneDict ({geneDict, tmpthub}) {
        const plateformCmpt = await getPlateformCmpt({tmpthub: tmpthub});
        return new MovieUpdatePage({
            plateformCmpt: plateformCmpt,
            tmpthub: tmpthub,
            geneDict: geneDict
        });
    }

    constructor ({plateformCmpt, tmpthub, geneDict}) {
        super({
            plateformCmpt: plateformCmpt,
            pageType : "MovieUpdate",
            tmptSetNames : ["movie_update"],
            tmpthub: tmpthub,
            geneDict: geneDict
        });
    }
}


async function getPlateformCmpt ({tmpthub}) {
    const plateformTmpt = await tmpthub.zGetTmptByRefId({
        tmptRefId: "plateform..movie_update"
    });

    const plateformCmpt = new Cmpt({
        tmpt: tmpt,
        nickname: "plateform"
    });

    await plateformCmpt.zInit();
}