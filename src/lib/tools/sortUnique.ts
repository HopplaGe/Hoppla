export const sortUnique = (arr: any) => {
    if (arr === undefined || arr === null) {
        return [];
    }
    return arr.sort().filter(function (el: any, i: any, a: any) {
        return (i === a.indexOf(el));
    });
}