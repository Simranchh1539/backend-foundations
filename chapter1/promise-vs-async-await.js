// Promise Chaining using .then() and .catch()

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data fetched successfully')
        }, 1000)
    })
}

console.log('Using Promise Chaining')

fetchData()
    .then((result) => {
        console.log('First then:', result)
        return 'First then completed'
    })
    .then((result) => {
        console.log('Second then:', result)
    })
    .catch((error) => {
        console.error('Error:', error)
    })

//Promise using async/await

async function fetchDataUsingAsyncAwait() {
    try {
        const result = await fetchData()

        console.log('First await:', result)

        const secondResult = 'First await completed'

        console.log('Second await:', secondResult)
    } catch (error) {
        console.error('Error:', error)
    }
}

setTimeout(async () => {
    console.log('Using Async/Await')

    await fetchDataUsingAsyncAwait()
}, 1500)