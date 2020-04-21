const formatValue = (date: Date): string => {
  const parsedDate = date.toString().split('T')[0].split('-');
  const newDate = `${parsedDate[2]}/${parsedDate[1]}/${parsedDate[0]}`;
  return newDate;
};
// TODO

export default formatValue;
