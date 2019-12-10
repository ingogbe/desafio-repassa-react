/*
 * Checa se um variavel está vazia, funciona para os tipos 'Array', 'String' e 'Object'
 * Variaveis 'undefined' ou 'null' automaticamente retornarão 'false'
 */
export const isEmpty = (obj) => {
   if(obj){
      if((obj.constructor === Array) || (obj.constructor === String)){
         return obj.length === 0;
      }
      else if(obj.constructor === Number){
         return obj === 0;
      }
      else{
         for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
               return false;
            }
         }
      
         return JSON.stringify(obj) === JSON.stringify({});
      }
   }
   else{
      return true;
   }
}

export const convertDate = (date) => {
   var stringDate = 
      date.getFullYear() + "-" + 
      (date.getMonth() > 9 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + 
      (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()));

   return stringDate;
}