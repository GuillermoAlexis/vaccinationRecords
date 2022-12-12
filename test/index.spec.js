import request from "supertest";
import app from "../src/app.js";

describe("POST /signup", () => {
  test('POST /signup - success', async () => {
    const newPost = {
      name: 'name',
      email: 'email22@email.com',
      password: 'password'
    };
    const response = await request(app).post("/signup").send(newPost);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /login", () => {
  test('POST /login - success', async () => {
    const newPost = {
      email: 'email21@email.com',
      password: 'password'
    };
    const response = await request(app).post("/login").send(newPost);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /drug", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).post("/drug").send();
    expect(response.statusCode).toBe(403);
  });
});

describe("PUT /drug/2", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).put("/drug/2").send();
    expect(response.statusCode).toBe(403);
  });
});

describe("GET /drug", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).get("/drug").send();
    expect(response.statusCode).toBe(403);
  });
});

describe("DELETE /drug/2", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).delete("/drug/2").send();
    expect(response.statusCode).toBe(403);
  });
});

describe("POST /vaccination", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).post("/vaccination").send();
    expect(response.statusCode).toBe(403);
  });
});

describe("PUT /vaccination/2", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).put("/vaccination/2").send();
    expect(response.statusCode).toBe(403);
  });
});

describe("GET /vaccination", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).get("/vaccination").send();
    expect(response.statusCode).toBe(403);
  });
});

describe("DELETE /vaccination/2", () => {
  test("should respond with a 403 status code", async () => {
    const response = await request(app).delete("/vaccination/2").send();
    expect(response.statusCode).toBe(403);
  });
});







