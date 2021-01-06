/* global loading */
/* global FB */
/* eslint-disable no-unused-vars */
/* global fbData */

let memberData = {
  name: "",
  email: "",
  picture: "",
};

function FBdataGet() {
  FB.api(
    "/me",
    {
      fields: "id,name,email,picture.width(720).height(720)",
    },
    function (response) {
      memberData.picture = response.picture.data.url;
      memberData.name = response.name;
      memberData.email = response.email;
      console.log(memberData);
      renderMember();
    }
  );
}

// FBdataGet();
// getFBdataFromAPI(fbData);

function updateLoginToServer() {}

//render information
function renderMember() {
  document.querySelector(".memberPic").src = memberData.picture;
  document.querySelector(".memberName").textContent =
    "姓名: " + memberData.name;
  document.querySelector(".memberEmail").textContent =
    "Email: " + memberData.email;
}

function fbLogout() {
  FB.logout(function (response) {
    // user is now logged out
    fbData = {
      provider: "",
      access_token: "",
    };
    window.location = "./index.html";
  });
}

// sign in with api

function getFBdataFromAPI(fbData) {
  const req = new XMLHttpRequest();
  let url = "https://api.appworks-school.tw/api/1.0/user/signin";
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  // console.log(fbData);
  req.send(JSON.stringify(fbData));
  req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
      loading();
      const dataOutput = JSON.parse(req.responseText).data.user;
      memberData.picture = dataOutput.picture;
      memberData.name = dataOutput.name;
      memberData.email = dataOutput.email;
      // console.log(dataOutput);
      // console.log(memberData);
      renderMember();
      FBdataGet();
      // window.location = `./thankyou.html?number=${orderNumber}`;
    } else if (req.status === 400) {
      // console.log(cartTotal);
      alert("Bad Request");
    }
  };
}
