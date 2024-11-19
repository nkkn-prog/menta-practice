const getUrl = 'https://jsonplaceholder.typicode.com/photos'

// async, await, axiosを使ったやり方
const fetchData = async () => {
    const data = await fetch(getUrl)
    const json = await data.json()
    console.log(json)
}

fetchData()