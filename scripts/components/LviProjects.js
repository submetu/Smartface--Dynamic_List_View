const extend = require('js-base/core/extend');
const LviProjectsDesign = require('library/LviProjects');

const LviProjects = extend(LviProjectsDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = LviProjects;
