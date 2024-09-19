import hello from './hello.js'

export const sum = (items) => items.reduce((acc, item) => acc + item, 0)

export const hi = () => console.log('hello')

export default () => console.log("C'est compliqué !")

export const salutation = hello