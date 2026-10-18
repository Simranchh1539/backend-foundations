/*** Demonstrate microtask vs macrotask order: write a script with setTimeout(fn, 0) , Promise.resolve().then(fn) , and process.nextTick(fn) - 
 * predict the output order before running it, then verify. */


function processPayment(amount) {
  console.log(`1. Payment request received: ${amount}`); //2nd in output

  // Microtask: update the payment status.
  Promise.resolve().then(() => {
    console.log('3. Payment status updated: SUCCESS'); //5th in ES 6th in CommonJS
  });

  // Next-tick callback
  process.nextTick(() => {
    console.log('4. Internal record tracking callback executed'); //6th is ES 5th in CommonJS
  });

  // Macrotask timer
  setTimeout(() => {
    console.log('5. Receipt notification scheduled'); //7th in output
  }, 0);

  console.log('2. Payment processing initiated'); //3rd in output
}


console.log('Payment service started');  //1st in output

processPayment(550); //log first console then schedule callbacks

console.log('other requests'); //4th in output

//Learning mistake: i predict other requests log first then payment processing's 
// first log console i predict