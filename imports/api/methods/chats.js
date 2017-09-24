import {Chats} from "/imports/api/collections/chats.js";

Meteor.methods({
	"chatsInsert": function(data) {
		if(!Chats.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Chats.insert(data);
	},

	"chatsUpdate": function(id, data) {
		var doc = Chats.findOne({ _id: id });
		if(!Chats.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Chats.update({ _id: id }, { $set: data });
	},

	"chatsRemove": function(id) {
		var doc = Chats.findOne({ _id: id });
		if(!Chats.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Chats.remove({ _id: id });
	}
});
