const ListView = require("sf-core/ui/listview");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const LviProfileImage = require("components/LviProfileImage");
const LviProfileInformation = require("components/LviProfileInformation");
const LviProjects = require("components/LviProjects");
const listViewTypes = require("../lib/listViewTypes");

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
    this.getRowType = getRowType.bind(this);
    this.setButtonEvents = setButtonEvents.bind(this);
    this.updateListView = updateListView.bind(this);
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

  page.updateListView({
    listViewType: Object.assign({}, listViewTypes.initialTypes, listViewTypes.basicInfo),
  });

  page.initListView();
  page.setButtonEvents();
}

function setButtonEvents() {
  const page = this;
  const { btnLeft, btnRight, btnMiddle } = page;
  btnLeft.onPress = () => {
    page.updateListView({
      listViewType: Object.assign({}, listViewTypes.initialTypes, listViewTypes.basicInfo),
      refresh: true
    });
  };
  btnRight.onPress = () => {
    page.updateListView({
      listViewType: listViewTypes.detailedInfo,
      refresh: true
    });
  };
  btnMiddle.onPress = () => {
    page.updateListView({
      listViewType: listViewTypes.all,
      refresh: true
    });
  };
}

function updateListView({ listViewType, refresh }) {
  const page = this;
  page.layoutInfo = listViewType;
  page.layoutInfoKeys = Object.keys(page.layoutInfo);
  if (refresh && page.listView) {
    page.listView.itemCount = page.layoutInfoKeys.length;
    page.listView.refreshData();
    page.layout.applyLayout();
  }
}

function initListView() {
  const page = this;

  //bind the listview to the page so that we can access it in other methods like `updateListView()`
  var myListView = page.listView = new ListView({
    flexGrow: 1,
    itemCount: page.layoutInfoKeys.length,
  });

  page.layout.addChild(myListView);

  myListView.onRowCreate = type => {
    let myListViewItem;

    if (type === listViewTypes.all.PROFILE) {
      myListViewItem = new LviProfileImage();
    }
    else if (type === listViewTypes.all.PROFILE_INFORMATION) {
      myListViewItem = new LviProfileInformation();
    }
    else if (type === listViewTypes.all.PROJECTS) {
      myListViewItem = new LviProjects();
    }

    componentContextPatch(myListViewItem, `myListViewItem${type}`);
    return myListViewItem;
  };

  myListView.onRowType = page.getRowType;
  
  myListView.onRowHeight = index => {
    let type = page.getRowType(index);
    let height = 0;
    if (type === listViewTypes.all.PROFILE) {
      height = 200;
    }
    else if (type === listViewTypes.all.PROFILE_INFORMATION) {
      height = 380;
    }
    else if (type === listViewTypes.all.PROJECTS) {
      height = 300;
    }
    return height
  };

  myListView.onRowBind = function(listViewItem, index) {};

  myListView.onRowSelected = function(listViewItem, index) {};
}

function getRowType(index) {
  const page = this;
  const { layoutInfo, layoutInfoKeys } = page;
  return layoutInfo[layoutInfoKeys[index]];
}

module.exports = Pg1;
