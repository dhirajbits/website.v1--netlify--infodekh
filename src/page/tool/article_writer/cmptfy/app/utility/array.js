export function removeEmptyStringFromArray({arr}) {
        if (!arr) {return arr;}
        
        let newArr = [];
        for (let item of arr) {
            if (item !== "") {
                newArr.push(item);
            }
        }
        return newArr;
    }