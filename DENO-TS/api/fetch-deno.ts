export const fetchSite = async (url: string) => {
    const res = await fetch(url);
    return res.text();
}


const site = fetchSite('https://www.deno.com')
.then(data => console.log(data))