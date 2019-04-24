const shortenName = (name, length = 12) => {
  return name.substr(0, length) + (name.length > length ? '…' : '')
}

export default shortenName
