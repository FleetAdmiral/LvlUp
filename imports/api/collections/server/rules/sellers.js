import {Sellers} from "/imports/api/collections/sellers.js";

Sellers.allow({
	insert: function (userId, doc) {
		return Sellers.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Sellers.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Sellers.userCanRemove(userId, doc);
	}
});

Sellers.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Sellers.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Sellers.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Sellers.before.remove(function(userId, doc) {
	
});

Sellers.after.insert(function(userId, doc) {
	
});

Sellers.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Sellers.after.remove(function(userId, doc) {
	
});
