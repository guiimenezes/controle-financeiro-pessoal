const mongoose = require('mongoose');
const { findOneAndUpdate } = require('../models/TransactionModel');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAnoMes = async (req, res) => {
  const anoMes = req.query.period
  const description = req.query.description;
  console.log(description)
  //condicao para o filtro no findAll
  let condition = description
    ? { $and: [{ yearMonth: anoMes }, { description: { $regex: new RegExp(description), $options: 'i' } }] }
    : { yearMonth: anoMes };

  if (!req.query.period) {
    res.status(400).send("Precisa passar o passar o perído anos-mês")
  } else {
    try {
      // const dados = await TransactionModel.find({ yearMonth: anoMes }).sort({ type: -1 })
      const dados = await TransactionModel.find(condition).sort({ type: -1, day: 1 })
      res.send(JSON.stringify(dados))
    } catch (error) {
      res.status(400).send(error)
    }
  }
}

const findAll = async (req, res) => {
  try {
    const dados = await TransactionModel.find({}).distinct('yearMonth')
    res.send(JSON.stringify(dados))
  } catch (error) {
    res.status(400).send(error)
  }

}
const findOne = async (req, res) => {
  const id = req.params.id
  try {
    const dados = await TransactionModel.findOne({ _id: id })
    res.send(JSON.stringify(dados))
  } catch (error) {
    res.status(400).send(error)
  }
}

const create = async (req, res) => {
  const dadoCorpo = req.body
  const insere = new TransactionModel(dadoCorpo)
  const insercao = insere.save()
  console.log(insercao)
  if (insercao) {
    res.send("Dados inserido")
  } else {
    res.status(400).send("Erro ao tentar inserir dados")
  }
}

const update = async (req, res) => {
  const id = req.params.id
  try {

    const dados = await TransactionModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (dados.length <= 0) {
      res.status(400).send("Erro ao editar")
    } else {
      res.send("atualizado com sucesso")
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

const deleteDado = async (req, res) => {
  const id = req.params.id
  try {
    const dados = await TransactionModel.findByIdAndRemove({ _id: id })
    res.send("deletado com sucesso")
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = { findAll, findAnoMes, create, update, deleteDado, findOne }
