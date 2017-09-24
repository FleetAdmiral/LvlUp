import {Achievements} from "/imports/api/collections/achievements.js";

Meteor.methods({
	"achievementsInsert": function(data) {
		if(!Achievements.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Achievements.insert(data);
	},

	"achievementsUpdate": function(id, data) {
		var doc = Achievements.findOne({ _id: id });
		if(!Achievements.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Achievements.update({ _id: id }, { $set: data });
	},

	"achievementsRemove": function(id) {
		var doc = Achievements.findOne({ _id: id });
		if(!Achievements.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Achievements.remove({ _id: id });
	}
});
