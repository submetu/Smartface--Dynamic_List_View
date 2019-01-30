const ListView = require("sf-core/ui/listview");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const LviProfileImage = require("components/LviProfileImage");
const LviProfileInformation = require("components/LviProfileInformation");
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
  page.layoutInfo = Object.assign(listViewTypes.initialTypes, listViewTypes.basicInfo);
  page.layoutInfoKeys = Object.keys(page.layoutInfo);
  page.initListView();
}

function initListView() {
  const page = this;

  var myListView = new ListView({
    flexGrow: 1,
    itemCount: page.layoutInfoKeys.length,
  });

  page.layout.addChild(myListView);

  myListView.onRowCreate = type => {
    let myListViewItem;
    console.log('type: ', type);
    console.log('profile: ', listViewTypes.all.PROFILE);

    if (type === listViewTypes.all.PROFILE) {
      myListViewItem = new LviProfileImage();
    }
    else if (type === listViewTypes.all.PROFILE_INFORMATION) {
      myListViewItem = new LviProfileInformation();
    }

    componentContextPatch(myListViewItem, `myListViewItem${type}`);
    return myListViewItem;
  };
  myListView.onRowBind = function(listViewItem, index) {
    // var myLabelTitle = listViewItem.myLabelTitle;
    // myLabelTitle.text = myDataSet[index].title;
    // myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
  };
  myListView.onRowSelected = function(listViewItem, index) {
    console.log("selected index = " + index)
  };

  myListView.onRowType = index => {
    const { layoutInfo, layoutInfoKeys } = this;
    return layoutInfo[layoutInfoKeys[index]];
  };
  myListView.onRowHeight = index => {
    const { layoutInfo, layoutInfoKeys } = this;
    let type = layoutInfo[layoutInfoKeys[index]];
    let height = 0;
    if (type === listViewTypes.all.PROFILE) {
      height = 200;
    }
    else if (type === listViewTypes.all.PROFILE_INFORMATION) {
      height = 380;
    }
    return height
  };
}



module.exports = Pg1;
