//sumArrayPromise.Напишіть функцію, яка приймає масив чисел як аргумент і повертає Promise. 
//Promise має бути виконаний через 3 секунди і повернути суму всіх чисел із масиву.

function sumArrayPromise(arr){
  return new Promise((resolve) => {
    setTimeout(() => {
        const sum = arr.reduce((a, b) => a + b, 0);
        resolve(sum);
    }, 3000);
});
}

sumArrayPromise([1, 2, 3, 4, 5]).then((sum) => {
  console.log(sum);})
// 15;


//concurrentPromises.Створіть функцію concurrentPromises, яка приймає масив промісів і 
//максимальну кількість промісів, що виконуються одночасно. Функція має виконати проміси паралельно, 
//але не більше зазначеної максимальної кількості. 
//Результатом функції має бути масив результатів промісів.

function concurrentPromises(promises, number) {
  return new Promise((resolve, reject) => {
      let results = [];
      let goProm = [];
      let i = 0;

     function promiseArr() {
          if (i === promises.length && goProm.length === 0) {
              resolve(results);
              return;
          }

          while (goProm.length < number && i < promises.length) {
              const currentPromise = promises[i];
              const x = currentPromise.then(result => {
                  results[i] = result;
                  goProm.splice(goProm.indexOf(x), 1);
                  promiseArr();
              });

              goProm.push(x);
              i++;
          }
      }

      promiseArr();
  });
}


concurrentPromises([
	new Promise(resolve => setTimeout(() => resolve('Promise 1'), 1000)),
	new Promise(resolve => setTimeout(() => resolve('Promise 2'), 500)),
	new Promise(resolve => setTimeout(() =>resolve('Promise 3'), 800))
], 2).then(results => {
  console.log(results); 
})





//sequenceAsync.Реалізуйте функцію sequenceAsync, яка приймає масив функцій-промісів asyncFunctions. 
//Кожна функція-проміс приймає попередній результат як аргумент і повертає новий результат. 
//Функція sequenceAsync має виконати проміси послідовно, передаючи результат попереднього промісу 
//в наступний. Зверніть увагу, що вам потрібно надати реалізацію функції sequenceAsync, 
//яка дозволяє виконувати довільну кількість функцій-промісів у правильному порядку.

async function sequenceAsync(asyncFunctions) {
  let results = [];
  
  try {
      for (const asyncFunction of asyncFunctions) {
          const previousResult = results.length > 0 ? results[results.length - 1] : undefined;
          const currentResult = await asyncFunction(previousResult);
          results.push(currentResult);
      }
      return results;
  } catch (err) {
      throw err; 
  }
}


const asyncFunc1 = async (prevResult) => {
  console.log("Function 1, previous result:", prevResult);
  return 1;
};

const asyncFunc2 = async (prevResult) => {
  console.log("Function 2, previous result:", prevResult);
  return prevResult + 2;
};

const asyncFunc3 = async (prevResult) => {
  console.log("Function 3, previous result:", prevResult);
  return prevResult * 3;
};

sequenceAsync([asyncFunc1, asyncFunc2, asyncFunc3])
  .then(result => console.log("Final result:", result))
  .catch(err => console.error("Error:", err));