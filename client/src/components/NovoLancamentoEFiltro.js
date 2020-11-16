import React from 'react'

export default function NovoLancamentoEFiltro(props) {

  const clicaAbreModal = () => {
    props.onClick()
  }

  const busca = (event) => {
    const palavra = event.target.value
    props.pesquisa(palavra)
  }

  return (
    <div className="campoLancamento">
      <div className="btnNew"><button className="btn" onClick={clicaAbreModal}>+ Novo Lançamento</button></div>
      <div className="filtro"><input type="text" name="filtro" placeholder="Filtro" value={props.txtBusca} onChange={busca}></input></div>
    </div>
  )
}
