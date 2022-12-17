export function transormData(data) {
  const tData = new Date(data);
  const minutes =
    tData.getMinutes() < 10 ? `0${tData.getMinutes()}` : tData.getMinutes();
  const newData = `${tData.getDate()}.${tData.getMonth()}.${tData.getFullYear()}, ${tData.getHours()}:${minutes}`;
  return newData;
}
