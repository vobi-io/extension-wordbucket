const getSelectedText = () => {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString()
  } else if (document.selection && document.selection.type !== 'Control') {
    text = document.selection.createRange().text
  }
  return text
}

export { getSelectedText }
