// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
  };

  var NodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    displayPercentages: function (allPercentages) {
      // давхардсан классуудыг nodeList болгож авлаа.
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );
      // var arr = Array.from(elements);
      // Элемент болгоны хувьд зарлагийн хувийг массиваас авч шивж оруулах
      NodeListForeach(elements, function (el, index) {
        el.textContent = allPercentages[index] + "%";
      });
    },
    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFIeld: function () {
      // catch .class NodeList
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      // Convert List to Array && remove it
      fields = Array.from(fields);
      fields.forEach((e) => {
        e.value = "";
      });

      fields[0].focus();
      // fields.forEach(function (e, index, Array) {
      //   e.value = "";
      // });
    },
    tusviigUzuuleh: function (tusuv) {
      document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        tusuv.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        tusuv.totalEpx;

      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi + "%";
      } else
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.huvi;
    },

    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function (item, type) {
      // Орлого зарлагын элементийг агуулсан html-ыг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<?xml version="1.0"?><div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">+ %%VALUE%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"/></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<?xml version="1.0"?><div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">- %%VALUE%%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"/></button></div></div></div>';
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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach((element) => {
      sum = sum + element.value;
    });

    data.totals[type] = sum;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },

    tusuv: 0,

    huvi: 0,
  };
  return {
    tusuvTootsooloh: function () {
      //Нийт орлого, зарлагийн нийлбэрийг тооцоолно
      calculateTotal("inc");
      calculateTotal("exp");

      // Төсвийг шинээр тооцоолно
      data.tusuv = data.totals.inc - data.totals.exp;

      // Зарлагийн эзлэх хувь
      if (data.totals.inc === 0) data.huvi = 0;
      else data.huvi = Math.round((data.totals.exp * 100) / data.totals.inc);
    },

    calculatePercentages: function () {
      data.items.exp.forEach((e) => {
        e.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });
      return allPercentages;
    },

    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,

        totalInc: data.totals.inc,
        totalEpx: data.totals.exp,
      };
      console.log(data.huvi);
    },
    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
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

    if (input.description !== "" && input.value !== "") {
      // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. олж авсан өгөгдлүүдээ веб дээрх тохирох хэсгүүдэд гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFIeld();

      // Төсвийг тооцоолж дэлгэцэнд үзүүлнэ.
      updateTusuv();
    }
  };
  var updateTusuv = function () {
    // 4. төсвийг тооцоолно.
    financeController.tusuvTootsooloh();

    // 5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    var tusuv = financeController.tusviigAvah();

    // 6. Төсвийн тооцоог дэлгэцэнд гаргана
    uiController.tusviigUzuuleh(tusuv);

    // 7. Элементүүдийн хувийг тооцоолно.
    financeController.calculatePercentages();

    // 8. Элементүүдийн хувийг хүлээж авна.
    var allPercentages = financeController.getPercentages();

    // 9. Эдгээр хувийг дэлгэцэнд хүлээж авна.
    uiController.displayPercentages(allPercentages);
  };
  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (e) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          // console.log(type + " ->" + itemId);

          // 1. Санхүүгийн модулаас type, id ашиглан устгана
          financeController.deleteItem(type, itemId);
          // 2. Дэлгэцнээс тухайн элементийг устгана.
          uiController.deleteListItem(id);
          // 3. Төсвийг тооцоолж дэлгэцэнд үзүүлнэ.
          updateTusuv();
        }
      });
  };

  return {
    init: function () {
      console.log("Application started...");
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalEpx: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
