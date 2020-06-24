const newDate = () => {
  const date = `${new Date().getFullYear()}0${new Date().getMonth()+1}${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
}

module.exports = newDate;