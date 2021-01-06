/* global loading */
/* global  cart*/
/* exported doImgUrl */
/* eslint-disable no-unused-vars */

function getProductData(category, keyword) {
  const productReq = new XMLHttpRequest();
  let url = "";
  if (category === "search") {
    url = `https://api.appworks-school.tw/api/1.0/products/search?keyword=${keyword}`;
  } else if (
    category === "women" ||
    category === "men" ||
    category === "accessories" ||
    category === "all"
  ) {
    url = `https://api.appworks-school.tw/api/1.0/products/${category}?paging=${keyword}`;
  }
  productReq.open("GET", url, true);
  productReq.send();
  productReq.onreadystatechange = () => {
    if (productReq.readyState === 4 && productReq.status === 200) {
      loading();
      const productData = JSON.parse(productReq.responseText);
      outputData(productData);
    }
  };
}
var scrollSwitch = 0;

const contain = document.querySelector(".containFeature");
function outputData(productData) {
  // console.log(productData.data);
  if (productData.data.length === 0 && qq === 1) {
    // console.log("GG");
    let searchnothing = document.createElement("h2");
    searchnothing.textContent = "沒有找到任何相關商品喔！";
    contain.appendChild(searchnothing);
  }
  // console.log(productData.next_paging);

  if (productData.next_paging) {
    scrollSwitch = 1;
  } else {
    scrollSwitch = 0;
  }
  productData.data.forEach((item) => {
    let product = document.createElement("div");
    product.className = "product";
    contain.appendChild(product);

    let Id = item.id;
    let productId = document.createElement("a");
    productId.href = "./page.html?id=" + Id;
    product.appendChild(productId);

    let productImg = item.main_image;
    let main_image = document.createElement("img");
    main_image.src = productImg;
    main_image.alt = "product_image";
    main_image.style.width = "100%";
    productId.appendChild(main_image);

    let productColors = item.colors;
    productColors.forEach((productColor) => {
      let color = document.createElement("div");
      color.className = "productColor";
      color.style.backgroundColor = `#${productColor.code}`;
      productId.appendChild(color);
    });

    let productName = item.title;
    let title = document.createElement("p");
    title.className = "productIntro";
    title.textContent = productName;
    productId.appendChild(title);

    let productPrice = item.price;
    let price = document.createElement("p");
    price.className = "productPrice";
    price.textContent = `TWD.${productPrice}`;
    productId.appendChild(price);
  });
}

const womenMenu = document.getElementById("women");
const menMenu = document.getElementById("men");
const accessoriesMenu = document.getElementById("accessories");

var qq = 1;
function addMore(category) {
  window.addEventListener("scroll", function () {
    let footerBottom = document
      .querySelector(".footerNav")
      .getBoundingClientRect().bottom;
    var screenHeight = window.screen.availHeight;
    // console.log(footerBottom);
    // console.log(screenHeight);
    if (footerBottom <= screenHeight && scrollSwitch === 1) {
      getProductData(`${category}`, qq);
      qq += 1;
    }
  });
}

if (location.search === "?tag=women") {
  contain.innerHTML = "";
  womenMenu.className = "itemChoose";
  menMenu.className = "itemNotChoose";
  accessoriesMenu.className = "itemNotChoose";
  getProductData("women", 0);
  addMore("women");
} else if (location.search === "") {
  contain.innerHTML = "";
  getProductData("all", 0);
  addMore("all");
} else if (location.search === "?tag=men") {
  contain.innerHTML = "";
  womenMenu.className = "itemNotChoose";
  menMenu.className = "itemChoose";
  accessoriesMenu.className = "itemNotChoose";
  getProductData("men", 0);
} else if (location.search === "?tag=accessories") {
  contain.innerHTML = "";
  womenMenu.className = "itemNotChoose";
  menMenu.className = "itemNotChoose";
  accessoriesMenu.className = "itemChoose";
  getProductData("accessories", 0);
} else {
  contain.innerHTML = "";
  let locationstring = location.search;
  var locationTag = "";
  for (i = 5; i < locationstring.length; i++) {
    locationTag += locationstring[i];
  }
  getProductData("search", locationTag);
}

function getMarketData(category) {
  const marketReq = new XMLHttpRequest();
  let url = "";
  if (category === "campaigns") {
    url = `https://api.appworks-school.tw/api/1.0/marketing/campaigns`;
  }
  marketReq.open("GET", url, true);
  marketReq.send();
  marketReq.onreadystatechange = () => {
    if (marketReq.readyState === 4 && marketReq.status === 200) {
      const campaignData = JSON.parse(marketReq.responseText);
      outputcampaignData(campaignData);
    }
  };
}

