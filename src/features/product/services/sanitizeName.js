// Removes redundencies in certain cards with double slash 
// ex: Adrix and Nev, Twincasters // Adrix and Nev, ... from SLD set 
export const sanitizeName = (name) => {
    //  If name has no double slash
    if (!name.includes('//')) {
        // Return name
        return name;
    }

    // Else compare string values before and after the double slash
    const sides = name.split('//').map(side => {
        return side.trim();
    })
    // Assign only one of the value to card.name if equal
    if (sides[0] === sides[1]) {
        name = sides[0];
    }

    return name;
}