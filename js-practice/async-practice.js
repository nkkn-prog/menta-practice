const getUrl = 'https://jsonplaceholder.typicode.com/photos'
const axios = require('axios');

// async, await, axiosを使ったやり方
// const fetchData = async () => {
//     const data = await fetch(getUrl)
//     const json = await data.json()
//     console.log(json)
// }

// fetchを使ったやり方
// fetch('https://jsonplaceholder.typicode.com/photos')
//     .then(response => response.json())
//     .then(postDate => console.log(postDate.slice(0,50)))


// fetchData()

// axiosを使ったやり方
const fetchData = async() => {
    try{
        const response = await axios.get(getUrl)
        console.log(response)
        console.log(response.status)
    } catch(error) {
        console.log(error.message)
    }

}
fetchData()