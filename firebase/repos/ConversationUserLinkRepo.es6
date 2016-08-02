export class ConversationUserLinkRepo extends FirebaseRepo {

	constructor() {
		super("/conversations/ConversationUserLink/", new ConversationUserLinkMapper());
	}

	getByConversationAndUserId(conversationId, userId) {

		//console.log("GET BY CONVO AND USER: ", conversationId, userId);

		return new Promise((resolve, reject) => {

			var filter = (doc) => (doc.userId === userId);
			super.getDocWhere("conversationId", conversationId, filter).then(resolve).catch(reject);

		});
	}
}

