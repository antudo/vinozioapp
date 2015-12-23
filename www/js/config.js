var VIN = VIN || {};

VIN.config = {
  url: {
    login: "https://obscure-anchorage-5846.herokuapp.com/api/users/login",
    logout: "https://obscure-anchorage-5846.herokuapp.com/api/users/logout",
    filterByproducts:"https://obscure-anchorage-5846.herokuapp.com/api/storages/filter-by-product-match",
    getStorageAndIncludeProducts :"https://obscure-anchorage-5846.herokuapp.com/api/storages?filter[include]=product",
    getStorage:"https://obscure-anchorage-5846.herokuapp.com/api/storages",
    sendOrder:"https://obscure-anchorage-5846.herokuapp.com/api/orders"
  }
}
