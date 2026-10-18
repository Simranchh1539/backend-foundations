/** Write a function that takes an array of numbers and returns a Promise that rejects with "negative number" 
 * if any value is negative, otherwise resolves with the sum. 
 * Test it with .then/.catch and again with async/await  */

//Function to check for negative numbers and return the sum of the array
function sumOfArray(numbers) {
  return new Promise((resolve, reject) => {
    if (numbers.some(num => num < 0)) {
      reject("negative number");
    } else {
      const sum = numbers.reduce((total, num) => total + num, 0);
      resolve(sum);
    }
  });
}

// Using .then() and .catch()
sumOfArray([3, -9, 15])
  .then(result => console.log("Sum of numbers are:", result))
  .catch(error => console.log("Error:", error));

// Using async/await
async function checkSum() {
  try {
    const result = await sumOfArray([3, 9, 15]);
    console.log("Sum of numbers are:", result);
  } catch (error) {
    console.log("Error:", error);
  }
}

checkSum();

//Output: first sumOfArray will reject with "negative number" and log the error, 
// while checkSum function using async/awaitwill resolve and log the sum of the array because there are no negative numbers.  
