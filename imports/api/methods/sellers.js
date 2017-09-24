import {Sellers} from "/imports/api/collections/sellers.js";

Meteor.methods({
	"sellersInsert": function(data) {
		if(!Sellers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Sellers.insert(data);
	},

	"sellersUpdate": function(id, data) {
		var doc = Sellers.findOne({ _id: id });
		if(!Sellers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Sellers.update({ _id: id }, { $set: data });
	},

	"sellersRemove": function(id) {
		var doc = Sellers.findOne({ _id: id });
		if(!Sellers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Sellers.remove({ _id: id });
	}
});
