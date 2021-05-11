const apiUrl = 'https://icanhazdadjoke.com/';

function nextChiste() {
    getJoke();
}

async function getJoke() {

    const response = await fetch(apiUrl, {
        method: 'GET',

        headers: {
            'Accept': 'application/json'
        }
    })
    const data = await response.json();
    console.log(data);


}