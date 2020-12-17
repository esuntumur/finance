var uiController = (function () {
  var x = 100;

  function add(y) {
    return x + y;
  }
  return {
    publicAdd: function (a) {
      a = add(a);
      console.log("a :>> ", a);
    },
  };
})();

var financeController = (function () {})();

var appController = (function () {
  var ctrlAddItem = function () {
    // 1. оруулах өгөгдлийг дэлгэцнээс олж авна.
    console.log("дэлгэцээс өгөгдөл авна.");
    // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    // 3. олж авсан өгөгдлүүдээ веб дээрх тохирох хэсгүүдэд гаргана.add
    // 4. төсвийг тооцоолно.
    // 5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    event.keyCode === 13 || event.which === 13 ? ctrlAddItem() : 0;
  });
})(uiController);
