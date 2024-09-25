const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.animate([
                {transform: 'translateX(-10px)', opacity: 0},
                {transform: 'translateX(0px)', opacity: 1}
            ], {
                duration: 800
            })
            observer.unobserve(entry.target) // option servant a généré l'animation 1 fois, evite d'avoir l'animation a chaque fois que le bouton sors/apparait de l'ecran
        }
    }
}, {
    rootMargin: '0px 0px 0px 0px' // si les valeurs sont importantes, l'objet peut declencher un evenement 'isVisible' même en etant en dehors de la page. 
    /* threshold: .5 -> ce parametre rajoute une condition, l'objet doit apparaitre à plus de 50% à l'ecran pour activer le 'isVisible' par exemple*/
})

observer.observe(document.querySelector('.btn1'))
observer.observe(document.querySelector('.btn2'))
/* observer.disconnect() -> desactive toutes les animations positionée avant l'appel de fonction */