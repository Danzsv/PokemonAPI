const axios = require("axios");
// const fetch = require('node-fetch');
const { typeModel } = require("../models");

const showTypesDb = async (req, res) => {
  const result = await typeModel.find({});
  await typeModel.updateOne;

  res.send(result);
};
//uwu

const saveTypeDb = async (req, res) => {
  try {
    let uwu = req.body;

    console.log(uwu);
    const result = await typeModel.create(uwu);

    res.send(result);
    // res.send({ msg: "Se ven los tipos" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await typeModel.delete({ _id: id });
    return res.json(data);
  } catch (e) {
    return res.json(e.message);
  }
};

module.exports = { saveTypeDb, showTypesDb, deleteType };
