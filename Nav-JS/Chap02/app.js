
/* Cette méthode fonctionne pour un button isolé, pour plusieurs bouton, ci-dessous
const button = document.querySelector('button')
button.addEventListener('click', function (event) {
    console.log(event.target, event.currentTarget)
})
    */

function onButtonClickEx (event) {
    console.log('buttonEx click')
    event.preventDefault() // empeche le comportement par defaut (ex: redirection de lien, avec cette fonction le lien s'active pas)
    event.stopPropagation() // *
}

document.querySelectorAll('buttonEx, a').forEach(button => {
    button.addEventListener('click', onButtonClick)
})
/*
document.querySelector('div').addEventListener('click', () =>
    console.log('click div')
)

/* * Lorsque qu'un evenement est aplliqué a un composant, l'evenement est aussi applique aux parents de ce composant. 
Le 'stopPropagation()' permet d'appliquer l'evenement jusqu'a l'appel de cette fonction, dans notre cas, 'button click'
s'execute mais ensuite les evenements s'arrete. Nous n'avons donc pas 'click div' qui est sur la div parent de button. */

document.querySelector('form').addEventListener('submit', (e) => {
    const form = e.currentTarget
    const data = new FormData(form)
    const firstname = data.get('firstname')
    if (firstname.length < 2) { // -> n'envoie pas la donnée tant qu'elle n'est pas au format souhaité
        e.preventDefault()
    }
})

document.querySelector('#input1').addEventListener('change', (e) => {
    console.log('change')  
})
//-> le # permet de selectionner le nom de la balise dans le code HTML
document.querySelector('#input2').addEventListener('change', (e) => {
    console.log(e.currentTarget.checked)
})

document.querySelector('select').addEventListener('change', (e) => {
    console.log(
        Array.from(e.currentTarget.selectedOptions).map(option => option.value))
})

document.querySelectorAll('.spoiler').forEach(spoiler => {
    spoiler.addEventListener('click', e => {
        spoiler.classList.remove('spoiler')
    })
})

const spoilers = document.querySelectorAll('.spoilers');

function revealSpoiler () {
    spoilers.forEach(spoiler => spoiler.classList.remove('spoilers'))
}

spoilers.forEach(spoilers => {
    spoilers.addEventListener('click', revealSpoiler)
})