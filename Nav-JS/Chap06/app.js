
const h1 = document.querySelector('h1')
console.log('Position par rapport au haut', window.scrollY + h1.getBoundingClientRect().y, recursiveOffsetTop(h1))

document.querySelector('div').addEventListener('mousemove', e => {
    console.log(e)
})

/* Les deux méthodes pour coder la position sont equivalente, cela depends du developpeur et de l'utilité du if ou du while 
function recursiveOffsetTop (element) {
    while (element.offsetParent) {
        top += element.offsetTop
        element = element.offsetParent
    }
    return top
}*/

function recursiveOffsetTop (element) {
    if (element.offsetParent) {
        return element.offsetTop + recursiveOffsetTop(element.offsetParent)
    } else {
        return element.offsetTop
    }
}
const div = document.querySelector('#div2')
console.log(div.dataset)

const button = document.querySelector('button')
let i = 0;
const listener = () => {
    i++
    console.log(button.dataset.name)
    if (i >= 3 ) 
        button.removeEventListener('click', listener)
}
button.addEventListener('click', listener)

button.animate([
    {transform: 'translateY(0)'},
    {transform: 'translateX(200px)'},
    {transform: 'translateY(100px)'},
], {
    duration: 1000, // temps que l'animation va durer
    iterations: 2, //nbr de fois que l'animation va se realiser
    fill: 'both' // le button reste à l'endroit ou finis l'animation
})

const mediaQuery = window.matchMedia('(min-height: 300px)');

console.log(mediaQuery.matches); // Affiche immédiatement si la condition est remplie

mediaQuery.addEventListener('change', () => {
    console.log(mediaQuery.matches);
});


const img = document.querySelector('img')
/* En cas de reseau lent, le chargement de l'image peux poser probleme concernant les dimensions, faire un console.log('dimensions') ne fonctionnerais pas.
Lors de l'execution du console.log, la valeur serais de 0 car l'image n'est pas chargée il faut donc utiliser une autre technique*/
img.addEventListener('load', () => {
    console.log(img.width)
    console.log(img.height)
    console.log(`natural width -> ${img.naturalWidth}`)
    console.log(`natural height -> ${img.naturalHeight}`)

})

img.src = img.src;