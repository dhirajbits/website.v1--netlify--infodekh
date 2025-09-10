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

export function insertItemAtIndexInArray({index, item, arr}) {
    // Handling item to insert at last
    if ((index === arr.length) || (index === null)) {
        arr.push(item);
        return arr;
    }

    // Handling item to be insert in-between array
    const newArr = [];
    let itemInserted = false;
    for (let i=0; i < arr.length; i++) {
        if ((i === index) && (!itemInserted)) {
            newArr.push(item);
            i -= 1;
            itemInserted = true;
            continue;
        }
        newArr.push(arr[i]);
    }
    return newArr;
}