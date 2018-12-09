/**
 * Namespace of index.js.
 * @namespace app.index
 */
(function (app) {
  /**
  * A variable which is blobal to index.js (NS).
  * @function myFunction
  * @memberof app.index
  * @private
  */
  var NS = {}
  var initCache = function () {
    NS.DOM = {
      productContainer: document.getElementById('productContainer'),
      beigeFilter: document.getElementById('beigeFilter'),
      blackFilter: document.getElementById('blackFilter'),
      blueFilter: document.getElementById('blueFilter'),
      brownFilter: document.getElementById('brownFilter'),
      bronzeFilter: document.getElementById('bronzeFilter'),
      priceStartFilter: document.getElementById('priceStartFilter'),
      priceEndFilter: document.getElementById('priceEndFilter')
    }
  }

  var initDomAndObj = function () {
    NS.colorfilters = []
    app.ajax('http://demo1853299.mockable.io/products', function (res) {
      NS.productsApiRes = JSON.parse(res)
      app.loadProducts(NS.productsApiRes.products, NS.DOM.productContainer)
      NS._productsApi = NS.productsApiRes.products
    })
    app.ajax('http://flipkart.mockable.io/filters', function (res) {
      NS.filtersApiRes = JSON.parse(res)
    })
  }

  var initEvents = function () {
    NS.DOM.beigeFilter.addEventListener('change', _handleColorFilter)
    NS.DOM.blackFilter.addEventListener('change', _handleColorFilter)
    NS.DOM.blueFilter.addEventListener('change', _handleColorFilter)
    NS.DOM.brownFilter.addEventListener('change', _handleColorFilter)
    NS.DOM.bronzeFilter.addEventListener('change', _handleColorFilter)
    NS.DOM.priceStartFilter.addEventListener('change', _handlePriceStartFilterChange)
    NS.DOM.priceEndFilter.addEventListener('change', _handlePriceEndFilterChange)
  }

  function _handleColorFilter () {
    var color = this.getAttribute('data-color')
    if (this.checked) {
      NS.colorfilters.push(color)
    } else {
      NS.colorfilters = app.removeFromArr(NS.colorfilters, color)
    }
    NS._productsApi = app.filterColor(NS.productsApiRes.products, NS.colorfilters)
    app.loadProducts(NS.colorfilters.length ? NS._productsApi : NS.productsApiRes.products, NS.DOM.productContainer)
  }

  function _handlePriceStartFilterChange () {
    // modify data of priceendfilter accourdingly
  }

  function _handlePriceEndFilterChange () {
    var maxPrice = this.value
    // call filter for price
  }

  var init = function () {
    initCache()
    initDomAndObj()
    initEvents()
  }

  app.index = {
    init: init
  }
})(window.app = window.app || {})
