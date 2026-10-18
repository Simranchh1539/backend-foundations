/** Run Promise.allSettled on 4 Promises where 2 resolve and 2 reject. 
 * Log the status and value/reason of each result. */

function sumOfArray(numbers) {
  return new Promise((resolve, reject) => {
    if (numbers.some(num => num < 0)) {
      reject("Rejected because of negative number exist in array");
    } else {
      const sum = numbers.reduce((total, num) => total + num, 0);
      resolve(sum);
    }
  });
}

const promises = [
  sumOfArray([3, 9, 15]), //output: resolved because of no negitive number
  sumOfArray([3, 15, 94]),  //output: resolved because of no negative number
  sumOfArray([3, -9, 15]),  //output: rejected because of negative number
  sumOfArray([-3, 9, 6])   //output: rejected because of negative number
];

Promise.allSettled(promises).then(results => {
  results.forEach((result, index) => {
    console.log(`Case ${index + 1}:`);
    console.log("Status:", result.status);

    if (result.status === "fulfilled") {
      console.log("Value:", result.value);
      console.log(`Sum is: ${result.value}. Because there are no negative numbers in the array.`);
    } else {
      console.log(`Reason is: ${result.reason}.`);
    }
  });
});

