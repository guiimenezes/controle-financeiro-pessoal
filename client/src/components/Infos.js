import React from 'react'

export default function Infos({ information }) {
  // console.log(information.length)
  let receita = 0
  let despesa = 0
  // let saldo = 0

  information.forEach(val => {
    if (val.type === '+') {
      receita += val.value
    } else {
      despesa += val.value
    }
  })

  return (
    <div className="Infos">
      <div className="lancamentos">
        <span>
          <strong>Lançamenos: </strong> {information.length}
        </span>
      </div>
      <div className="receitas">
        <span>
          <strong>Receitas: </strong> R$ {receita}
        </span>
      </div>
      <div className="despesas">
        <span>
          <strong>Despesas: </strong> R$ {despesa}
        </span>
      </div>
      <div className="saldos">
        <span>
          <strong>Saldo: </strong> R$ {receita - despesa}
        </span>
      </div>
    </div>
  )
}
