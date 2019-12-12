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

export const hashToArr = (hash) => {
   var arr = [];

   for(var prop in hash) {
      arr.push(hash[prop]);
   }

   return arr;
}

export const convertDate = (date) => {
   var stringDate = 
      date.getFullYear() + "-" + 
      (date.getMonth() > 9 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + 
      (date.getDate() > 9 ? date.getDate() : ("0" + date.getDate()));

   return stringDate;
}

export const randomIntFromInterval = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

export const objectFilter = (obj, predicate) => {
   var result = {}, key;

   for (key in obj) {
       if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
           result[key] = obj[key];
       }
   }

   return result;
};

export const createNotification = (title, message) => {
   return {
      title: title,
      message: message,
      position: 'br',
      autoDismiss: 3,
    };
}