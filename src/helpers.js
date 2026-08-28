export function gradText(text) {
  let output = text.replace("{", "<span class='grad-text'>").replace("}", "</span>");
  return output;
}