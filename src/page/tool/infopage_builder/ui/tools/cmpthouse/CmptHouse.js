export class CmptHouse {
    constructor () {
        this.cmpts = {}
    }

    add ({cmpt, room, rack, name}) {
        room = room || "";
        rack = rack || "";
        name = name || "";

        this._createPosition({
            room: room,
            rack: rack,
            name: name
        });

        this.cmpts[room][rack][name] = cmpt;
    }

    get ({room, rack, name}) {
        room = room || "";
        rack = rack || "";
        name = name || "";

        if ((this.cmpts[room]) && (this.cmpts[rack])) {
            return this.cmpts[room][rack][name];
        }
        return null;
    }

    remove ({room, rack, name}) {
        room = room || "";
        rack = rack || "";
        name = name || "";
        
        let cmpt = null;
        if ((this.cmpts[room]) && (this.cmpts[rack])) {
            cmpt =  this.cmpts[room][rack][name];
            delete this.cmpts[room][rack][name];
        }
        return cmpt;
    }

    _createPosition ({room, rack, name}) {
        if (!this.cmpts[room]) {
            this.cmpts[room] = {};
        }

        if (!this.cmpts[room][rack]) {
            this.cmpts[room][rack] = {};
        }
    }
}