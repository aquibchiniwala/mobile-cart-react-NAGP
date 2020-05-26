export function compareAsc(a, b) {
    const bandA = a.price
    const bandB = b.price
 
    let comparison = 0;
    if (bandA > bandB) {
       comparison = 1;
    } else if (bandA < bandB) {
       comparison = -1;
    }
    return comparison;
 }
 
 export function compareDesc(a, b) {
    const bandA = a.price
    const bandB = b.price
 
    let comparison = 0;
    if (bandA > bandB) {
       comparison = 1;
    } else if (bandA < bandB) {
       comparison = -1;
    }
    return comparison * -1;
 }