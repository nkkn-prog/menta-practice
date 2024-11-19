// fetchを使ったやり方
fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json())
    .then(postDate => console.log(postDate.slice(0,50)))
