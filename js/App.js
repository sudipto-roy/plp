/**
 * Namespace of App.
 * @namespace app
 */
(function (app) {
  app.Product = function (product) {
    this.imageUrl = product.image
    this.title = product.title
    this.rating = product.rating
    this.offerPrice = product.price.final_price
    this.markedPrice = app.getMRP(product.price.final_price, +product.discount)
    this.discount = `${product.discount}% off`
  }
  app.getMRP = function (offerprice, discount) {
    return ((offerprice * 100) / (100 - discount)).toFixed(2)
  }

  app.ajax = function (url, callback = {}) {
    var xhttp = new XMLHttpRequest(),
      response
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200 && typeof callback === 'function') {
        callback(this.responseText)
      }
    }
    xhttp.open('GET', url, true)
    xhttp.send()
  }

  // app.loadProducts = function(products, targetEl) {
  //   var ul = document.createElement('ul'),
  //     li = document.createElement('li'),
  //     p = document.createElement('p'),
  //     img = document.createElement('img'),
  //     tempLi,
  //     tempP,
  //     product,
  //     imgsrc;

  //   for(let i=0; i<products.length; i++) {
  //     tempLi = li.cloneNode();
  //     product = new app.Product(products[i]);
  //     for(prop in product) {
  //       tempP = p.cloneNode();
  //       tempP.innerHTML = `${prop} : ${product[prop]}`;
  //       tempLi.appendChild(tempP);
  //     }
  //     ul.appendChild(tempLi);
  //   }
  //   targetEl.innerHTML = '';
  //   targetEl.appendChild(ul);
  // };

  app.loadProducts = function (products, targetEl) {
    var ul = document.createElement('ul'),
      li = document.createElement('li'),
      p = document.createElement('p'),
      img = document.createElement('img'),
      tempLi,
      tempP,
      product,
      imgsrc,
      domStr = ''

    for (let i = 0; i < products.length; i++) {
      tempLi = li.cloneNode()
      product = new app.Product(products[i])

      ul.appendChild(tempLi)
    }
    targetEl.innerHTML = ''
  }

  app.filterColor = function (products, colors) {
    var flag
    return products.filter(function (product) {
      flag = 0
      for (let i = 0; i < colors.length; i++) {
        if (product.colour.title.toLowerCase() == colors[i].toLowerCase()) {
          flag = 1
          break
        }
      }
      if (flag) {
        return true
      }
    })
  }

  app.removeFromArr = function (arr, color) {
    return arr.filter(function (_color) {
      if (_color.toLowerCase() !== color.toLowerCase()) {
        return true
      }
    })
  }
})(window.app = window.app || {})
