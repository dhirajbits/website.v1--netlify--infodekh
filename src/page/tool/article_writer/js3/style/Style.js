export class StyleBlock {
    static counter = 0;
    constructor ({name, elmt, selector}) {
        this.name = name;
        this.bodyElmt = elmt;
        this.rootElmt = this.bodyElmt;
        this.id = null;


        if (!this.bodyElmt) {
            this.bodyElmt = this._createStyleElmt();
        }

        this.id = this._createStyledId()
        this._addStyleId({elmt: this.bodyElmt});
        this.rootElmt = this.bodyElmt;
    }

    addStyle(style) {
        let newStyle = ""
        for (let property in style) {
            newStyle += `${property}: ${style[property]};\n`;
        }
        

        let prevStyle = this.bodyElmt.innerHTML;
        this.bodyElmt.innerHTML = prevStyle.replace("\n}", "") + newStyle + "\n}";
    }

    removeStyle(style) {
        let prevStyle = this.bodyElmt.innerHTML;
        for (let property in style) {
            const styleToRemove = `${property}: ${value[property]};\n`;
            prevStyle = prevStyle.replace(styleToRemove, "");
        }
        
        this.bodyElmt.innerHTML = prevStyle;
    }


    
    _addStyleId({elmt}) {
        this.bodyElmt.id = this.id;
    }

    
    _createStyleElmt () {
        const styleElmt = document.createElement("style");
        styleElmt.innerHTML = `
        #${this.id} {
        
}
        `;
        return styleElmt;
    }

    _createStyledId() {
        this.counter += 1;
        return "--style--" + this.couter;
    }

}