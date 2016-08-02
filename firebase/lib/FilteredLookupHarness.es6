
import _ from "lodash";


export class FilteredLookupHarness {

	constructor(props) {

		this.filterRef = null;
		this.filterIds = [];

		this.onList = props.onList;
		this.offList = props.offList;

		this.onAdd = props.onAdd;
		this.onRemove = props.onRemove;
		this.onUpdate = props.onUpdate;

		this.mapIds = props.mapIds;
		this.mapFields = props.mapFields;
	}

	unmount() {
		if (this.filterRef) this.offList(this.filterRef);
	}


	filterById(id) {



		if (this.filterRef) this.offList(this.filterRef);

		//console.log("FILTER BY ID: ", id, this.onList);

		if (id)
			this.filterRef = this.onList(id, this._onPublish.bind(this));
	}


	_onPublish(list) {

		//console.log("FilteredLookup HArness: ", list, this.onList);

		var oldIds = this.filterIds;
		var newIds = list.map(this.mapIds);

		var add = _.difference(newIds, oldIds);
		var remove = _.difference(oldIds, newIds);


		if (_.isFunction(this.mapFields) && _.isFunction(this.onUpdate))

			this.onUpdate(list.map(this.mapFields));

		if (add.length > 0) this.onAdd(add);
		if (remove.length > 0) this.onRemove(remove);

		this.filterIds = newIds;
	}
}