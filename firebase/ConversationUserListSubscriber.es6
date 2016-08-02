
import _ from "lodash";

import {ConversationUserFilteredLookup} from "../filteredLookups/ConversationUserFilteredLookup";

export class ConversationUserListSubscriber {

	constructor() {

		var onPublish = this._onListByConversation.bind(this);
		this._filteredLookup = new ConversationUserFilteredLookup(onPublish);

		this._onPublish = null;
	}

	unmount() {
		this.detachList();
	}

	// --------------------------------------------------
	// - subscription: List ByConversation:

	attachListByConversation(rec, onPublish) {

		var id = (rec) ? rec.id : null;

		this._onPublish = onPublish;
		this._filteredLookup.lookupByConversationId(id);
	}

	detachList() {

		this._filteredLookup.unmount();
		this._onPublish = null;
	}

	_onListByConversation(list, id) {

		var pubFn = this._onPublish;
		if (_.isFunction(pubFn))  pubFn(list, id);
	}
}