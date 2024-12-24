export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}


const sortData = (obj) => {
    return Object.entries(obj).sort((a,b) => b[1]-a[1]);
}