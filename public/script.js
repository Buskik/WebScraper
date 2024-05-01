

search = () =>{
    keyword = document.querySelector('.search').value


    fetch(`http://localhost:3000/api/scrape/?keyword=${keyword}`)
        .then(res => res.json()).then(data => data.forEach((e) => console.log(e.benefit))).catch(error => console.log('ERROR'))
}



