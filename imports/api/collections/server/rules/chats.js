import {Chats} from "/imports/api/collections/chats.js";

Chats.allow({
	insert: function (userId, doc) {
		return Chats.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Chats.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Chats.userCanRemove(userId, doc);
	}
});

Chats.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Chats.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Chats.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Chats.before.remove(function(userId, doc) {
	
});

Chats.after.insert(function(userId, doc) {
	
});

Chats.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Chats.after.remove(function(userId, doc) {
	
});
