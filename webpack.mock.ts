// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import data from "./data.json";
import { TopProduct } from "./src/types/types";

export default webpackMockServer.add((app, helper) => {
  app.get("/testMock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });
  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
  app.post("/api/auth/signIn", (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        error: "req body cannot be empty",
      });
    }
    return res.status(201).json({
      name: req.body.name,
      password: req.body.password,
    });
  });

  app.put("/api/auth/signUp", (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        error: "req body cannot be empty",
      });
    }
    return res.status(200).json({
      name: req.body.name,
      password: req.body.password,
    });
  });

  app.post("/api/changePassword", (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        error: "req body cannot be empty",
      });
    }
    return res.status(201).json({
      password: req.body.password,
    });
  });
  app.get("/api/getProducts", (_req, res) => {
    // res.sendFile(require.resolve("./data.json"));
    res.json(data);
  });

  app.get("/api/getTopProducts", (_req, res) => {
    data.sort((a: TopProduct, b: TopProduct) => {
      const c: Date | unknown = new Date(b.date);
      const d: Date | unknown = new Date(a.date);
      return c - d;
    });
    // res.sendFile(require.resolve("./data.json"));
    res.json(data);
  });

  app.post("/api/saveProfile", (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        error: "req body cannot be empty",
      });
    }
    return res.status(201).json({
      name: req.body.name,
      age: req.body.age,
      description: req.body.description,
    });
  });

  app.get("/api/getProfile", (_req, res) => {
    res.json(data);
  });
});
