

async function main() {
    const loarder = document.createElement('p')
    const wrapper = document.querySelector('#lastPosts')
    loarder.innerText = 'Chargement...'
    wrapper.append(loarder)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
        headers: {
            Accept: 'application/json'
        }
    })
    if (!response.ok) {
        loarder.innerText = 'Impossible de charger les articles'
        loarder.style.color = 'red'
        return 
    }
}

main()