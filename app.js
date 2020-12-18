// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// Санхүүтэй ажиллах контроллер
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var arrSum = function (arr) {
    var sum = 0;
    arr.forEach((element) => {
      sum = sum + element;
    });
    return sum;
  };
  var i1 = new Income(1, "tsalin", 5000000);
  var i2 = new Income(1, "tsalin", 10000000);

  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, desc, val) {
      var item, id;

      data.items[type].length === 0
        ? (id = 1)
        : (id = data.items[type][data.items[type].length - 1].id + 1);

      type === "inc"
        ? (item = new Income(id, desc, val))
        : (item = new Expense(id, desc, val));
      data.items[type].push(item);
      console.log(data.items);
    },
    getData: function () {
      return data;
    },
  };
})();

// Програмын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. оруулах өгөгдлийг дэлгэцнээс олж авна.

    var input = uiController.getInput();
    financeController.addItem(input.type, input.description, input.value);
    // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    // 3. олж авсан өгөгдлүүдээ веб дээрх тохирох хэсгүүдэд гаргана.add
    // 4. төсвийг тооцоолно.
    // 5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };
  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      event.keyCode === 13 || event.which === 13 ? ctrlAddItem() : 0;
    });
  };
  return {
    init: function () {
      console.log("Application started...");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
