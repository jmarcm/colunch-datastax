function sortObject() {
    var myObj = {
        a: "anatole",
        c: "chantal",
        b: "beatrice",
    };

    console.log(myObj);
    const keys = Object.keys(myObj);
    console.log(keys);
    keys.sort();
    console.log(keys);

    const sortedObject = {};
    for (let key of keys) {
        console.log(myObj[key]);
        sortedObject[key] = myObj[key];
    }

    console.log(sortedObject);
}

function sortArrayOfObjects(myArray) {
    myArray.sort(function (a, b) {
        const keyA = a.name;
        const keyB = b.name;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    return myArray;
}

module.exports = { sortObject, sortArrayOfObjects };
