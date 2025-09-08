export class UnitHook {
    constructor ({name, base}) {
        this.name = name
        this.bodyElmt = document.createElement("li");
        this.attachments = []
        base.bodyElmt.appendChild(this.bodyElmt);
        this._addDefaultClassToBodyElmt();
    }

    attach ({unit}) {
        this.attachments.push(unit);
        this.bodyElmt.appendChild(unit.bodyElmt);
        unit.attachedToHook = this;
    }

    detach ({unit}) {
        if (this.attachments.includes(unit)) {
            this.attachments.filter(attchedUnit => attchedUnit !== unit);
            this.bodyElmt.removeChild(unit.bodyElmt);
            unit.attchedToHook = null;
        }
    }

    _addDefaultClassToBodyElmt () {
        const defaultClassNames = [
            "--canvas-structure--unithook--"
        ];

        for (let className of defaultClassNames) {
            this.bodyElmt.classList.add(className);
        }
    }
}