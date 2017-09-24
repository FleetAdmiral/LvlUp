import {Mongo} from "meteor/mongo";

export const Chats = new Mongo.Collection("chats");

Chats.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
};

Chats.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","user"]));
};

Chats.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","user"]));
};
