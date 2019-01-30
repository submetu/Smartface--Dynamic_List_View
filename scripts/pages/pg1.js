const Font = require("sf-core/ui/font");
const Label = require("sf-core/ui/label");
const ListView = require("sf-core/ui/listview");
const ListViewItem = require("sf-core/ui/listviewitem");
const TextAlignment = require("sf-core/ui/textalignment");
const Color = require("sf-core/ui/color");
const GridView = require("sf-core/ui/gridview");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const Pg1Design = require('ui/ui_pg1');

const Pg1 = extend(Pg1Design)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    //this binding
    this.initListView = initListView.bind(this);
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */

function onLoad(superOnLoad) {
  superOnLoad();
  const page = this;
  page.initListView();
}

function initListView() {
  const page = this;

  var myDataSet = [{
    title: 'Smartface Title 1',
    backgroundColor: Color.create("#99d9f9")
  }, {
    title: 'Smartface Title 2',
    backgroundColor: Color.create("#66c6f6")
  }, {
    title: 'Smartface Title 3',
    backgroundColor: Color.create("#32b3f3")
  }, {
    title: 'Smartface Title 4',
    backgroundColor: Color.create("#00a1f1")
  }, {
    title: 'Smartface Title 5',
    backgroundColor: Color.create("#00a1f1")
  }, {
    title: 'Smartface Title 6',
    backgroundColor: Color.create("#00a1f1")
  }, {
    title: 'Smartface Title 7',
    backgroundColor: Color.create("#00a1f1")
  }, {
    title: 'Smartface Title 8',
    backgroundColor: Color.create("#00a1f1")
  }, {
    title: 'Smartface Title 9',
    backgroundColor: Color.create("#00a1f1")
  }];

  var myListView = new ListView({
    flexGrow: 1,
    rowHeight: 70,
    itemCount: myDataSet.length,
  });

  page.layout.addChild(myListView);

  myListView.onRowCreate = function() {
    var myListViewItem = new ListViewItem();
    var myLabelTitle = new Label({
      flexGrow: 1,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 50,
      marginRight: 50
    });
    myLabelTitle.font = Font.create(Font.DEFAULT, 15, Font.BOLD);
    myLabelTitle.textAlignment = TextAlignment.MIDCENTER;
    myLabelTitle.textColor = Color.WHITE;
    myLabelTitle.borderRadius = 10;
    myListViewItem.addChild(myLabelTitle);
    myListViewItem.myLabelTitle = myLabelTitle;
    return myListViewItem;
  };
  myListView.onRowBind = function(listViewItem, index) {
    var myLabelTitle = listViewItem.myLabelTitle;
    myLabelTitle.text = myDataSet[index].title;
    myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
  };
  myListView.onRowSelected = function(listViewItem, index) {
    console.log("selected index = " + index)
  };

  myListView.onPullRefresh = function() {
    myDataSet.push({
      title: 'Smartface Title ' + (myDataSet.length + 1),
      backgroundColor: Color.RED,
    })
    myListView.itemCount = myDataSet.length;
    myListView.refreshData();
    myListView.stopRefresh();
  }
}

module.exports = Pg1;
