export class HOOK_TYPE {
    static CMPT = "CMPT";
    static CMPT_LIST = "CMPT_LIST";
    static DATA = "DATA";
    static HTML = "HTML";
    static STYLE = "STYLE";

    
    static from ({textValue}) {
        const mapping = {
            "c": this.CMPT,
            "d": this.CMPT,
            "h": this.CMPT,
            "s": this.CMPT,
            "l": this.CMPT,
            "cl": this.CMPT,
            "cmpt": this.CMPT,
            "data": this.CMPT,
            "html": this.CMPT,
            "style": this.CMPT,
            "cmptlist": this.CMPT,
            "cmpt_list": this.CMPT,
            "cmptList": this.CMPT,
        }
        return mapping[textValue];
    }

}