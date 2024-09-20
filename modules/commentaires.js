/**
 * Exemple de commentaire proposés par VS Code
 * @param {*} age = age en parametre pour savoir si le conducteur peux conduire dans le pays -> entre {} entrer le type de parametre(INT, STR, BOOLEAN)
 * @param {string} country = permet de savoir l'age minimum pour conduire dans le pays
 * @returns = boolean pour savoir si le conducteur est en relge ou non / true = OK / false = non-OK
 */

function canDrive(age, country) {
    if (age >= 18)
            return true
    else if (country === 'US' && age >= 16 || country === 'FR' && age >= 18)
            return true
    return false
}
/**
 * Ce genre de commentaire permet de formater la fonction et precisier a l'utilisateur quel type de données la fonction attends en parametres.
 * @param {number} age 
 * @returns {bolean}
 */
function isMajeur(age) {
    return age >= 18
}