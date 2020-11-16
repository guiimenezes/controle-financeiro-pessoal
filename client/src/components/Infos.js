import React from 'react'

export default function Infos({ information }) {
  // console.log(information.length)
  let receita = 0
  let despesa = 0
  let saldo = 0

  information.forEach(val => {
    if (val.type === '+') {
      receita += val.value
    } else {
      despesa += val.value
    }
  })
  saldo = receita - despesa
  const style = {
    verde: {
      color: "green",
      fontSize: "1.3rem",
      fontWeight: "bold"
    },
    vermelho: {
      color: "red",
      fontSize: "1.3rem",
      fontWeight: "bold"
    }
  }

  return (
    <div className="infos">
      <div className="lancamentos">
        <span>
          <strong>Lançamenos:  {information.length}</strong>
        </span>
      </div>
      <div className="receitas">
        <span>
          <strong>Receitas:  <span className="colorGreen">R$ {receita}</span></strong>
        </span>
      </div>
      <div className="despesas">
        <span>
          <strong>Despesas:  <span className="colorRed">R$ {despesa}</span></strong>
        </span>
      </div>
      <div className="saldos">
        <span>
          <strong>Saldo:  <span style={saldo >= 0 ? style.verde : style.vermelho}>R$ {saldo}</span></strong>
        </span>
      </div>
    </div>
  )
}
