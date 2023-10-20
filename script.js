const accesskey = "VHN1nz8gJ4oMUf9UWseKZA1QHLTOEpOwn9Yl_ORAHU4"

const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = ""
let page= 1;

async function searchImages(){
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        searchResults.innerHTML = "";
    }
    results.map((result) =>{
        const imageWrappper = document.createElement("div");
        imageWrappper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html ;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrappper.appendChild(image);
        imageWrappper.appendChild(imageLink);
        searchResults.appendChild(imageWrappper);
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formE1.addEventListener("submit",(event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});
showMore.addEventListener("click", () => {
    searchImages();
})