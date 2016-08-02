
import {AppConfig} from "../lib/config/AppConfig";
import {CommandResult, CommandError} from "./Commands";

export class FirebaseRepo {



	constructor(childPath, mapper) { // - context == "server or client"

		this.childPath = childPath;
		this.mapper = mapper;

		switch(AppConfig.getAppContext()) {

			case AppConfig.CLIENT: this.viewMap = mapper.clientViewMap; break;
			case AppConfig.SERVER: this.viewMap = mapper.serverViewMap; break;

			default:
				// - old-style mapper TODO: deprecate!!!!
				this.viewMap = mapper.createViewFromDoc;
				this.mapper.createDocMap = mapper.filterValidFields;
				this.mapper.updateDocMap = mapper.filterValidFields;
				console.warn("YOU NEED TO UPDATE THIS MAPPING CLASS: " + this.mapper.getType())
		}
	}


	getFirebaseRoot() {

		//console.log("AppContext Key:", AppConfig.getKey());
		return AppConfig.getFirebaseRoot();
	}

	getFirebaseChild() {
		return AppConfig.getFirebaseRoot().child(this.childPath);
	}

	getViewMap(doc) {
		//console.log("this-mapper/viewMap: ", this.mapper, this.viewMap);
		if (!this.mapper || !this.viewMap) throw "no viewMap: " + this.childPath;
		return this.viewMap(doc);
	}

	getCreateDocMap(doc) {
		if (!this.mapper || !this.mapper.createDocMap) throw "no createDocMap: " + this.childPath;
		return this.mapper.createDocMap(doc);
	}

	getUpdateDocMap(doc) {
		if (!this.mapper || !this.mapper.updateDocMap) throw "no updateDocMap: " + this.childPath;
		return this.mapper.updateDocMap(doc);
	}


	getMapper() {

		if (this.mapper == null) throw Error("no mapper: ", this.childPath);

		console.warn("YOU NEED TO UPDATE THIS MAPPING CLASS: " + this.mapper.getType());

		return this.mapper;
	}


	getDocById(id) {

		return new Promise((resolve) => {

			var fBase = this.getFirebaseChild();

			var docRef = fBase.child(id);
			docRef.once("value", (snapshot) => {

				if (!snapshot.exists()) resolve(null);
				else {

					var doc = snapshot.val();
					doc.id = snapshot.key();

					//var view = this.getMapper().createViewFromDoc(doc);
					var view = this.getViewMap(doc);
					resolve(view);
				}
			});
		});
	}

	_getRawDocWhere(fieldName, fieldVal, secondaryFilter) {

		return new Promise((resolve) => {

			this.getFirebaseChild()

				.orderByChild(fieldName)
				.equalTo(fieldVal)

				.once("value", (snapshot) => {

					if (!snapshot.exists()) resolve(null);
					else {

						var docs = [];
						snapshot.forEach((item) => {

							var doc = item.val();
							doc.id = item.key();

							if (!secondaryFilter) docs.push(doc);

							else if (typeof secondaryFilter === "function")
								if (secondaryFilter(doc)) docs.push(doc);
						});

						resolve(docs[0]);
					}

				});
		});
	}
	getDocWhere(fieldName, fieldVal, secondaryFilter) {

		return this._getRawDocWhere(fieldName, fieldVal, secondaryFilter)
			.then((doc) => (doc != null) ? this.getViewMap(doc) : null);
	}


	listAllDocs() {

		return new Promise((resolve) => {

			this.getFirebaseChild()

				.once("value", (snapshot) => {

					if (!snapshot.exists()) resolve([]);
					else {

						var docs = [];
						snapshot.forEach((item) => {

							var doc = item.val();
							doc.id = item.key();

							docs.push(doc);
						});

						var views = docs.map((doc) => this.getViewMap(doc));
						resolve(views);
					}

				});
		});
	}

	listDocsWhere(fieldName, fieldVal, secondaryFilter) {

		return new Promise((resolve) => {

			this.getFirebaseChild()

				.orderByChild(fieldName)
				.equalTo(fieldVal)

				.once("value", (snapshot) => {

					if (!snapshot.exists()) resolve([]);
					else {

						var docs = [];
						snapshot.forEach((item) => {

							var doc = item.val();
							doc.id = item.key();

							if (!secondaryFilter) docs.push(doc);

							else if (typeof secondaryFilter === "function")
								if (secondaryFilter(doc)) docs.push(doc);
						});

						var views = docs.map((doc) => this.getViewMap(doc));
						resolve(views);
					}

				});
		});
	}

	// createDoc(fields) {
	//
	// 	//var mapper = this.getMapper();
	//
	// 	return new Promise((resolve, reject) => {
	//
	// 		//var doc = mapper.filterValidFields(fields);
	// 		var doc = this.getCreateDocMap(fields);
	//
	// 		var docRef = this.getFirebaseChild().push();
	// 		docRef.set(doc, (err) => {
	//
	// 			console.log("createDoc: ", doc, err);
	//
	// 			if (err) reject(new CommandError(err));
	// 			else {
	//
	// 				doc.id = docRef.key();
	//
	// 				var view = this.getViewMap(doc);
	// 				console.log("getView: ", view);
	// 				resolve(view);
	// 			}
	// 		});
	// 	});
	// }

	createDoc(fields) {

		var doc = this.getCreateDocMap(fields);

		doc.dateCreated = doc.dateModified = Date.now();

		return this.getFirebaseChild().push(doc).then((docRef) => {

			doc.id = docRef.key();

			var view = this.getViewMap(doc);
			// console.log("getView: ", view);

			return view;

		});
	}


	updateDoc(id, fields) {

		//var cmdResult = new CommandResult();

		return new Promise((resolve, reject) => {

			//var mapper = this.getMapper();

			// - check to see if the rec exists....
			var docRef = this.getFirebaseChild().child(id);

			//console.log("update doc 1", mapper.getType());
			docRef.once("value", (snapshot) => {

				// console.log("update doc 2", this.mapper.getType());

				if (!snapshot.exists())
					reject(new CommandError("not-found",
						`No ${this.mapper.getType()} found with this Id`));

				else {

					// console.log("update doc: ", fields);

					//fields.id = docRef.key();

					var valid = this.getUpdateDocMap(fields);

					valid.dateModified = Date.now();

					// console.log("VALID USER FIELDS", valid);
					docRef.update(valid);
					//console.log("update doc 4", valid);

					valid.id = docRef.key();

					//var view = this.getViewMap(doc);
					resolve(valid);
					//resolve(valid);
				}
			});
		});
	}

	removeDoc(id) {

		return new Promise((resolve, reject) => {

			this.getFirebaseChild().child(id).remove((error) => {

				if (error) reject(new CommandError(error));
				else resolve(id);
			});
		});
	}
}