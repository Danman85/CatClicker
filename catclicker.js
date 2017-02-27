(function($){

  // Cat class
  var Cat = function (name, sprite) {
    this.name = name;
    this.sprite = sprite;
    this.counter = 0;
  };
  Cat.prototype.click = function () {
    this.counter++;
  };

  //model
  var model = {
    currentCat: null,
    cats: [new Cat('binkie', 'cat.jpg'),
            new Cat('chef', 'cat2.jpg'),
            new Cat('Rosa', 'cat3.jpg'),
            new Cat('Amy', 'cat4.jpg'),
            new Cat('Scully', 'cat5.jpg')],
    getCats: function () {
      return model.cats;
    }
  };

  //Controller
  var controller = {
    // returns the entire cat collection
    getAllCats: function () {
      return model.getCats();
    },
    // Returns a cat object with the name matching
    // the input string
    // parameter: string
    setCurrentCatByName: function (name) {
      model.getCats().forEach(function (cat) {
        if (cat.name === name) {
          model.currentCat = cat;
        };
      });
    },
    setCurrentCat: function (catObj) {
      model.currentCat = catObj;
    },
    getCurrentCat: function () {
      return model.currentCat;
    },
    addClick: function () {
      model.currentCat.click();
    },
    init: function () {
      viewList.init();
      viewCatPic.init();
      viewAdmin.init();
    }
  };

  // Views
  var viewList = {
    init: function() {
      // EventHandler: display all cats.
      $('#catListHeader').on('click', '.panel-heading', function (e) {
        viewCatPic.clear();
        controller.getAllCats().forEach(function (cat) {
          controller.setCurrentCat(cat);
          viewCatPic.render();
        });
      });
      // EventHandler: display a single cat
      $('#catList').on('click', 'li', function (e) {
        var name = $(e.currentTarget).attr('id');
        controller.setCurrentCatByName(name);
        viewCatPic.clear();
        viewCatPic.render();
        viewAdmin.render();
      });
      // List setup
      viewList.render();

    },
    // Adds all cats to the list.
    render: function() {
      viewList.clear();
      controller.getAllCats().forEach(function (cat) {
        $('#catList').append('<li id="'+cat.name+
        '" class="list-group-item">'+cat.name+'</list>');
      });
    },
    clear: function() {
      $('#catList').text('');
    }
  };

  // view
  var viewCatPic = {
    init: function() {
      // EventHandler: click counter
      $('#catPictures').on('click', 'img', function (e) {
        var name = $(e.currentTarget).attr('id');
        controller.setCurrentCatByName(name);
        var cat = controller.getCurrentCat();
        cat.click();
        viewAdmin.render();
        $(e.currentTarget).parent().find('#counter').text(cat.counter);
      });
    },
    // Renders cat name, picture and counter
    // parameter: Cat object
    render: function () {
      var cat = controller.getCurrentCat();
      $('#catPictures').append("<div id='"+cat.name+"' class='col-lg-3'>"+
        "<p>"+cat.name+"</p>"+
        "<img id='"+cat.name+"' class='img-responsive' src='"+cat.sprite+
        "' alt='"+cat.name+"'>"+
        "<p>Number of clicks on "+cat.name+
        ": <span id='counter'>"+cat.counter+"</span></p>"+
        "</div>");
    },
    // Clears the cat picture view
    clear: function () {
      $('#catPictures').text('');
    }
  };

  // View
  var viewAdmin = {
    init: function () {
      var admin = $('#adminPanelBody');
      admin.hide();

      // Hide/show panelbody handler
      $('#adminButton').on('click', function (e) {
        e.stopPropagation();
        admin.toggle();
      });

      // Save current input data handler
      $('#saveInput').on('click', function (e) {
        var cat = controller.getCurrentCat();
        cat.name = $('#inputCatName').val();
        cat.sprite = $('#inputPicUrl').val();
        cat.counter = $('#inputNrClicks').val();
        viewCatPic.clear();
        viewCatPic.render();
        viewList.render();
      });

      // Reset initial cat values handler
      $('#resetInput').on('click', function (e) {
        viewAdmin.render();
      });
    },
    render: function () {
      var cat = controller.getCurrentCat();
      $('#inputCatName').val(cat.name);
      $('#inputPicUrl').val(cat.sprite);
      $('#inputNrClicks').val(cat.counter);
    }
  };

  controller.init();
})($);
