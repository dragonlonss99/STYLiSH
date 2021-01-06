/* eslint-disable no-unused-vars */
let locationstring = location.search;
var locationTag = "";
for (let i = 8; i < locationstring.length; i++) {
  locationTag += locationstring[i];
}
document.querySelector(".orederNumber div").textContent = locationTag;
// setTimeout((window.location = "./index.html"), 100000);
