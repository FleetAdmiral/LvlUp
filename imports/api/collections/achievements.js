import {Mongo} from "meteor/mongo";

export const Achievements = new Mongo.Collection("achievements");

Achievements.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

Achievements.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

Achievements.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
