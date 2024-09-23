
/**
 * Crée un article
 * @param {{title: string, body: string}} post 
 * @return {HTMLElement}
 */

// -> Méthode très manuelle mais cela reste l'option la plus sure pour avoir les éléments comme on le souhaite et sans soucis de balise au seins du texte / interférence avec le style
function createArticleManually(post) {
    const article = document.createElement('article')
    const h2 = document.createElement('h2') //  |
    h2.innerText = post.title //                | -> deux lignes qui peuvent etre remplacer comme ci dessous
    article.append(h2)
    article.append(createElementWithText('p', post.body))
    return article
}


// -> element html a parsé deux fois, pas opti pour la performance
function createArticleDoubleParse (post) {
    const article = document.createElement('article')
    article.innerHTML = `
        <h2></h2>
        <p></p>
    `
    article.querySelector('h2').innerText = post.title
    return article
}


// -> soucis avec cette méthode c'est que si nous recoltons des informations eronnée, cela peux avoir avoir un comportement (ex: balise dans le format texte, cela mets un autre style...)
function createArticleNoSecure(post) {
    const article =document.createElement('article')
    article.innerHTML = `
        <h2>${post.title}</h2> 
        <p>${post.body}</p>
        ` 
    return article
}

function createElementWithText (tagName, content) {
    const element = document.createElement(tagName)
    element.innerText = content
    return element
}

async function main() {
    const wrapper = document.querySelector('#lastPosts')
    const loarder = document.createElement('p')
    loarder.innerText = 'Chargement...'
    wrapper.append(loarder)
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
            headers: {
                Accept: 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error('Server Error')
        }

        const posts = await response.json()
        loarder.remove()
        for (let post of posts) {
            wrapper.append(createArticleManually(post))
        }

    } catch (e) {
        loarder.innerText = 'Impossible de charger les articles'
        loarder.style.color = 'red'
        return 
    }

}

main()