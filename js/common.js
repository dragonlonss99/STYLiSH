/* global FB */
/* global getFBdataFromAPI */

/* eslint-disable no-unused-vars */

let fbData = {
  provider: "",
  access_token: "",
};

let cart = {
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

//search
const searchInput = document.getElementById("doSearch");

searchInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("searchInput").value;
  loading();
  window.location = `./index.html?tag=${input}`;
});

const search = document.querySelector(".search");
const searchBar = document.querySelector("#searchInput");

function focusMethod() {
  search.style.display = "none";
  searchBar.style.display = "block";
  searchBar.focus();
  // console.log(document.activeElement.className);
}
document.querySelector("body").addEventListener("click", () => {
  if (
    document.activeElement.className != "web_searchbar" &&
    window.screen.width <= 1000
  ) {
    search.style.display = "flex";
    searchBar.style.display = "none";
  }
});

function gotoHome() {
  window.location = "./index.html";
}

function goToCart() {
  window.location = "./cart.html";
}

//FB
FBinit();
function FBinit() {
  window.fbAsyncInit = function () {
    FB.init({
      appId: "280135086649634",
      cookie: true,
      xfbml: true,
      version: "v9.0",
    });
    // FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        fbData.access_token = response.authResponse.accessToken;
        fbData.provider = "facebook";
        // console.log(location.pathname);
        if (
          location.pathname === "/profile.html" ||
          location.pathname === "/STYLiSH/profile.html"
        ) {
          getFBdataFromAPI(fbData);
        }
      }
    });
  };
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
  cartToShow();
  function cartToShow() {
    if (window.localStorage.cart) {
      cart.order.list = JSON.parse(
        window.localStorage.getItem("cart")
      ).order.list;
      document.querySelector(".cart-qty").textContent = cart.order.list.length;
      document.querySelector(".qty-mobile").textContent =
        cart.order.list.length;
    }
  }
}

function loginFB() {
  if (fbData.provider === "facebook") {
    loading();
    window.location = "./profile.html";
  } else {
    triggerFBlogin();
  }
}

function triggerFBlogin() {
  FB.login(
    function (response) {
      fbData.access_token = response.authResponse.accessToken;
      fbData.provider = "facebook";
    },
    {
      scope: "email",
      auth_type: "rerequest",
    }
  );
}

function loading() {
  document.querySelector(".loading").style.display = "none";
}
