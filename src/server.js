import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// Aplicacao Stateful ou Stateless
// Cabecalhos (Requisicao/resposta) => Metadados

// const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method == method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    req.params = { ...routeParams.groups };

    return route.hanlder(req, res);
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
