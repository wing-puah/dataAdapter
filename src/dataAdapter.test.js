import {
	buildEntityFromSchema,
	mapDataToAdapter,
	buildSchema,
} from './dataAdapter';

const data = {
	one: {
		one: 'this is one',
		two: 'this is two',
		renderAdd: { one: 1, two: 2 },
	},
};

const schema = [
	{ dataKey: 'one.one', key: 'first' },
	{ dataKey: 'one.two', key: 'second' },
];

const rendererSchema = {
	dataKey: 'one.renderAdd',
	key: 'addition',
	renderer: data => parseInt(data.one, 10) + parseInt(data.two, 10),
};

const entity = {
	three: 'this is third',
	four: {
		five: 'this is nested',
	},
};

const expected = {
	first: 'this is one',
	second: 'this is two',
};

const expectedWithEntity = {
	first: 'this is one',
	second: 'this is two',
	three: 'this is third',
	four: {
		five: 'this is nested',
	},
};

function repeatData(data, indexToRepeatTo) {
	return Array.from({ length: indexToRepeatTo }, () => data);
}

describe('buildEntityFromSchema', () => {
	test('should build data object based on schema', () => {
		const test = buildEntityFromSchema({ data, schema });
		expect(test).toEqual(expected);
	});

	test('should build data object based on schema and append to entity if provided', () => {
		const test = buildEntityFromSchema({ data, schema, entity });
		expect(test).toEqual(expectedWithEntity);
	});

	test('should not fail when null value is passed to entity', () => {
		const test = buildEntityFromSchema({ data, schema, entity: null });
		expect(test).toEqual(expected);
	});

	test('should render data as per the data renderer', () => {
		const _schema = [...schema, rendererSchema];
		const test = buildEntityFromSchema({ data, schema: _schema });
		const _expected = { ...expected, addition: 3 };
		expect(test).toEqual(_expected);
	});
});

describe('mapDataToAdapter', () => {
	test('should map and convert data array', () => {
		const _repeatedData = repeatData(data, 3);
		const test = mapDataToAdapter({ data: _repeatedData, schema });
		const _repeatedResult = repeatData(expected, 3);
		expect(test).toEqual(_repeatedResult);
	});
});

const schemaObject = {
	first: {
		dataKey: 'one.one',
		key: 'first',
		data: 'this is one',
	},
	second: {
		dataKey: 'one.two',
		key: 'second',
		data: 'this is two',
	},
};

describe('buildSchema', () => {
	test('should create schema object', () => {
		const test = buildSchema({ data, schema });
		expect(test).toMatchObject(schemaObject);
		expect(test.first).toHaveProperty('uiRenderer');
	});
});
