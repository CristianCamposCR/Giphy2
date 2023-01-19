const API_KEY = `greXyFIkco3uYdWxNIhMJe2qBCRkUERw`;
const inputSearch = document.getElementById("search");
const gifs = document.getElementById("gifs")
const content = document.getElementById("content")
const contentRandom = document.getElementById("contentrandom")

let btnSearch = document.getElementById("searching");
let btnRandom = document.getElementById("random");

let searchContent = () => {
  gifs.innerHTML = "";
  contentRandom.style.display = "none"
  content.style.display = "block"
  inputSearch.value = ""
}

let randomContent = () => {
  gifs.innerHTML = "";
  content.style.display = "none"
  contentRandom.style.display = "block"
  generateRandom();

}

btnSearch.addEventListener("click", searchContent);
btnRandom.addEventListener("click",randomContent);


 async function generateRandom() {
 let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
 const data = await response.json();
 contentRandom.innerHTML = `<img src="${data.data.images.original.url}" class="mb-3 ms-1 img-thumnail" alt="${data.title}"  width="400" height="400">`;

}

inputSearch.onkeyup = async (event) => {
  event.preventDefault();
  //console.log(event);
  if (event.keyCode !== 13) return;
  gifs.innerHTML = "";
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${inputSearch.value}`); //aqui va el endpoint o url
  const data = await response.json();
  console.log(data);
  //for (let i = 0; i < data.data.length; i++) {
  // const gif = document.createElement('img');
  // gif.src = data.data[i].images.original.url;
  // gif.height = 200
  // gif.width = 200
  // document.getElementById("gifs").appendChild(gif);
  //document.getElementById("gifs").innerHTML += `<img src="${data.data[i].images.original.url}" alt="" width="200" height="200">`
  let content = ``;
  data.data.map((gif, index) => {//solo un parametro es el elemento dos parametros es el indice.
    content += `
      <img src="${gif.images.original.url}" class="mb-3 ms-1 img-thumnail" alt="${gif.title}"  width="200" height="200">`;
  });

  gifs.innerHTML = content;

  //}
}