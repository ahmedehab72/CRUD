var inputProductName = document.getElementById("productName");
var inputProductPrice = document.getElementById("productNumber");
var inputProductCategory = document.getElementById("productCategory");
var inputProductDesc = document.getElementById("productDesc");

// console.log(inputProductCategory,inputProductDesc,inputProductName,inputProductPrice,inputProductImage);

var addbtn = document.getElementById("addbtn");
var updatebtn = document.getElementById("updatebtn");
var pId = 0;
var listProduct;

if (localStorage.getItem("products") == null) {
  listProduct = [];
} else {
  listProduct = JSON.parse(localStorage.getItem("products"));

  displayProduct(listProduct);
}

function addProduct() {
  if (validator()) {
    var product = {
      code: inputProductName.value,
      price: inputProductPrice.value,
      category: inputProductCategory.value,
      desc: inputProductDesc.value,
    };
    listProduct.push(product);
    clearForm();
    displayProduct(listProduct);

    localStorage.setItem("products", JSON.stringify(listProduct));
    // localStorage.removeItem('products',JSON.stringify(listProduct[1]))
  } else {
    alert("not valid");
  }
}

function clearForm() {
  inputProductName.value = null;
  inputProductPrice.value = null;
  inputProductCategory.value = null;
  inputProductDesc.value = null;
}

function displayProduct(arr) {
  var cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += ` <tr>
        <td><h2 class="h4">${arr[i].code}</h2></td>
        <td><h3 class="h6"><span class="text-secondary ">${arr[i].price}</span></h3></td>
        <td><h3 class="h6 mb-4 "><span class="text-secondary ">${arr[i].category}</span></h3></td>
        <td><p>${arr[i].desc}</p></td>
        <td><button class="btn btn-outline-warning  " onclick="setUpdateForm(${i})">Update</button></td>
        <td><button class="btn btn-outline-danger ms-2 " onclick="deleteProduct(${i})">Delete</button></td>
      </tr>
        `;
  }
  // // <div class="col-md-2 mt-5">
  // <div class="product">
  // <h2 class="h4">${arr[i].code}</h2>
  // <p>${arr[i].desc}</p>
  // <h3 class="h6">price :<span class="text-secondary ">${arr[i].price}</span></h3>
  // <h3 class="h6 mb-4 ">Category :<span class="text-secondary ">${arr[i].category}</span></h3>
  // <button class="btn btn-outline-warning  " onclick="setUpdateForm(${i})">Update</button>
  // <button class="btn btn-outline-danger ms-2 " onclick="deleteProduct(${i})">Delete</button>

  // </div>
  // </div>
  document.getElementById("rowData").innerHTML = cartona;
}

function deleteProduct(index) {
  listProduct.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(listProduct));

  displayProduct(listProduct);

  // console.log(listProduct);
}

function searchProduct(searchKey) {
  var searchArray = [];
  for (i = 0; i < listProduct.length; i++) {
    if (listProduct[i].code.toLowerCase().includes(searchKey.toLowerCase())) {
      searchArray.push(listProduct[i]);
    }
  }
  displayProduct(searchArray);
}

function setUpdateForm(index) {
  pId = index;
  inputProductName.value = listProduct[index].code;
  inputProductPrice.value = listProduct[index].price;
  inputProductCategory.value = listProduct[index].category;
  inputProductDesc.value = listProduct[index].desc;

  updatebtn.classList.replace("d-none", "d-block");
  addbtn.classList.replace("d-block", "d-none");
}

function updateProduct() {
  var product = {
    code: inputProductName.value,
    price: inputProductPrice.value,
    category: inputProductCategory.value,
    desc: inputProductDesc.value,
  };
  listProduct.splice(pId, 1, product);
  console.log(listProduct);

  localStorage.setItem("products", JSON.stringify(listProduct));
  displayProduct(listProduct);

  clearForm();
  addbtn.classList.replace("d-none", "d-block");
  updatebtn.classList.replace("d-block", "d-none");
}

function validator() {
  var regex = /^[A-Z][a-z]{3,}$/;
  // return true;
  // return regex.test(inputProductName.value);

  if (regex.test(inputProductName.value)) {
    return true;
  } else {
  }
}
