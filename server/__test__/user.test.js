const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
});

describe("POST /register", () => {
  describe("POST /register - succeed", () => {
    it("should be return an object with message", async () => {
      const body = { email: "abc@mail.com", password: "12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /register - fail", () => {
    it("should be return an object with error message", async () => {
      const body = { email: "", password: "12345" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    it("should be return an object with error message", async () => {
      const body = { email: "test@mail.com", password: "" };
      const response = await request(app).post("/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
