import {Mongo} from "meteor/mongo";

export const Sellers = new Mongo.Collection("sellers");

Sellers.userCanInsert = function(userId, doc) {
	return true;
};

Sellers.userCanUpdate = function(userId, doc) {
	return true;
};

Sellers.userCanRemove = function(userId, doc) {
	return true;
};
