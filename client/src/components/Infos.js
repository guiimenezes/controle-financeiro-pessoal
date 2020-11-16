import React from 'react'
import { formatReal } from '../helpers/formatReal'

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
      backgroundColor: "#cfcfc3",
      padding: "5px",
      fontWeight: "bold"
    },
    vermelho: {
      color: "red",
      backgroundColor: "#c3c3c3",
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
          <strong>Receitas:  <span className="colorGreen">{formatReal(receita)}</span></strong>
        </span>
      </div>
      <div className="despesas">
        <span>
          <strong>Despesas:  <span className="colorRed"> {formatReal(despesa)}</span></strong>
        </span>
      </div>
      <div className="saldos">
        <span>
          <strong>Saldo:  <span style={saldo >= 0 ? style.verde : style.vermelho}>{formatReal(saldo)}</span></strong>
        </span>
      </div>
    </div>
  )
}
