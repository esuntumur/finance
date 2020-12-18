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
    addListItem: function (item, type) {
      // Орлого зарлагын элементийг агуулсан html-ыг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<?xml version="1.0"?><div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">+ %%VALUE%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"/></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<?xml version="1.0"?><div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">- %%VALUE%%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"/></button></div></div></div>';
      }
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("%%VALUE%%", item.value);
      document.querySelector(list).insertAdjacentHTML("beforeend", html);

      // Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      // Бэлтгэсэн HTML ээ DOM руу хийж өгнө.
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
      return item;
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

    // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    // 3. олж авсан өгөгдлүүдээ веб дээрх тохирох хэсгүүдэд гаргана.
    uiController.addListItem(item, input.type);
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
