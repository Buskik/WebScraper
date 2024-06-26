//Initializing libs
const express = require('express');
const app = express();
const path = require('path');
const { JSDOM } = require('jsdom');
const axios = require('axios');

//Serving static html page
app.use(express.static(path.join(__dirname, 'public')));
//Opening server to localhost:3000
app.listen(3000);



;
//Fetching data
async function getData(keyword) {
    //Getting the search url based on the keyword
    const productUrl = `https://www.amazon.com/s?k=${keyword}`
    const { data } = await axios.get(productUrl, {
        //Turning the request more "human" by setting the headers of a normal browser
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept-Language': 'pt,en;q=0.9',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            Host: 'www.amazon.com',
            'Upgrade-Insecure-Requests': 1
        },
    });

    //Getting HTML with JSDOM
    const dom = new JSDOM(data);
    //Facilitating the usage of querySelectorAll
    const $ = (e) => dom.window.document.querySelectorAll(e);

    //Localizing all properties of products by attributes and classes
    products = []
    product = 'div[data-asin] span.a-price-symbol';
    priceWhole = 'div[data-asin] span.a-price-whole';
    priceFraction = 'div[data-asin] span.a-price-fraction';
    title = 'div[data-asin] div[data-cy="title-recipe"]'
    stars = 'div[data-asin] span.a-icon-alt'
    reviews = 'div[data-asin] div[data-csa-c-content-id="alf-customer-ratings-count-component"]'
    img = 'div[data-asin] img.s-image'

    //Iterating through all products
    $(product).forEach(function (e, i){

        //Fetching data from html tags
        productId = 'https://www.amazon.com' + $('div[data-asin] div[data-cy="title-recipe"] .a-link-normal').item(i).getAttribute('href')
        productPrice = Number($(priceWhole).item(i).textContent + $(priceFraction).item(i).textContent )
        productTitle = $(title).item(i).textContent
        productImage = $(img).item(i).getAttribute('src')

       
        //Exceptions for null properties
        if  ($(stars).item(i) != null){
            productStars = $(stars).item(i).textContent
        } else {
            productStars = "No reviews found"
        }
        if ($(reviews).item(i) != null){
        productReviews = $(reviews).item(i).textContent
        } else {
            productReviews = "No reviews found"
        }

        //Parsing and formatting strings to numbers
        starsMatches = productStars.match(/\d+/g)
        reviewsMatches = productReviews.match(/\d+/g)
        if (starsMatches){
            starsMatches.pop()
            productStars = Number(starsMatches.join('.'))
        }
        if (reviewsMatches){
            productReviews = Number(productReviews.replace(',', ''))
        }
        
        //Calculating the cost-benefit rate of each product
        costBenefitRate = ((productStars * productReviews) / productPrice)

        //Handling exceptions (null properties)
        if (isNaN(costBenefitRate) || costBenefitRate === null || productPrice === 0 ){
            costBenefitRate = 0;
        }
        //Pushing and formatting products to array
        products.push({"id": productId,"title":productTitle, "price": productPrice , "stars": productStars, "reviews": productReviews, "img": productImage, "benefit": costBenefitRate})
        
    })

    //Testing manipulating data in products array
   
    
}

//API Endpoint with JSON
app.get('/api/scrape',(req,res) => {
    async function scrape() {
       await getData(req.query.keyword)
       res.json(products)
    }
    scrape()
})

//Calling function using keyword



