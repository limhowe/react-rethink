
import {ConversationUserLinkClient}
	from "../../../../../lib/data/conversations/ConversationUserLink/ConversationUserLinkClient";

import {UserAccountClient}
	from "../../../../../lib/data/users/UserAccount/UserAccountClient";

import {FilteredList}
	from "../../../../../lib/filters/FilteredList";

import {FilteredLookupHarness}
	from "../../../../../lib/filters/FilteredLookupHarness";

export class ConversationUserFilteredLookup {

	constructor(onPublish) {

		var lookupClient = new ConversationUserLinkClient();
		var listClient = new UserAccountClient();

		var filteredList = new FilteredList(listClient, onPublish);
		var lookupHarness = new FilteredLookupHarness({

			onList: lookupClient.onListByConversationId.bind(lookupClient),
			offList: lookupClient.offList.bind(lookupClient),

			onAdd: filteredList.addIds.bind(filteredList),
			onRemove: filteredList.removeIds.bind(filteredList),
			onUpdate: filteredList.updateFields.bind(filteredList),

			mapIds: (rec) => rec.userId,

			mapFields: (rec) => ({ // - rec = ConvUserLink

				id: rec.userId,

				userId: rec.userId,
				conversationId: rec.conversationId,
				userLinkId: rec.id,

				isInitUser: rec.isInitUser,

				conversationName: rec.conversationName,
				conversationJoinDate: rec.conversationJoinDate,

				lastTypingDate: rec.lastTypingDate,
				lastMessageDate: rec.lastMessageDate,

				invitationStatus: rec.invitationStatus,
				participationStatus: rec.participationStatus,
				notificationStatus: rec.notificationStatus,

				//displayOrder: rec.displayOrder

				// msgCount: rec.msgCount,
				// lastMsgDate: rec.lastMsgDate
			})
		});

		this._filteredList = filteredList;
		this._lookupHarness = lookupHarness;
	}

	// ------------------------------------
	// - public methods:

	lookupByConversationId(id) {
		this._lookupHarness.filterById(id);
	}

	unmount() {

		this._filteredList.unmount();
		this._lookupHarness.unmount();
	}
}