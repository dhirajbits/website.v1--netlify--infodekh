export class HOOK_TYPE {
    static GRABABLE = "GRABABLE";
    static CMPT = "CMPT";
    static CMPT_LIST = "CMPT_LIST";
    static DATA = "DATA";
    static HTML = "HTML";
    static STYLE = "STYLE";


    static default () {
        return this.GRABABLE;
    }


    static from ({textValue}) {
        const mapping = {
            "g": this.GRABABLE,
            "c": this.CMPT,
            "d": this.DATA,
            "h": this.HTML,
            "s": this.STYLE,
            "l": this.CMPT_LIST,
            "cl": this.CMPT_LIST,
            "grab": this.GRABABLE,
            "grabable": this.GRABABLE,
            "cmpt": this.CMPT,
            "data": this.DATA,
            "html": this.HTML,
            "style": this.STYLE,
            "cmptlist": this.CMPT_LIST,
            "cmpt_list": this.CMPT_LIST,
            "cmptList": this.CMPT_LIST,
        }
        return mapping[textValue];
    }


    static inOneLetter ({HOOK_TYPE}) {
        if (HOOK_TYPE === this.GRABABLE) {return "g";}
        if (HOOK_TYPE === this.CMPT) {return "c";}
        if (HOOK_TYPE === this.CMPT_LIST) {return "l";}
        if (HOOK_TYPE === this.DATA) {return "d";}
        if (HOOK_TYPE === this.HTML) {return "h";}
        if (HOOK_TYPE === this.STYLE) {return "s";}
    }

}