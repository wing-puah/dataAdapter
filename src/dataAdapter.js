import { Map } from 'immutable';
import { parseToObj, isObject, parseToImmutable, parseToArr } from './helpers';

function getDataFromDotNotation(data, key) {
	const dataObj = parseToObj(data);
	if (!dataObj) {
		return null;
	}

	return key
		? key.split('.').reduce((o, i) => {
				return isObject(o) && Object.prototype.hasOwnProperty.call(o, i)
					? o[i]
					: null;
		  }, dataObj)
		: '';
}

function assignDataToDotNotation(data, key, valueToAssign) {
	const keyArray = key.split('.');
	const keyLen = keyArray.length;
	const immutableOps = keyLen === 1 ? 'set' : 'setIn';
	const keyToChange = keyLen === 1 ? keyArray[0] : keyArray;

	return data[immutableOps](keyToChange, valueToAssign);
}

/**
 * Transform data to defined schema and combined with entity
 *
 * @param {Object} data data to transform to schema
 * @param {Object} schema schema
 * @property {string} schema.dataKey
 * @property {string} schema.key
 * @property {function} schema.renderer
 * @param {Object} entity Initial entity
 */
function buildEntityFromSchema({ data, schema, entity }) {
	const immutableObj = entity ? parseToImmutable(entity) : Map({});
	const dataObj = parseToObj(data);

	const immutableEntity = schema.reduce((acc, curSchema) => {
		const { dataKey, key, renderer } = curSchema;
		const dataFromKey =
			dataKey === 'rowData' || !dataKey
				? dataObj
				: getDataFromDotNotation(dataObj, dataKey);
		const valueToAssign = renderer ? renderer(dataFromKey) : dataFromKey;

		const _key = key || dataKey;
		const _acc = assignDataToDotNotation(acc, _key, valueToAssign);
		return _acc;
	}, immutableObj);

	return immutableEntity.toJS();
}

function mapDataToAdapter({ data, schema }) {
	return data.map(singleData =>
		buildEntityFromSchema({ data: singleData, schema }),
	);
}

function reverseSchema(schema) {
	const schemaArray = parseToArr(schema);

	return schemaArray.reduce((acc, curSchema, idx) => {
		const { dataKey, key } = curSchema;
		const _key = key || dataKey;
		const _schema = { dataKey: _key, key: dataKey };

		acc[idx] = _schema;
		return acc;
	}, schemaArray);
}

export { buildEntityFromSchema, reverseSchema, mapDataToAdapter };
