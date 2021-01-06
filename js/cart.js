/* global TPDirect */
/* global fbData */
/* eslint-disable no-unused-vars */

//cart
let cartTotal = {
  prime: "",
  order: {
    shipping: "delivery",
    payment: "credit_card",
    subtotal: "",
    freight: 60,
    total: "",
    recipient: {
      name: "",
      email: "",
      phone: "",
      address: "",
      time: "",
    },
    list: [],
  },
};

// const cartTotal = JSON.parse(window.localStorage.getItem('cart'));
//   console.log(cartTotal.order.list[0].color.name);
window.onload = doAJAX();
function doAJAX() {
  if (window.localStorage.cart) {
    cartTotal.order.list = JSON.parse(
      window.localStorage.getItem("cart")
    ).order.list;
    document.querySelector(".cart-qty").textContent =
      cartTotal.order.list.length;
    document.querySelector(".qty-mobile").textContent =
      cartTotal.order.list.length;
  }
  checkEmpty();

  for (var i = 0; i < cartTotal.order.list.length; i++) {
    let productDetail = document.createElement("div");
    let imganddetail = document.createElement("div");
    let productMainImg = document.createElement("div");
    let details = document.createElement("div");
    let productTitle = document.createElement("div");
    let productId = document.createElement("div");
    let br1 = document.createElement("BR");
    let br2 = document.createElement("BR");
    let br3 = document.createElement("BR");
    let br4 = document.createElement("BR");
    let productColorB = document.createElement("div");
    let productSize = document.createElement("div");
    let countArea = document.createElement("div");
    let productCount_2 = document.createElement("div");
    let mobil_count1 = document.createElement("span");
    let mobil_count2 = document.createElement("span");
    let mobil_count3 = document.createElement("span");
    let productCount = document.createElement("select");
    let productPrice2_2 = document.createElement("div");
    let productTotalP_2 = document.createElement("div");
    let productPrice2 = document.createElement("div");
    let productTotalP = document.createElement("div");
    let deleteIcon = document.createElement("div");
    productDetail.appendChild(imganddetail);
    productDetail.appendChild(countArea);
    productDetail.appendChild(deleteIcon);
    imganddetail.appendChild(productMainImg);
    imganddetail.appendChild(details);
    details.appendChild(productTitle);
    details.appendChild(productId);
    details.appendChild(br1);
    details.appendChild(br2);
    details.appendChild(productColorB);
    details.appendChild(productSize);
    details.appendChild(br3);
    details.appendChild(br4);
    countArea.appendChild(productCount_2);
    countArea.appendChild(productPrice2_2);
    countArea.appendChild(productTotalP_2);
    productCount_2.appendChild(mobil_count1);
    productCount_2.appendChild(productCount);
    productPrice2_2.appendChild(mobil_count2);
    productPrice2_2.appendChild(productPrice2);
    productTotalP_2.appendChild(mobil_count3);
    productTotalP_2.appendChild(productTotalP);
    document.querySelector(".productBox").appendChild(productDetail);
    productDetail.className = "productDetail";
    imganddetail.className = "imganddetail";
    productMainImg.className = "productMainImg";
    details.className = "details";
    productTitle.className = "productTitle";
    productId.className = "productId";
    productColorB.className = "productColorB";
    countArea.className = "countArea";
    productCount_2.className = "productCount_2";
    productCount.className = "productCount" + i;
    productPrice2_2.className = "productPrice2_2";
    mobil_count1.className = "mobil_count";
    mobil_count2.className = "mobil_count";
    mobil_count3.className = "mobil_count";
    productTotalP.className = "productTotalP";
    deleteIcon.className = "deleteIcon";
    productSize.className = "productSize";
    productPrice2.className = "productPrice2";
    productDetail.id = cartTotal.order.list[i].id;
    mobil_count1.textContent = "數量";
    mobil_count2.textContent = "單價";
    mobil_count3.textContent = "小計";
    deleteIcon.id = i;
    productMainImg.style.backgroundImage =
      "url(" + cartTotal.order.list[i].main_image + ")";
    productTitle.textContent = cartTotal.order.list[i].name;
    productId.textContent = cartTotal.order.list[i].id;
    productColorB.textContent = "顏色：" + cartTotal.order.list[i].color.name;
    productSize.textContent = "尺寸：" + cartTotal.order.list[i].size;
    //   let productCount2 = document.querySelector('.productCount');
    for (var j = 1; j <= cartTotal.order.list[i].stock; j++) {
      let option = document.createElement("option");
      option.value = j;
      option.textContent = j;
      option.className = "countOption";
      productCount.appendChild(option);
    }
    let countOption = document.getElementsByClassName("countOption");
    countOption[cartTotal.order.list[i].qty - 1].selected = true;
    for (var m = 0; m < countOption.length; m + 1) {
      countOption[m].classList.remove("countOption");
    }
    productPrice2.textContent = "NT. " + cartTotal.order.list[i].price;
    productTotalP.textContent =
      "NT. " + cartTotal.order.list[i].price * cartTotal.order.list[i].qty;
    deleteIcon.setAttribute("onclick", "deleteItem(this)");
    productCount.setAttribute("onchange", "productTotal(this)");
    //   console.log("dodo");
    subtotal();
  }
}