// const campaignContain = document.querySelector(".campaignFeature");
function outputcampaignData(campaignData) {
  // console.log(campaignData);
  campaignData.data.forEach((item) => {
    let imageList = document.querySelector(".imgList");
    let storyList = document.querySelector(".storyList");
    // let dotList = document.querySelector(".dotList");

    let Id = item.product_id;
    let campaignImage = item.picture;
    let campaignStory = item.story;
    let campaignId = item.id;
    // let imgli = document.createElement("li");
    let image = document.createElement("img");
    let imageurl = document.createElement("div");
    let imageDot = document.createElement("span");

    image.id = Id;
    image.className = "imgSlide";
    image.src = campaignImage;
    image.alt = "campaign_image";
    image.setAttribute("onclick", "doImgUrl()");
    image.setAttribute("onmouseover", "stopthepage()");
    image.setAttribute("onmouseout", "restartthepage()");
    // image.setAttribute("onmouseover",'console.log("3")');
    // imageDot.className = "dot" `'imgdot" + productId`;
    imageDot.className = "imgdot";
    imageDot.setAttribute("onclick", "gotopage" + campaignId + "()");
    imageurl.appendChild(image);
    imageList.appendChild(imageurl);
    document.querySelector(".dotList").appendChild(imageDot);

    // let stoli = document.createElement("li");
    let story = document.createElement("pre");
    story.className = "storySlide";
    // story.className = "campaignStory";
    story.textContent = campaignStory;
    // stoli.appendChild(story);
    storyList.appendChild(story);
  });
  // var x = document.getElementsByClassName("imgSlide");
  // console.log(x);
  campaigncircus();
}

function doImgUrl() {
  let A = document.getElementsByClassName("imgSlide");
  for (var i = 0; i < A.length; i++) {
    if (A[i].style.opacity == 1) {
      window.location.href = "./page.html?id=" + A[i].id;
    }
  }
}

getMarketData("campaigns");
var i;
var myIndex = 0;
var x = document.getElementsByClassName("imgSlide");
var y = document.getElementsByClassName("storySlide");
var z = document.getElementsByClassName("imgdot");

var timer;
function campaigncircus() {
  for (i = 0; i < x.length; i++) {
    x[i].style.opacity = "0";
    y[i].style.opacity = "0";
    z[i].style.backgroundColor = "#bbb";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  // console.log(myIndex);
  x[myIndex - 1].style.opacity = "1";
  y[myIndex - 1].style.opacity = "1";
  z[myIndex - 1].style.backgroundColor = "#000";
  // Change image every 2 seconds
  // console.log(myIndex);
}

timer = setInterval(campaigncircus, 5000);

function gotopage1() {
  x[0].style.opacity = "1";
  x[1].style.opacity = "0";
  x[2].style.opacity = "0";
  y[0].style.opacity = "1";
  y[1].style.opacity = "0";
  y[2].style.opacity = "0";
  z[0].style.backgroundColor = "#000";
  z[1].style.backgroundColor = "#bbb";
  z[2].style.backgroundColor = "#bbb";
  i = 0;
  myIndex = 1;
}
function gotopage2() {
  x[0].style.opacity = "0";
  x[1].style.opacity = "1";
  x[2].style.opacity = "0";
  y[0].style.opacity = "0";
  y[1].style.opacity = "1";
  y[2].style.opacity = "0";
  z[0].style.backgroundColor = "#bbb";
  z[1].style.backgroundColor = "#000";
  z[2].style.backgroundColor = "#bbb";
  i = 1;
  myIndex = 2;
  // console.log("2");
}
function gotopage3() {
  x[0].style.opacity = "0";
  x[1].style.opacity = "0";
  x[2].style.opacity = "1";
  y[0].style.opacity = "0";
  y[1].style.opacity = "0";
  y[2].style.opacity = "1";
  z[0].style.backgroundColor = "#bbb";
  z[1].style.backgroundColor = "#bbb";
  z[2].style.backgroundColor = "#000";
  i = 2;
  myIndex = 3;
  clearInterval(timer);
  // console.log("3");
}

function stopthepage() {
  clearInterval(timer);
}
function restartthepage() {
  timer = setInterval(campaigncircus, 5000);
}

window.onload = function cartToShow() {
  if (window.localStorage.cart) {
    cart.order.list = JSON.parse(
      window.localStorage.getItem("cart")
    ).order.list;
    document.querySelector(".cart-qty").textContent = cart.order.list.length;
    document.querySelector(".qty-mobile").textContent = cart.order.list.length;
  }
};

// function goToCart() {
//   window.location = "./cart.html";
// }

// function gotoHome() {
//   window.location = "./index.html";
// }
