export function transormDate(data) {
  const tData = new Date(data);
  const minutes =
    tData.getMinutes() < 10 ? `0${tData.getMinutes()}` : tData.getMinutes();
  const newData = `${tData.getDate()}.${
    tData.getMonth() + 1
  }.${tData.getFullYear()}, ${tData.getHours()}:${minutes}`;
  return newData;
}
