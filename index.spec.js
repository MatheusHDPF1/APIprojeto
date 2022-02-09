const request = require("supertest");
const app = require("./index");

describe("Aplicação Produto.", () => {
  it("Teste da rota produto/listar", async () => {
    const res = await request(app).get("/produto/listar");
    expect(res.body).toHaveProperty("output");
  });

  it("produto/buscar/:id", async () => {
    const res_buscar = await request(app).get("/produto/buscar/1");
    expect(res_buscar.body).toHaveProperty("output");
  });

  it("cadastro produto/cadastro", async () => {
    const res_cadastro = await request(app)
      .post("/produto/cadastro")
      .send({
        nomeproduto: "Hades",
        descricao: "Hades ps5 ",
        preco: 125.91,
        imagem: "",
      })
      .set("Accept", "application/json")
      .expect(201);
    console.log(res_cadastro.text);
  });

  it("atualizar produto/atualizar/:id", async () => {
    const res_atualizar = await request(app)
      .put("/produto/atualizar/1")
      .send({
        nomeproduto: "Dying Light 2",
        descricao: "Dying Light 2 PS5",
        preco: 260.90,
        imagem: "",
      })
      .set("Accept", "application/json")
      .expect(200);
    console.log(res_atualizar.text);
  });

  it("delete produto/apagar", async () => {
    const res_apagar = await request(app)
      .delete("/produto/apagar/1")
      .set("Accept", "application/json")
      .expect(204);
  });
});