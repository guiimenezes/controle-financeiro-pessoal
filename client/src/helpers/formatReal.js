function formatReal(numberToBeFormatted) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberToBeFormatted)
}

export { formatReal };
