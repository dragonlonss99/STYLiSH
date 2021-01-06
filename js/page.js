/* global cart */
/* global loading */
/* eslint-disable no-unused-vars */

const chosen = { color: { code: "", name: "" }, size: "", stock: "" };

// console.log(chosen.color);
function getProductData(category, keyword) {
  // loading();
  const productReq = new XMLHttpRequest();
  let url = "";
  if (category === "details") {
    url = `https://api.appworks-school.tw/api/1.0/products/details?id=${keyword}`;
  }
  productReq.open("GET", url, true);
  productReq.send();
  productReq.onreadystatechange = () => {
    if (productReq.readyState === 4 && productReq.status === 200) {
      loading();
      const productData = JSON.parse(productReq.responseText).data;
      outputData(productData);
    }
  };
}
let productVariants;
function outputData(productData) {
  // console.log(productData);
  let id = productData.id;
  // let category = productData.category;
  let title = productData.title;
  let description = productData.description;
  let price = productData.price;
  let texture = productData.texture;
  let wash = productData.wash;
  let place = productData.place;
  let note = productData.note;
  let story = productData.story;
  let main_image = productData.main_image;
  let images = productData.images;
  let variants = productData.variants;
  let colors = productData.colors;
  let sizes = productData.sizes;
  // console.log(variants);
  productVariants = variants;
  mainImgContent = main_image;
  document.querySelector(".Image").src = main_image;
  document.querySelector(".Image").alt = "main_image";
  document.querySelector(".productTitle").textContent = title;
  document.querySelector(".productId").textContent = id;
  priceContent = price;
  document.querySelector(".productPrice").textContent = "TWD. " + price;

  let colorBlock = document.querySelector(".colorBlock");
  for (var i = 0; i < colors.length; i++) {
    let color = document.createElement("div");
    color.className = "color";
    color.style.backgroundColor = `#${colors[i].code}`;
    color.id = colors[i].code;
    color.title = colors[i].name;
    color.setAttribute("onclick", "colorChose(this)");
    colorBlock.appendChild(color);
  }

  let sizeBlock = document.querySelector(".sizeBlock");
  for (let i = 0; i < sizes.length; i++) {
    let size = document.createElement("div");
    size.className = "size";
    size.textContent = sizes[i];
    size.id = sizes[i];
    size.setAttribute("onclick", "sizeChose(this)");
    sizeBlock.appendChild(size);
  }
  let productSummary = document.querySelector(".productSummary");
  let noteText = document.createElement("pre");
  let textureText = document.createElement("pre");
  let descriptionText = document.createElement("pre");
  let washText = document.createElement("pre");
  let placeText = document.createElement("pre");
  noteText.textContent = note;
  textureText.textContent = texture;
  descriptionText.textContent = description;
  washText.textContent = "清洗：" + wash;
  placeText.textContent = "產地：" + place;

  productSummary.appendChild(noteText);
  productSummary.appendChild(textureText);
  productSummary.appendChild(descriptionText);
  productSummary.appendChild(washText);
  productSummary.appendChild(placeText);

  document.querySelector(".productStory").textContent = story;
  document.querySelector("secondImage");
  let imageBlock = document.querySelector(".imageBlock");
  for (let i = 1; i <= 2; i++) {
    let image = document.createElement("img");
    image.className = "secondImage";
    image.src = images[i];
    image.alt = "second_image";
    imageBlock.appendChild(image);
  }
  //預設顏色跟尺寸為第一個可用的選項
  document.querySelector(".color").className = "color colorChosen";
  document.querySelector(".size").className = "size sizeChosen";
  chosenDefault();
  // console.log(chosen);
}

//take id from url
let locationstring = location.search;
var locationTag = "";
for (let i = 4; i < locationstring.length; i++) {
  locationTag += locationstring[i];
}
getProductData("details", locationTag);

//counter
let countNumber = document.querySelector(".counterNumber").textContent;
countNumber = 1;

function plus() {
  if (countNumber < chosen.stock) {
    countNumber += 1;
    document.querySelector(".counterNumber").textContent = countNumber;
  }
}

function minus() {
  if (countNumber > 1) {
    countNumber -= 1;
    document.querySelector(".counterNumber").textContent = countNumber;
  }
}

