const extend = require('js-base/core/extend');
const LviProfileInformationDesign = require('library/LviProfileInformation');

const LviProfileInformation = extend(LviProfileInformationDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = LviProfileInformation;
