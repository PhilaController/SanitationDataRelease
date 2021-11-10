async function safeFetch(url) {

    try {
        const response = await fetch(url);
        let data = await response.json();
        return data
    } catch (e) {
        console.error(e);
    }
}

async function fetchAWS(filename) {

    let url = `https://sanitation-data-release.s3.amazonaws.com/${filename}`
    return safeFetch(url)
}

export { fetchAWS, safeFetch }