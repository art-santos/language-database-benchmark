import { serve } from "https://deno.land/std/http/mod.ts";
const reqHandler = async (req: Request) => {
  return new Response("Hello world!");
};
serve(reqHandler, { port: 8080 });