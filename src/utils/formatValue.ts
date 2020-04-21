const formatValue = (value: number): string => {
  return `${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)}`;
};
// TODO

export default formatValue;
