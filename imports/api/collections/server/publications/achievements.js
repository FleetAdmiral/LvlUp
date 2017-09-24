import {Meteor} from "meteor/meteor";
import {Users} from "meteor-user-roles";
import {Achievements} from "/imports/api/collections/achievements.js";

Meteor.publish("achievements", function() {
	return Achievements.publishJoinedCursors(Achievements.find({}, {}));
});

Meteor.publish("sellerachievements", function() {
	return Achievements.publishJoinedCursors(Achievements.find({}, {}));
});

