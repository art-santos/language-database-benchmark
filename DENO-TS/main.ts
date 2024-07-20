
import { fetchSite } from './api/fetch-deno.ts';

const library = Deno.dlopen("./target/debug/libmy_library.dylib", {
    add: {
        parameters: ["f64", "f64"],
        result: "f64",
    },
})


const result = library.symbols.add(1.0, 2.0);

console.log(result);