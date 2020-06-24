function convertData(){
  // Pegando Dia e Mes (1 ou 2 Digitos)
  let dia = `${new Date().getDate()}`.length 
  let mes = `${new Date().getMonth()}`.length
var dt = undefined
  switch (mes) {
    case  1: // mes = 1 digito
      if(dia === 1){ //dia = 1 digito
        dt = `${new Date().getFullYear()}0${new Date().getMonth()+1}0${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
      } else {
        dt = `${new Date().getFullYear()}0${new Date().getMonth()+1}${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
      }
      console.log('<Dez ' + dt)
      break;

    case 2:
      if(dia === 2){
        dt = `${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
      } else {
        dt = `${new Date().getFullYear()}${new Date().getMonth()+1}0${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
      }
      console.log('>Dez '+dt)
      break;
  }
  return toString(dt)
}

module.export = convertData;