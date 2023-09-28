// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// Карточки для блога из blog.json
const blogItems = document.querySelector('.blog__items');
let data;
let startItem = 0;
let endItem = 3;
if (blogItems) {
   loadBlogItems();
}

async function loadBlogItems() {
   const response = await fetch('files/blog.json', {
      method: "GET"
   });
   if (response.ok) {
      const responseResult = await response.json();
      data = responseResult;
      initBlog(data, startItem, endItem);
   } else {
      alert("Error!");
   }
}

function initBlog(data, startItem, endItem) {
   const dataPart = data.items.slice(startItem, endItem);

   dataPart.forEach(item => {
      buildBlogItem(item);
   });
   viewMore();
}

function buildBlogItem(item) {
   let blogItemTemplate = ``;

   blogItemTemplate += `<article data-id="${item.id}" class="blog__item item-blog">`;
   item.image ? blogItemTemplate +=
      `<a href="${item.url}" class="item-blog__image-ibg">
         <img src="${item.image}" alt="Image">
      </a>`
      : null;
   
   blogItemTemplate += `<div class="item-blog__date">${item.date}</div>`;

   blogItemTemplate +=
      `<h4 class="item-blog__title">
         <a href="${item.url}" class="item-blog__link-title">${item.title}</a>
      </h4>`;
   
   blogItemTemplate +=
      `<div class="item-blog__text text">
         ${item.text}
      </div>`;
   
   if (item.tags) {
      blogItemTemplate += `<div class="item-blog__tags">`;
      for (const tag in item.tags) {
         blogItemTemplate += `<a href="${item.tags[tag]}" class="item-blog__tag">${tag}</a>`
      }
      blogItemTemplate += `</div>`;
   }
   blogItemTemplate += `</article>`;
   
   blogItems.insertAdjacentHTML('beforeend', blogItemTemplate);
}

document.addEventListener('click', documentActions);

function viewMore() {
   const dataItemsLength = data.items.length;
   const currentItems = document.querySelectorAll('.item-blog').length;
   const viewMore = document.querySelector('.blog__view-more');

   currentItems < dataItemsLength ? viewMore.hidden = false : viewMore.hidden = true;

   
}

function documentActions(e) {
   const targetElement = e.target;
   if (targetElement.closest('.blog__view-more')) {

      startItem = document.querySelectorAll('.item-blog').length;
      endItem = startItem + 3;

      initBlog(data, startItem, endItem);
      e.preventDefault();
   }
}

/*let spollerTitle = document.querySelectorAll('.spollers-questions__title');
let item = document.querySelectorAll('.spollers-questions__item');

document.addEventListener('DOMContentLoaded', function() {
   spollerTitle.addEventListener('click', function() {
      item.classList.toggle('open');
      if (item.classList.contains('open')) {
         item.style.backgroundColor = '#f3f5f9';
      } else {
      item.style.backgroundColor = '#fff';
      }
   });
});*/