import React, { useEffect, useState } from 'react';
import './App.css'
import CampoSelect from './components/CampoSelect';
import Infos from './components/Infos';
import ListaFinancas from './components/ListaFinancas';
import NovoLancamentoEFiltro from './components/NovoLancamentoEFiltro';
import Modal from 'react-modal';
import TransactionService from './services/TransactionService.js'
import formataData from './helpers/formataData'
export default function App() {

  const [inputSelect, setInputSelect] = useState([])
  const [transaction, setTransaction] = useState([])
  const [preencheModal, setPreencheModal] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [statusBtn, setStatusBtn] = useState("")
  const [busca, setBusca] = useState("")
  const [dataFix, setDataFix] = useState("")

  useEffect(() => {
    if (transaction.length <= 0) {
      retrieveTransactionAnoMes(formataData(Date.now()))
      setDataFix(formataData(Date.now()))

    }
    retrieveTransaction()
  }, [])

  const retrieveTransactionAnoMes = (dados, descricao) => {
    TransactionService.getAnoMes(dados, descricao)
      .then((response) => {
        setTransaction(response.data);
        setDataFix(dados)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveTransaction = () => {
    TransactionService.getAll()
      .then((response) => {
        setInputSelect(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const reloadTransaction = (dados) => {
    retrieveTransactionAnoMes(dados.value, busca)
  }

  const modalCadastra = () => {
    setModalIsOpen(true)
    setPreencheModal([])
    setStatusBtn("Cadastrar")
  }
  const modalEdita = (id) => {
    TransactionService.findOne(id)
      .then((response) => {
        setPreencheModal(response.data);
        setModalIsOpen(true)
        setStatusBtn('Salvar')
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const alteraCampo = (event) => {
    const { name, value } = event.target
    setPreencheModal({ ...preencheModal, [name]: value })
  }

  const excluirItem = (id, data) => {
    TransactionService.deletar(id).then(() => {
      retrieveTransactionAnoMes(data, busca)
    }).catch(e => { console.log(e) })
  }

  const salvaEdita = () => {
    const dataCompleta = preencheModal.yearMonthDay
    const dia = dataCompleta.slice(8, 10)
    const mes = dataCompleta.slice(5, 7)
    const ano = dataCompleta.slice(0, 4)
    const mesAno = ano + "-" + mes
    const data = {
      value: preencheModal.value,
      category: preencheModal.category,
      description: preencheModal.description,
      type: preencheModal.type,
      year: ano,
      month: mes,
      day: dia,
      yearMonth: mesAno,
      yearMonthDay: preencheModal.yearMonthDay
    }

    if (modalIsOpen === true && statusBtn === 'Salvar') {
      TransactionService.update(preencheModal._id, data).then(response => {
        setPreencheModal({
          _id: response._id,
          value: response.value,
          category: response.category,
          description: response.description,
          type: response.type,
          year: response.year,
          month: response.month,
          day: response.day,
          yearMonth: response.yearMonth,
          yearMonthDay: response.yearMonthDay
        })
        retrieveTransactionAnoMes(data.yearMonth, busca)
        setModalIsOpen(false)
      }).catch(e => { console.log(e) })
    } else if (modalIsOpen === true && statusBtn === 'Cadastrar') {
      TransactionService.create(data).then(response => {
        setPreencheModal({
          _id: response._id,
          value: response.value,
          category: response.category,
          description: response.description,
          type: response.type,
          year: response.year,
          month: response.month,
          day: response.day,
          yearMonth: response.yearMonth,
          yearMonthDay: response.yearMonthDay
        })
        retrieveTransactionAnoMes(data.yearMonth, busca)
        setModalIsOpen(false)
      }).catch((e) => { console.log(e) })
    }
  }

  const searchName = (e) => {
    const buscar = e
    setBusca(buscar)
    retrieveTransactionAnoMes(dataFix, buscar)
  }

  Modal.setAppElement('#root')

  return (
    <div className="container">

      <h5 style={{ "textAlign": "center" }}>Desafio Final do Bootcamp Full Stack</h5>
      <h6 style={{ "textAlign": "center" }}>Controle Financeiro Pessoal</h6>
      <CampoSelect dados={inputSelect} retornaTransaction={reloadTransaction} />
      <Infos information={transaction} />
      <NovoLancamentoEFiltro onClick={modalCadastra} pesquisa={searchName} txtBusca={busca} />
      <ListaFinancas information={transaction} onClick={modalEdita} onDelete={excluirItem} />
      {/* <button onClick={modalCadastra} >Abrir modal</button> */}
      <Modal isOpen={modalIsOpen}>
        <button onClick={() => setModalIsOpen(false)}>X</button>
        <div className="container">
          <div className="tipo">
            <label>
              <input
                name="type"
                value={"-"}
                onChange={(alteraCampo)}
                type="radio"
                className="radio"
                checked={(preencheModal.type === '-')} />
              <span>Despesa</span>
            </label>

            <label>
              <input
                name="type"
                value={"+"}
                onChange={alteraCampo}
                type="radio"
                className="radio"
                checked={(preencheModal.type === '+')} />
              <span>Receita</span>
            </label>
          </div>

          <div>
            <label>
              <input type="text" onChange={alteraCampo} name="description" value={preencheModal.description} placeholder="descricao"></input>
            </label>
          </div>

          <div>
            <label>
              <input type="text" onChange={alteraCampo} name="category" value={preencheModal.category} placeholder="categoria"></input>
            </label>
          </div>
          <div>
            <label>
              <input type="number" onChange={alteraCampo} name="value" value={preencheModal.value} placeholder="valor"></input>
              <input type="date" onChange={alteraCampo} name="yearMonthDay" value={preencheModal.yearMonthDay} ></input>
            </label>
          </div>
          <div>
            <button onClick={salvaEdita}>{statusBtn}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