//Handle Product Variants
//選擇顏色的時候先做的判斷：
function colorChose(clickedElement) {
  //選到顏色的時候將數量設定回1
  countNumber = 1;
  document.querySelector(".counterNumber").textContent = countNumber;
  //重設所有color block 的className
  let u = document.getElementsByClassName("color");
  for (let i = 0; i < u.length; i++) {
    u[i].className = "color";
  }
  //被選到的item，class加上 colorChosen
  clickedElement.className = "color colorChosen";
  //將被選到的item的資訊加入到chosen內備用
  chosen.color.code = clickedElement.id;
  chosen.color.name = clickedElement.title;
  //檢查是否有之前已經無庫存的size，若有的話設定回到都有庫存的狀態
  let w = document.getElementsByClassName("sizeDisable");
  if (w) {
    for (let i = 0; i < w.length; i++) {
      w[i].setAttribute("onclick", "sizeChose(this)");
      w[i].className = "size";
    }
  }
  //設定stock
  variantSearch();
  //檢查是否有無庫存的商品，改變className
  sizeCheck();
}
//選擇size時觸發
function sizeChose(clickedElement) {
  countNumber = 1; //數量先回到1
  document.querySelector(".counterNumber").textContent = countNumber;
  let v = document.getElementsByClassName("size"); //重設所有size block 的className
  for (var i = 0; i < v.length; i++) {
    v[i].className = "size";
  }
  sizeCheck();
  clickedElement.className = "size sizeChosen"; //被選到的item，class加上 sizeChosen
  chosen.size = clickedElement.id; //將被選到的item的資訊加入到chosen內備用
  variantSearch();
  // console.log(chosen);
}

//將stock的量加入到chosen
function variantSearch() {
  for (var i = 0; i < productVariants.length; i++) {
    if (
      productVariants[i].color_code === chosen.color.code &&
      productVariants[i].size === chosen.size
    ) {
      chosen.stock = productVariants[i].stock;
    }
  }
}

//選到的當下，檢查是否有庫存
function sizeCheck() {
  for (var i = 0; i < productVariants.length; i++) {
    if (
      productVariants[i].color_code === chosen.color.code && //若是有無庫存的商品，加入sizeDisable的className
      productVariants[i].stock === 0
    ) {
      var sizeDisable = productVariants[i].size;
      if (
        //如果這個size在其他顏色切過來時已經被選了的話，讓他改選到除此之外的第一個顏色
        document.querySelector("#" + sizeDisable).className ===
        "size sizeChosen"
      ) {
        //清空已被選到那個size的className，並且將chosen加到除此之外的下一個
        document.querySelector("#" + sizeDisable).className = "";
        document.querySelector(".size").className = "size sizeChosen";
        chosenDefault(); //把選到的color & size加入chosen
      }
      document.querySelector("#" + sizeDisable).className = "size sizeDisable"; //如果這個size在其他顏色切過來時還沒被選的話，讓他加上sizeDisable的className
      document //移除按鈕事件
        .querySelector("#" + sizeDisable)
        .removeAttribute("onclick", "sizeChose(this)");
    }
  }
}
//把選到的color & size加入chosen
function chosenDefault() {
  chosen.color.code = document.querySelector(".colorChosen").id;
  chosen.color.name = document.querySelector(".colorChosen").title;
  chosen.size = document.querySelector(".sizeChosen").id;
  variantSearch();
}

//cart
var hasDone = false;
let mainImgContent = "";
let priceContent = "";

window.onload = function cartToShow() {
  if (window.localStorage.cart) {
    cart.order.list = JSON.parse(
      window.localStorage.getItem("cart")
    ).order.list;
    document.querySelector(".cart-qty").textContent = cart.order.list.length;
    document.querySelector(".qty-mobile").textContent = cart.order.list.length;
  }
};

function addToCart() {
  hasDone = false;
  if (cart.order.list.length === 0) {
    //cart為空則不用檢查，直接上傳
    pushToCart();
    // console.log("zero");
  } else {
    cartCheck(); //檢查是否有重複的品項，有重複的話就更新數量就好
    if (!hasDone) {
      //沒有重複品項的話，上傳新的資料
      pushToCart();
    }
  }

  document.querySelector(".cart-qty").textContent = cart.order.list.length;
  document.querySelector(".qty-mobile").textContent = cart.order.list.length;
  alert("已加入購物車");

  // console.log(cart.order.list.length);
  // console.log(cart.order.list);
}

function pushToCart() {
  //把選到的資訊上傳到localstorage
  cart.order.list.push({
    id: document.querySelector(".productId").textContent,
    main_image: mainImgContent,
    name: document.querySelector(".productTitle").textContent,
    price: priceContent,
    qty: document.querySelector(".counterNumber").textContent,
    color: {
      code: document.querySelector(".colorChosen").id,
      name: document.querySelector(".colorChosen").title,
    },
    size: chosen.size,
    stock: chosen.stock,
  });
  // console.log('push');
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function cartCheck() {
  cart.order.list = JSON.parse(window.localStorage.getItem("cart")).order.list;
  for (var i = 0; i < cart.order.list.length; i++) {
    if (
      //如果顏色品項尺寸都一樣，只更新數量
      cart.order.list[i].color.code == chosen.color.code &&
      cart.order.list[i].size == chosen.size &&
      cart.order.list[i].id == document.querySelector(".productId").textContent
    ) {
      // console.log("same");
      cart.order.list[i].qty = document.querySelector(
        ".counterNumber"
      ).textContent;
      hasDone = true;
    }
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

// function goToCart() {
//   window.location = "./cart.html";
// }
