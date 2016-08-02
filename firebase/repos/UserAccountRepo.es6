import {FirebaseRepo} from "../lib/FirebaseRepo";

export class UserAccountRepo extends FirebaseRepo {

	constructor() {
		super("/users/UserAccount", new UserAccountMapper());
	}

	superCreateDoc(doc) {
		return super.createDoc(doc);
	}

	createUserAccount(email, fields) {

		//var superCreateDoc = super.createDoc.bind(super);

		return new Promise((resolve, reject) => {

			fields = fields || {};

			var doc = {

				profile: {
					firstName: fields.firstName || "",
					lastName: fields.lastName || "",
					email: email
				},

				firstName: fields.firstName || "",
				lastName: fields.lastName || "",

				email: email,

				signupType: fields.signupType || "",
				signupStep: fields.signupStep || "",

				isSignupComplete: false,

				isCredentialVerified: false,
				isCredentialActive: false
			};

			//super.createDoc(doc).then(resolve).catch(reject);
			this.superCreateDoc(doc).then(resolve).catch(reject);
		});
	}

	createVisitor() {

		//return new NameGenerator().fetchName().then((result) => {

		var result = {first: "f", last: "l"};
		var doc = {

			profile: {firstName: result.first, lastName: result.last},

			firstName: result.first, lastName: result.last,

			signupType: "visitor",
			signupStep: "none",

			isSignupComplete: false,

			isCredentialVerified: false,
			isCredentialActive: false
		};

		// console.log("createVisitor: ", doc);

		//return super.createDoc(doc); //.then(() => { console.error("inner-create-vis")});
		return this.superCreateDoc(doc);
		//});
	}

	updateUserProfile(id, fields) {

		//console.log("UPDATGE-PROF: ", id, fields);

		return new Promise((resolve, reject) => {

			var docRef = this.getFirebaseChild().child(id).child("profile");

			docRef.once("value", (snapshot) => {

				if (!snapshot.exists())
					reject(new CommandError("not-found",
						`No ${this.mapper.getType()} found with this Id`));

				else {

					var mapper = new UserProfileMapper();
					var valid = mapper.updateDocMap(fields);

					docRef.update(valid);

					var view = mapper.clientViewMap(valid);
					view.id = docRef.key();

					resolve(view);
				}
			});
		});
	}
}