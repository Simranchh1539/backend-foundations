import { urls } from "../utils/constant.js"
import { formatDateandTime } from "../utils/helper.js"

// Sequential fetching using await
async function fetchURLSSequentially() {
    const startTime = Date.now()

    console.log('SEQUENTIAL FETCH Using for...of loop')

    //Log start time of sequential fetching using for...of loop
    console.log('Start Time:', formatDateandTime())

    for (const url of urls) {
        const response = await fetch(url)
        await response.json()

        console.log('Fetched:', url)
    }

    //Log end time of sequential fetching using for...of loop
    console.log('End Time:', formatDateandTime())

    //Log total time taken for sequential fetching using for...of loop in milliseconds
    console.log('Total Time:', Date.now() - startTime, 'ms')
}

// Fetching all URLs using Promise.all
async function fetchURLSWithPromiseAll() {
    const startTime = Date.now()

    console.log('Fetch URLS Using Promise.all')

    //Log start time of fetching all URLs using Promise.all
    console.log('Start Time:', formatDateandTime())

    const promises = urls.map(async (url) => {
        const response = await fetch(url)
        return response.json()
    })

    await Promise.all(promises)

    //Log end time of fetching all URLs using Promise.all
    console.log('End Time:', formatDateandTime())

    //Log total time taken for fetching all URLs using Promise.all in milliseconds
    console.log('Total Time:', Date.now() - startTime, 'ms')
}

// Run both approaches
async function fetchURLS() {
    await fetchURLSSequentially()

    await fetchURLSWithPromiseAll()

    /*** Why Promise.all is faster */
    // Promise.all is faster because it allows multiple requests to run concurrently.
    // With sequential fetching, the total time is the combined time of each request,
    // whereas Promise.all completes when the slowest request finishes.

    /*** When to use sequential fetching */
    // Sequential fetching is useful when requests depend on each other
    // or when we need to control the order of execution.
}

fetchURLS()