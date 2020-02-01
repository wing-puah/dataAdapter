import { Map, List, fromJS, isImmutable } from 'immutable';

const isObject = maybeObj =>
	maybeObj && typeof maybeObj === 'object' && maybeObj.constructor === Object;

function parseToMap(maybeObj) {
	return Map.isMap(maybeObj) ? maybeObj : Map(maybeObj);
}
function parseToObj(maybeMap) {
	return Map.isMap(maybeMap) ? maybeMap.toJS() : maybeMap;
}
function parseToList(maybeArr) {
	return List.isList(maybeArr) ? maybeArr : List(maybeArr);
}
function parseToArr(maybeList) {
	return List.isList(maybeList) ? maybeList.toJS() : maybeList;
}

function parseToImmutable(maybeCollection) {
	return isImmutable(maybeCollection)
		? maybeCollection
		: fromJS(maybeCollection);
}

function parseToJS(maybeCollection) {
	return isImmutable(maybeCollection)
		? maybeCollection.toJS()
		: maybeCollection;
}

export { parseToMap, parseToObj, parseToArr, parseToImmutable, isObject };
