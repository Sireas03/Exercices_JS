import { alertElement } from "./functions/alert.js"
import { fetchJSON } from "./functions/api.js"

class InfinitePagination {

    /** @type {string} */
    #endpoint
    /** @type {HTMLTemplateElement} */
    #template
    /** @type {HTMLElement} */
    #target
    /** @type {HTMLElement} */
    #loader
    /** @type {object} */
    #elements
    /** @type {IntersectionObserver} */
    #observer
    /** @type {boolean} */
    #loading = false    /* faire un élément loading permet d'eviter le chargement de plusieurs fois 10 commentaires (ex: si nous voyons 2 fois de suite le loader, 
                            il ne faut pas prendre ça comme une double requete de chargement de comment)*/
    /** @type {number} */
    #page = 1
    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.#loader = element
        this.#endpoint = element.dataset.endpoint
        this.#template = document.querySelector(element.dataset.template)
        this.#target = document.querySelector(element.dataset.target)
        this.#elements = JSON.parse(element.dataset.elements)
        this.#observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    this.#loadMore()
                }
            }
        })
        this.#observer.observe(element)
    }
    async #loadMore() {
        if (this.#loading) {
            return
        }
        
        this.#loading = true
        try {
        const url = new URL(this.#endpoint)
        url.searchParams.set('_page', this.#page)
        const comments = await fetchJSON(url.toString())
        if (comments.length === 0 || this.#page === 3) { // 2e options car dans notre cas, les commentaire généré ne sont jamais vide
            this.#observer.disconnect()
            this.#loader.remove()
            return 
        }
        for (const comment of comments) {
            const commentElement = this.#template.content.cloneNode(true)
            for (const [key, selector] of Object.entries(this.#elements)) {
                commentElement.querySelector(selector).innerText = comment[key]
            }
            this.#target.append(commentElement)
        }
        this.#page++
        this.#loading = false
        } catch (e) {
            this.#loader.style.display = 'none'
            const error = alertElement('Chargment des contenus impossible')
            error.addEventListener('close', () => {
                this.#loader.style.removeProperty('display')
                this.#loading = false
            })
            this.#target.append(error)
        }
    }
}

class FetchForm {

    /** @type {string} */
    #endpoint
    /** @type {HTMLTemplateElement} */
    #template
    /** @type {HTMLElement} */
    #target
    /** @type {object} */
    #elements

    /**
     * 
     * @param {HTMLFormElement} form 
     */
    constructor(form) {
        this.#endpoint = form.dataset.endpoint
        this.#template = document.querySelector(form.dataset.template)
        this.#target = document.querySelector(form.dataset.target)
        this.#elements = JSON.parse(form.dataset.elements)
        form.addEventListener('submit', e => {
            e.preventDefault()
            this.#submitForm(e.currentTarget)
        })
    }

    async #submitForm(form) {
        const button = form.querySelector('button')
        button.setAttribute('disabled', '')
        try {
            const data = new FormData(form )
            const comment = await fetchJSON(this.#endpoint, {
                method: 'POST', 
                json: Object.fromEntries(data)
            })

            const commentElement = this.#template.content.cloneNode(true)
            for (const [key, selector] of Object.entries(this.#elements)) {
                commentElement.querySelector(selector).innerText = comment[key]
            }
            this.#target.prepend(commentElement)
            form.reset()
            button.removeAttribute('disabled')
        } catch (e) {
            const errorElement = alertElement('Impossible de soumettre le commentaire')
            form.insertAdjacentElement(
                'beforebegin', 
                errorElement
            )
            errorElement.addEventListener('close', () => {
                button.removeAttribute('disabled')
            })
        }
    }
}


document
    .querySelectorAll('.js-infinite-pagination')
    .forEach(el => new InfinitePagination(el))

document
    .querySelectorAll('.js-form-fetch')
    .forEach(form => new FetchForm(form))


document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1; // Garde la trace des pages de commentaires
    
    // Fonction pour charger les commentaires
    const loadComments = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=10`);
        const comments = await response.json();
            
        const commentTemplate = document.querySelector('#comment');
    const commentTarget = document.querySelector('.comments');
            
        comments.forEach(comment => {
            const clone = commentTemplate.content.cloneNode(true);
            clone.querySelector('.js-username').textContent = comment.name;
            clone.querySelector('.js-content').textContent = comment.body;
            commentTarget.appendChild(clone);
        });

        // Incrémente la page pour les prochains commentaires
        currentPage++;

        // Réactiver l'observation pour le chargement infini après chargement
        observer.observe(loader);
    };

    // Création de l'Intersection Observer
    const loader = document.querySelector('.js-infinite-pagination');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                // Si le loader est visible à 10%, on charge les commentaires
                observer.unobserve(loader); // Désactive temporairement l'observation pour éviter les doublons
                loadComments();
            }
        });
    }, {
        threshold: 0.1 // 10% de visibilité du loader
     });
    
    // Démarrer l'observation
    observer.observe(loader);
    
     // Charger les premiers commentaires après un délai
    loadComments();
});
    
    