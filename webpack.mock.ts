// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import data from "./data1";
import { TopProduct } from "@/types/productsCommon.types";
import changeDate from "@/utils/date";

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
  app.get("/api/products", (_req, res) => {
    data.sort((a: TopProduct, b: TopProduct) => Date.parse(<string>b.date) - Date.parse(<string>a.date));

    if (_req.query.sortPrice === "asc") {
      data.sort((a: TopProduct, b: TopProduct) => {
        const c = <number>a.price;
        const d = <number>b.price;
        return c - d;
      });
    }
    if (_req.query.sortPrice === "desc") {
      data.sort((a: TopProduct, b: TopProduct) => {
        const c = <number>b.price;
        const d = <number>a.price;
        return c - d;
      });
    }
    if (_req.query.sortRate === "asc") {
      data.sort((a: TopProduct, b: TopProduct) => {
        const c = <number>a.rating?.rate;
        const d = <number>b.rating?.rate;
        return c - d;
      });
    }
    if (_req.query.sortRate === "desc") {
      data.sort((a: TopProduct, b: TopProduct) => {
        const c = <number>b.rating?.rate;
        const d = <number>a.rating?.rate;
        return c - d;
      });
    }
    let newSortArr;

    if (_req.query.genre) {
      newSortArr = data.filter((elem) => _req.query.genre === elem.genres);
      if (_req.query.genre !== "all") {
        res.json(newSortArr);
      }
      if (_req.query.genre === "all") {
        res.json(data);
      }
      return;
    }
    if (_req.query.userAge) {
      newSortArr = data.filter(
        (elem) => elem.age.replace("+", " ") === decodeURIComponent(`${_req.query.userAge}`.replace(/"%2B"/g, ""))
      );
      if (_req.query.userAge !== "all") {
        res.json(newSortArr);
      }
      if (_req.query.userAge === "all") {
        res.json(data);
      }
      return;
    }

    res.json(data);
  });

  app.get("/api/getTopProducts", (_req, res) => {
    const result = data.sort((a: TopProduct, b: TopProduct) => Date.parse(<string>b.date) - Date.parse(<string>a.date));
    res.json(result);
  });

  app.get(`/api/search/:text`, (_req, res) => {
    const searchVal = decodeURIComponent(`${_req.params.text}`.replace(/\+/g, "%20")).toLowerCase();
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(searchVal)) {
        result.push(data[i]);
      }
    }
    res.json(result);
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
  app.delete("/api/products/:id", (_req, res) => {
    const itemIndex = data.findIndex((el) => String(el.id) === _req.params.id);
    if (itemIndex >= 0) {
      data.splice(itemIndex, 1);
    }
    return res.json(data);
  });
  app.put("/api/products", (_req, res) => {
    const itemIndex = data.findIndex((el) => el.id === _req.body.id);
    const newObj = {
      ...data[itemIndex],
      title: _req.body.formData.title,
      category: _req.body.formData.category[0],
      price: _req.body.formData.price,
      age: _req.body.formData.age,
      genres: _req.body.formData.genres,
      image: _req.body.formData.image,
      description: _req.body.formData.description,
    };
    if (itemIndex >= 0) {
      data.splice(itemIndex, 1, newObj);
    }
    return res.json(data);
  });
  app.post("/api/products", (_req, res) => {
    const dateNow = changeDate();
    const newObj = { id: Math.floor(Math.random() * 100), date: dateNow, ..._req.body };
    data.push(newObj);
    res.json(data);
  });
  app.get("/api/getProfile", (_req, res) => {
    res.json(data);
  });
});
