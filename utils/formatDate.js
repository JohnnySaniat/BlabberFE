function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear() % 100;

  return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
}

export default formatDate;
