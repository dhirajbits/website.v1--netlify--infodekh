export class StyleConfigField {
    static fromGeneDict ({geneDict}) {
        throw new Error("Method not defined.")
    }

    get fieldName () {
        throw new Error("Getter not defined")
    }

    get value () {
        throw new Error("Getter not defined.")
    }

    get possibleValues() {
        throw new Error("Getter not defined.")
    }
    
    set value (value) {
        throw new Error("Setter not defined.")
    }

    toGeneDict ({geneDict}) {
        throw new Error("Method not defined.")
    }

    getStyleDeclerationDict () {
        throw new Error("Method not defined.")
    }

    getStyleDeclerationText () {
        throw new Error("Method not defined.")
    }

    _getPossibleValues ({givenPossibleValues, possibleValues}) {
        if ((!givenPossibleValues) || (givenPossibleValues === "*")) {
            return possibleValues;
        }

        const filteredPossibleValues = [];
        for (let givenPossibleValue of givenPossibleValues) {
            if (possibleValues.includes(givenPossibleValue)) {
                filteredPossibleValues.push(givenPossibleValue);
            }
        }
        return filteredPossibleValues;
    }
}