console.log("Script chargé");
console.log(document.querySelectorAll('li'));//-> permet de selectionner plusieurs champs a la fois
console.log(document.querySelector('#hello')); //-> concerne les div

const lis = document.querySelectorAll('li')
console.log(lis[2]) // -> affiche seulement la 3e list (index de 2 donc 3e dans le tableau)
/*
const ul = document.querySelector('ul')
console.log(
    ul.nodeName,
    ul.innerHTML, //-> permet de modifier ou d'accerder au contenu de l'element passer "x".HTML (page navigateur)
    ul.innerText, //-> permet de recuperer le contenu de l'element en retirant le formatage HTML (console)
    ul.innerContent //-> recupere le contenu (script inclut dans la div) avec le formatage de l'HTML (console)
)

ul.innerHTML = 'Hello' // -> ajout/modification du contenu dans l'HTML
//ul.removeAttribute('hidden) -> retire l'attribut
*/
const color = document.querySelector('ul li:first-child')
console.log(
    color.getAttribute('class')
)

/**
 * remove -> permet de supprimer une classe du HTML depuis le fichier JS
 * toggle -> si class ajoutée => la retire / si class manquante => l'ajoute
 * interval + toggle = texte qui clignote
 * add -> ajoute un classe, si elle est deja attribué cela n'as pas d'impact
 * x.cloneNode(true/false/null) -> clone l'element x, si true actif => clone les enfants / false/null => clone seulement l'element x
 * x.contains(y) -> renvoie true / false si w contient y
 */

const li = document.querySelector('ul li:nth-child(2)')
console.log(
    li.style.color = 'blue',
    li.style.fontWeight = 'bold'
)

console.log(getComputedStyle(li).color) // -> donne la couleur intepreté par le navigateur

const newCreation = document.createElement('li')
newCreation.innerHTML = 'Voici le message qui as été fabriqué par APP.js'
document.querySelector('ul').appendChild(newCreation)

const newText = document.createElement('li')
newText.innerHTML = 'Voici le message qui as été fabriqué par APP.js mais qui sera affiché en 1er'
document.querySelector('ul').prepend(newText)
