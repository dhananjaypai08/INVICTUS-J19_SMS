
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
      <img src="https://images.unsplash.com/photo-1493020258366-be3ead1b3027?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" />
      <h3>Macbook</h3>
      <h6>$9999</h6>
      <a href="" class='btn_cart'>Add to Cart</a>
    </div>`;
    })
    .join("");
  products.insertAdjacentHTML("afterbegin", html);
}

// searchBar.addEventListener('keyup',(e)=>{
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
