import express from "express";
import path from "path";
import fs from "fs";
const router = express.Router();
const __dirname = import.meta.dirname;

//root
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//data-leer
router.get("/deportes", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/data/data.json"));
});

//add data from inputs
router.get("/agregar", (req, res) => {
  const { nombre, precio } = req.query;

  const sportsData = fs.readFileSync("./assets/data/data.json");

  //desestructurar
  const { deportes } = JSON.parse(sportsData);
  deportes.push({ nombre, precio });
  fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));
  res.send("agregado con exito!");
});

//delete button
router.get("/eliminar", (req, res) => {
  const { nombre } = req.query;
  const sportsData = fs.readFileSync("./assets/data/data.json");
  let { deportes } = JSON.parse(sportsData);

  const index = deportes.findIndex((item) => item.nombre === nombre);

  if (index !== -1) {
    deportes.splice(index, 1);
    fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));

    res.send("correctamente eliminado");
  } else {
    res.send("error al eliminar");
  }
});

//editar button

router.get("/editar", (req, res) => {
  const { nombre, precio } = req.query;
  const sportsData = fs.readFileSync("./assets/data/data.json");
  let { deportes } = JSON.parse(sportsData);

  const index = deportes.findIndex((item) => item.nombre === nombre);

  if (index !== -1) {
    deportes[index].precio = precio;

    fs.writeFileSync("./assets/data/data.json", JSON.stringify({ deportes }));

    res.send("Correctamente editado");
  } else {
    res.send("error al editar");
  }
});

export default router;
