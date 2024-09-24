/**
 * Cette fonctuon sers a recuperer un cookie grâce à son nom. 
 * @param {string} name 
 * @return {string|null}
 */
function getCookies(name) {
    const cookies = document.cookie.split('; ')
    const value = cookies.find(c => c.startsWith(name))?.split('=')[1]
    if (value === undefined)
            return null
    return decodeURIComponent(value)
}

/**
 * 
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 */
function setCookies(name, value, days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}`
}

fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
    credentials: 'include'
})