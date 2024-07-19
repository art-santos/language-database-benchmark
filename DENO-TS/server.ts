const port = 8080;
import { serve } from "https://deno.land/std/http/server.ts";

const handler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP server running. Access it at: http://localhost:8080/`);
serve({ port }, handler);