function checkEmpty() {
  if (cartTotal.order.list.length == 0) {
    document.querySelector(".rowTitle").style.display = "none";
    document.querySelector(".productBox").innerHTML = "購物車空空的耶!";
    document
      .querySelector("#submit")
      .removeAttribute("onclick", "onSubmit(event)");
    document.querySelector("#submit").className = "checkout checkoutDisabled";
    cartTotal.order = {
      shipping: "delivery",
      payment: "credit_card",
      subtotal: "",
      freight: 60,
      total: "",
      recipient: {
        name: "",
        email: "",
        phone: "",
        address: "",
        time: "",
      },
      list: [],
    };
    document.querySelector(".totalCount").textContent = "NT. 0";
    document.querySelector(".totalCharge").textContent = "NT. 60";
    window.localStorage.setItem("cart", JSON.stringify(cartTotal));
  }
  // console.log('empty');
}
function deleteItem(item) {
  // console.log(item.id);
  // console.log(cartTotal.order.list);
  cartTotal.order.list.splice(item.id, 1);
  window.localStorage.setItem("cart", JSON.stringify(cartTotal));
  document.querySelector(".productBox").textContent = "";
  doAJAX();
  alert("已從購物車中移除");
  // checkEmpty()
}
function productTotal(item) {
  var x = item.className.substr(12);
  // console.log(x);
  cartTotal.order.list[x].qty = item.value;
  document.getElementsByClassName("productTotalP")[x].textContent =
    "NT. " + item.value * cartTotal.order.list[x].price;
  window.localStorage.setItem("cart", JSON.stringify(cartTotal));
  subtotal();
}
function subtotal() {
  let y = cartTotal.order.list;
  var total = 0;
  for (var i = 0; i < y.length; i++) {
    total += y[i].price * y[i].qty;
  }
  var yy = total + 60;
  cartTotal.order.subtotal = total;
  cartTotal.order.total = yy;
  window.localStorage.setItem("cart", JSON.stringify(cartTotal));
  document.querySelector(".totalCount").textContent = "NT. " + total;
  document.querySelector(".totalCharge").textContent = "NT. " + yy;
  // console.log('hi');
}
//TapPay
TPDirect.setupSDK(
  "12348",
  "app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF",
  "sandbox"
);

