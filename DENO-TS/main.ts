import { fetchSite } from './api/fetch-deno.ts';


const add = async (a: number, b: number): Promise<number> => {  

    const site = await fetchSite('https://www.deno.com');
    console.log(site);
  return a + b;
};

console.log(add(5, 10)); // 15