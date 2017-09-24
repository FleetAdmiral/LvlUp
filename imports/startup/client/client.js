/*IMPORTS*/

this.globalOnRendered = function() {
	
	animateVisible();
};

Meteor.startup(function() {
	
	$(window).on("scroll resize", function() {
		animateVisible();
	});
});
