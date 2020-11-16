import React from 'react'

export default function ListaFinancas(props) {
  const dados = props.information

  return (
    <div>
      <ul className="list">
        {dados.map((dado) => {
          const style = {
            lista: {
              backgroundColor: ""
            }
          }
          if (dado.type === '-') {
            style.lista.backgroundColor = "#FF6A6A"
          } else {
            style.lista.backgroundColor = "#90EE90"
          }
          return (
            <li key={dado._id} style={style.lista}>
              <div className="colunaSm"><span><strong style={{ "fontSize": "1.3rem" }}>{dado.day}</strong></span></div>
              <div className="colunaLg">
                <span>
                  <strong>{dado.category}</strong><br />
                  {dado.description}
                </span>
              </div>
              <div className="colunaMd valor"><span><strong>R$ {dado.value}</strong></span></div>
              <div className="colunaSm">
                <i className="material-icons botao" onClick={() => props.onClick(dado._id)} title={`Editar ${dado.category}`}>edit</i>
                <i><i className="material-icons botao" onClick={() => props.onDelete(dado._id, dado.yearMonth)} title={`Excluir ${dado.category}`}>delete</i></i>
              </div>
            </li>
          )
        })}

      </ul>
    </div>
  )
}
