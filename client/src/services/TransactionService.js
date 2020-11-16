import http from '../http-common'

const getAnoMes = (periodo, description = "") => {
  return http.get(`/api/transaction/?period=${periodo}&description=${description}`)
}

const getAll = () => {
  return http.get(`/api/transaction/find`)
}

const findOne = (id) => {
  return http.get(`/api/transaction/findOne/${id}`)
}

const create = (data) => {
  return http.post('/api/transaction/', data);
};

const update = (id, data) => {
  return http.patch(`/api/transaction/update/${id}`, data)
}

const deletar = (id) => {
  return http.delete(`/api/transaction/delete/${id}`)
}

export default { getAnoMes, getAll, findOne, create, update, deletar }