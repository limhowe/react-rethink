import {FirebaseClient} from "../../../FirebaseClient";
import {UserAccountRepo} from "./_UserAccountRepo";

export class UserAccountClient extends FirebaseClient {

	constructor() {
		super(new UserAccountRepo());
	}
	unmount() {
		this.offValueById(); // - should cleanup all remaining subscriptions...
	}


	onValueById(id, cb) {
		return super.onValueById(id, cb);
	}

	offValueById(id, refFn) {
		return super.offValueById(id, refFn);
	}
}