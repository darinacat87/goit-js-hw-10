const URL = 'https://restcountries.com/v3.1/name/';
const filter = '?field=name,capital,population,flags,languages'

export default function fetchCountries(name) {
    return fetch(`${URL}${name}${filter}`).then(responce => {
        if (!responce.ok) {
            throw new Error(responce.status)
        }
        return responce.json()
    })
}
