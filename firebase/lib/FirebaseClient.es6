

export class FirebaseClient {

	constructor(repo) {
		this.repo = repo;
	}

	onValueById(id, cb) {

		//console.log("onValueById-setup", id, cb);

		var refFn = (snapshot) => {

			//console.log("onValueById-call", id, cb);

			if (!snapshot.exists()) cb(null, id);
			else {

				var doc = snapshot.val();
				doc.id = snapshot.key();

				cb(this.repo.getViewMap(doc), id);
			}
		};

		this.repo.getFirebaseChild().child(id)
			.on("value", refFn);


		return refFn;
	}

	offValueById(id, refFn) {
		this.repo.getFirebaseChild().child(id).off("value", refFn);
	}



	onValueByField(fieldName, fieldVal, cb) {

		//console.log("onValue By Handle", siteHandle);
		var refFn = (snapshot) => {

			if (!snapshot.exists()) cb(null, fieldVal);
			else {

				var docs = [];
				snapshot.forEach((item) => {

					var doc = item.val();
					doc.id = item.key();
					docs.push(doc);
				});

				var view = (docs.length == 0) ? null
					: this.repo.getViewMap(docs[0]);

				cb(view, fieldVal);
			}
		};

		this.repo.getFirebaseChild()
			.orderByChild(fieldName).equalTo(fieldVal)
			.on("value", refFn);


		return refFn;
	}

	offValueByField(refFn) {
		this.repo.getFirebaseChild().off("value", refFn);
	}


	onListAll(cb) {

		var refFn = (snapshot) => {

			if (!snapshot.exists()) cb([]);
			else {
				var docs = [];
				snapshot.forEach((item) => {

					var doc = item.val();
					doc.id = item.key();
					docs.push(doc);
				});

				var views = docs.map((doc) => this.repo.getViewMap(doc));
				cb(views);
			}
		};

		this.repo.getFirebaseChild().on("value", refFn);

		return refFn;
	}

	offList(refFn) {
		this.repo.getFirebaseChild().off("value", refFn);
	}

	onListByField(fieldName, fieldVal, cb) {

		//console.log("onListByField-setup: ", fieldName, fieldVal, cb);

		var refFn = (snapshot) => {

			//console.log("onListByField: ", fieldName, fieldVal);

			if (!snapshot.exists()) cb([], fieldVal);
			else {
				var docs = [];
				snapshot.forEach((item) => {

					var doc = item.val();
					doc.id = item.key();
					docs.push(doc);
				});

				var views = docs.map((doc) => this.repo.getViewMap(doc));
				cb(views, fieldVal);
			}
		};

		this.repo.getFirebaseChild()
			.orderByChild(fieldName).equalTo(fieldVal)
			.on("value", refFn);

		return refFn;
	}

	offListByField(refFn) {
		this.repo.getFirebaseChild().off("value", refFn);
	}
}