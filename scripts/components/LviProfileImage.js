const extend = require('js-base/core/extend');
const LviProfileImageDesign = require('library/LviProfileImage');

const LviProfileImage = extend(LviProfileImageDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = LviProfileImage;
