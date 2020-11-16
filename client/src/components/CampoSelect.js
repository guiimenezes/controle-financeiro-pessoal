import React, { useState } from 'react'
import Select from 'react-select'
import formataData from '../helpers/formataData.js'


export default function CampoSelect(props) {
  const options = []
  const [valor, setValor] = useState("")
  props.dados.forEach(cada => {
    options.push({ value: cada, label: cada })
  })

  const mudaData = (valor) => {
    props.retornaTransaction(valor)
    setValor(valor)
  }

  return (
    <div className="campoSelect">
      <label>
        <Select
          options={options}
          valor={valor || formataData(Date.now())}
          defaultValue={{ label: valor || formataData(Date.now()), value: valor || formataData(Date.now()) }}
          onChange={valor => mudaData(valor)} />
      </label>
    </div>
  )
}