TPDirect.card.setup({
  fields: {
    number: {
      // css selector
      element: "#card-number",
      placeholder: "**** **** **** ****",
    },
    expirationDate: {
      // DOM object
      element: document.getElementById("card-expiration-date"),
      placeholder: "MM / YY",
    },
    ccv: {
      element: "#card-ccv",
      placeholder: "CCV",
    },
  },
  styles: {
    // style valid state
    ".valid": {
      color: "green",
    },
    // style invalid state
    ".invalid": {
      color: "red",
    },
    // Media queries
    // Note that these apply to the iframe, not the root window.
    "@media screen and (max-width: 400px)": {
      input: {
        color: "orange",
      },
    },
  },
});

function onSubmit(event) {
  event.preventDefault();

  if (document.querySelector("#orderName").value.length === 0) {
    alert("請填寫收件人姓名！");
    return;
  }
  if (document.querySelector("#orderEmail").value.length === 0 || !emailValid) {
    alert("請填寫正確Email！");
    return;
  }
  if (document.querySelector("#orderPhone").value.length === 0 || !phoneValid) {
    alert("請填寫正確手機號碼！");
    return;
  }
  if (document.querySelector("#orderAddress").value.length === 0) {
    alert("請填寫收件地址！");
    return;
  }
  const tappayStatus = TPDirect.card.getTappayFieldsStatus();
  if (tappayStatus.canGetPrime === false) {
    alert("請填寫正確的信用卡資訊！");
    return;
  }

  TPDirect.card.getPrime((result) => {
    if (result.status !== 0) {
      alert("信用卡資料有誤，請確認！");
      return;
    }
    alert("成功送出訂單囉！");
    cartTotal.order.recipient.name = document.querySelector("#orderName").value;
    cartTotal.order.recipient.email = document.querySelector(
      "#orderEmail"
    ).value;
    cartTotal.order.recipient.phone = document.querySelector(
      "#orderPhone"
    ).value;
    cartTotal.order.recipient.address = document.querySelector(
      "#orderAddress"
    ).value;
    cartTotal.prime = result.card.prime;
    for (
      var i = 0;
      i < document.getElementsByClassName("timeCheck").length;
      i++
    ) {
      if (document.getElementsByClassName("timeCheck")[i].checked) {
        cartTotal.order.recipient.time = document.getElementsByClassName(
          "timeCheck"
        )[i].value;
      }
    }
    window.localStorage.setItem("cart", JSON.stringify(cartTotal));
    checkout(cartTotal);
  });
}
//checkout to API
function checkout(cartTotal) {
  loadingflex();
  const req = new XMLHttpRequest();
  let url = "https://api.appworks-school.tw/api/1.0/order/checkout";
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  if (fbData.access_token.length != 0) {
    req.setRequestHeader("Authorization", `Bearer + ${fbData.access_token}`);
  }

  req.send(JSON.stringify(cartTotal));
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      const orderNumber = JSON.parse(req.responseText).data.number;
      // outputData(orderNumber);
      localStorage.clear();
      // console.log(orderNumber);
      // console.log(fbData.access_token);
      window.location = `./thankyou.html?number=${orderNumber}`;
    } else if (req.status === 400) {
      // console.log(cartTotal);
      alert("Bad Request");
    }
  };
}

let email = document.querySelector("#orderEmail");
let emailValid = false;
email.addEventListener("change", () => {
  /* eslint-disable */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  if (!re.test(email.value)) {
    alert("請填寫正確格式之email地址");
    email.style.backgroundColor = "	#FF9D6F";
  } else {
    emailValid = true;
    email.style.backgroundColor = "	#ffffff";
  }
});

let phone = document.querySelector("#orderPhone");
let phoneValid = false;
phone.addEventListener("change", () => {
  const re = /^09\d{2}(\d{6}|-\d{3}-\d{3})$/;
  if (!re.test(phone.value)) {
    alert("請填寫正確的手機號碼");
    phone.style.backgroundColor = "	#FF9D6F";
  } else {
    phoneValid = true;
    phone.style.backgroundColor = "	#ffffff";
  }
});

function loadingflex() {
  document.querySelector(".loading").style.display = "flex";
}
