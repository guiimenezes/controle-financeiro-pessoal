import moment from "moment";

function formataData(date) {
  // date_create: moment().format("DD-MM-YYYY hh:mm:ss")
  return moment().format("YYYY-MM")
}

export default formataData