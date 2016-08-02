import {FirebaseClient} from "../../../FirebaseClient";
import {ConversationUserLinkRepo} from "./_ConversationUserLinkRepo";

export class ConversationUserLinkClient extends FirebaseClient {

	constructor() {
		super(new ConversationUserLinkRepo());
	}
	unmount() {
		this.offList(); // - should cleanup all remaining subscriptions...
	}

	getByConversationAndUserId(conversationId, userId) {
		return this.repo.getByConversationAndUserId(conversationId, userId);
	}

	onListByConversationId(id, cb) {
		return super.onListByField("conversationId", id, cb);
	}

	onListByUserId(id, cb) {
		return super.onListByField("userId", id, cb);
	}

	offList(refFn) {
		return super.offListByField(refFn);
	}
}