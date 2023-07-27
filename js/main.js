var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var box = document.getElementById("box");
var urlRegex = /^(w{3}\.)?\w+(\.com|\.org|\.co|\.net){1}$/;
var nameRegex = /^\w{3,}(\s\w+)*$/;
var bookmarksArr = [];
if (localStorage.getItem("bookmarks") !== null) {
  bookmarksArr = JSON.parse(localStorage.getItem("bookmarks"));
}
display();

function addBookmark() {
  if (!validate(siteName, nameRegex) || !validate(siteUrl, urlRegex)) {
    Swal.fire({
      showCloseButton: true,
      html: `<i class="fa-solid fa-circle text-danger me-1 my-2"></i>
      <i class="fa-solid fa-circle text-warning me-1 my-4"></i>
      <i class="fa-solid fa-circle text-success me-1 my-4"></i>
      <h5 class = "fw-bolder">Site Name or Url is not valid, Please follow the rules below :</h5>
      <ol class = "p-0">
      <li><i class = "fa-regular fa-circle-right p-3 text-danger"></i>
      Site name must contain at least 3 characters
      </li>
      <li><i class = "fa-regular fa-circle-right p-3 text-danger"></i>
      Site URL must be a valid one
      </li>
      </ol>`,
    });
  } else {
    var bookmark = {
      name: siteName.value,
      url: siteUrl.value,
    };
    bookmarksArr.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArr));
    display();
    unsetInputs();
  }
}

function display() {
  var container = "";

  for (var i = 0; i < bookmarksArr.length; i++) {
    container += `<tr>
    <td>${i + 1}</td>
    <td>${bookmarksArr[i].name}</td>
    <td>
      <a class="btn btn-success" href ="https://${
        bookmarksArr[i].url
      }" target ="blank">
        <i class="fa-solid fa-eye me-2"></i>Visit
      </a>
    </td>
    <td>
      <button class="btn btn-danger" onclick="deleteBookmark(${i})">
        <i class="fa-solid fa-trash-can me-2"></i>Delete
      </button>
    </td>
  </tr>
`;
  }
  box.innerHTML = container;
}

function deleteBookmark(index) {
  bookmarksArr.splice(index, 1);
  localStorage.clear();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksArr));
  display();
}
function unsetInputs() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-invalid");
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
  siteUrl.classList.remove("is-invalid");
}

function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
