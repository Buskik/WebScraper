search = () =>{

    
                grid = document.querySelector('.grid')
                grid.innerHTML = ''
                //Loading message
                loading = document.querySelector('.loading')
                loading.style.display = "flex"
    //Getting keyword from input
    keyword = document.querySelector('.search').value

    //Fetching scrape API
    fetch(`/api/scrape/?keyword=${keyword}`)
        .then(res => res.json()).then(data => {
            //Selecting best choice based on cost-benefit rate
            products = data.map((e) => e)
            productsBenefit = data.map((e) => e.benefit)
            bestBenefit = Math.max(...productsBenefit)
            best = products.find(e => e.benefit === bestBenefit)


            //Mapping best choice
            grid = document.querySelector('.grid')
            product = document.createElement("a")
            productContainer = document.createElement("div")
            reviewContainer = document.createElement("div")
            priceContainer = document.createElement("div")
            product.classList.add('best')
            productContainer.classList.add('productContainer')
            reviewContainer.classList.add('reviewContainer')
            priceContainer.classList.add('priceContainer')
            product.href = best.id
            title = document.createElement('h1')
            title.innerHTML = best.title
            img = document.createElement("img")
            img.src = best.img
            img.classList.add('productImg')
            price = document.createElement('h2')
            price.innerHTML = '$' + best.price
            text = document.createElement('h2')
            text.innerHTML = 'Best Choice!'
            stars = document.createElement('h3')
            stars.innerHTML = best.stars
            starImg = document.createElement('img')
            starImg.classList.add('starImg')
            starImg.src = 'https://www.svgrepo.com/show/513511/star.svg'
            reviews = document.createElement('h3')
            reviews.innerHTML = best.reviews + ' reviews'
            

            product.appendChild(img)
            priceContainer.appendChild(price)
            priceContainer.appendChild(text)
            productContainer.appendChild(title)
            reviewContainer.appendChild(stars)
            stars.appendChild(starImg)
            reviewContainer.appendChild(reviews)
            productContainer.appendChild(reviewContainer)
            product.appendChild(productContainer)
            productContainer.appendChild(priceContainer)
            grid.appendChild(product)


            data.forEach((e, i) => {
            //Creating and Selecting HTML elements
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

            //Mapping products on grid
            product.appendChild(img)
            productContainer.appendChild(title)
            reviewContainer.appendChild(stars)
            stars.appendChild(starImg)
            reviewContainer.appendChild(reviews)
            productContainer.appendChild(reviewContainer)
            product.appendChild(productContainer)
            productContainer.appendChild(price)
            grid.appendChild(product)
            loading.style.display = 'none'
        })}).catch(error => console.log('ERROR'))
}




window.addEventListener("DOMContentLoaded", (event) => {
    var input = document.querySelector('.search');

    if(input){
        input.addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
              document.querySelector('.btn').click();

                  //Cleaning grid
                    grid = document.querySelector('.grid')
                    grid.innerHTML = ''
                    //Cleaning input

                //Loading message
                loading = document.querySelector('.loading')
                loading.style.display = "flex"
                

              
            }
          });
    }
})