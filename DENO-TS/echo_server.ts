const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  console.log("new connection");
  console.log(conn, listener);
  conn.readable.pipeTo(conn.writable);
}