import request from "supertest";
import app from "../src/app.js";

describe("GET /drug", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/drug").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond an array", async () => {
    const response = await request(app).get("/tasks").send();
    console.log(response)
  });
});