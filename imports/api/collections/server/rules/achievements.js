import {Achievements} from "/imports/api/collections/achievements.js";

Achievements.allow({
	insert: function (userId, doc) {
		return Achievements.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Achievements.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Achievements.userCanRemove(userId, doc);
	}
});

Achievements.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Achievements.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Achievements.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Achievements.before.remove(function(userId, doc) {
	
});

Achievements.after.insert(function(userId, doc) {
	
});

Achievements.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Achievements.after.remove(function(userId, doc) {
	
});
