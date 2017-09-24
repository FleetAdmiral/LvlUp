import {Meteor} from "meteor/meteor";
import {Users} from "meteor-user-roles";
import {Chats} from "/imports/api/collections/chats.js";

Meteor.publish("chatsto", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Chats.publishJoinedCursors(Chats.find({}, {}));
	}
	return Chats.publishJoinedCursors(Chats.find({createdBy:this.userId}, {}));
});

