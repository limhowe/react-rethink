
import R from "ramda";
import _ from "lodash";

export class FilteredList {

	constructor(dataClient, onPublish) {

		this.dataClient = dataClient;

		this.listRefs = {};
		this.listDocs = [];

		this.mappedFields = [];

		this.onPublish = onPublish;
	}

	unmount() {

		var ids = this.listDocs.map((doc) => doc.id);
		this.removeIds(ids);
	}

	addIds(ids) {

		ids.forEach((id) => {
			this.listRefs[id] = this.dataClient.onValueById(id, this._onValue.bind(this))
		});

		this._publishList();
	}

	removeIds(ids) {

		ids.forEach((id) => {

			this.dataClient.offValueById(id, this.listRefs[id]);
			delete this.listRefs[id];
		});

		_.remove(this.listDocs, (ele) => {
			return (ids.indexOf(ele.id) > -1)
		});


		this._publishList();
	}

	updateFields(fields) {

		this.mappedFields = fields;

		this._publishList();
	}


	_onValue(doc, id) {

		if (doc == null) throw `doc is null (id:${id})`;

		var idx = _.findIndex(this.listDocs, (ele) => {
			return ele.id == doc.id;
		});

		if (idx > -1) this.listDocs[idx] = doc;
		else this.listDocs.push(doc);

		if (this.listDocs.length == Object.keys(this.listRefs).length)

			this._publishList()
	}

	_mergeDocsWithFields() {

		return this.listDocs.map((doc) => {

			//console.log("_merge: ", doc, this.mappedFields);
			var found = _.find(this.mappedFields, {id: doc.id});
			//var found = R.find(R.propEq("id", doc.id), this.mappedFields);
			return (found) ? R.merge(doc, found) : R.merge(doc, {_mergeFound: false});
		})
	}

	_publishList() {

		if (_.isFunction(this.onPublish))

			if (this.listDocs.length == Object.keys(this.listRefs).length)
				this.onPublish(this._mergeDocsWithFields());
		//this.onPublish(this.listDocs);
	}
}