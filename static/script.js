const products = document.querySelector('.products');
const searchBar = document.querySelector('.search-bar');
const btnEdit = document.querySelector('.edit');
const btnDelete = document.querySelector('.delete');
const bookTitle = document.querySelector('.title');
const price = document.querySelector('.price');
const description = document.querySelector('description');

const getBooks = async function(){
  // const res = await books;
  // const books = await res.json();
  //  printBooks(getBooks);
}
getBooks();

const printBooks = function (books){
  const html = books
    .map((book) => {
      return `<div class="product">
      <img src=${book.imglink} alt="" />
      <h3>${book.bookname}</h3>
      <p>${book.description}</p>
      <p>Usage : ${book.usage}</p>
      <h6>$${book.bookprice}</h6>
      <a href="" class='btn_product'>Buy</a>
    </div>`;
    })
    .join("");
  products.insertAdjacentHTML("afterbegin", html);
}

// searchBar.addEventListener('keyup',(e)=>{
    // e.preventDefault();;
//   const searcString = e.target.value;
//   books.filter(book=> book.title.contain(searcString))
// });

btnEdit.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log(e.target);
  bookTitle.value = book.title;
  price.value = book.price;
  description.value = book.description;
})
