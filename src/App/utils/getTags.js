export function getTags(tags) {
  let tagsSentence = "";
  for (const tag of tags) {
    tagsSentence === ""
      ? (tagsSentence += `#${tag}`)
      : (tagsSentence += `, #${tag}`);
  }
  return tagsSentence;
}
