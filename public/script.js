

search = () =>{
    keyword = document.querySelector('.search').value


    fetch(`/api/scrape/?keyword=${keyword}`)
        .then(res => res.json()).then(data => data.forEach((e, i) => {
            grid = document.querySelector('.grid')
            product = document.createElement("a")
            productContainer = document.createElement("div")
            reviewContainer = document.createElement("div")
            product.classList.add('product')
            productContainer.classList.add('productContainer')
            reviewContainer.classList.add('reviewContainer')
            product.href = e.id
            title = document.createElement('h1')
            title.innerHTML = e.title
            img = document.createElement("img")
            img.src = e.img
            img.classList.add('productImg')
            price = document.createElement('h2')
            price.innerHTML = '$' + e.price
            stars = document.createElement('h3')
            stars.innerHTML = e.stars
            starImg = document.createElement('img')
            starImg.classList.add('starImg')
            starImg.src = 'https://www.svgrepo.com/show/513511/star.svg'
            reviews = document.createElement('h3')
            reviews.innerHTML = e.reviews + ' reviews'


            product.appendChild(img)
            productContainer.appendChild(title)
            reviewContainer.appendChild(stars)
            stars.appendChild(starImg)
            reviewContainer.appendChild(reviews)
            productContainer.appendChild(reviewContainer)
            product.appendChild(productContainer)
            productContainer.appendChild(price)
            grid.appendChild(product)
            loading.remove()
        })).catch(error => console.log('ERROR'))
}




window.addEventListener("DOMContentLoaded", (event) => {
    var input = document.querySelector('.search');

    if(input){
        input.addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
              // Cancel the default action, if needed
              event.preventDefault();
              grid = document.querySelector('.grid')

              
            grid.innerHTML = ''
              // Trigger the button element with a click
              document.querySelector('.btn').click();
              
              input.value = ""

              loading = document.createElement('h1')
              loading.innerHTML = 'Loading...'
              grid.appendChild(loading)
            }
          });
    }
})