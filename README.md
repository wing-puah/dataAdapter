## Data adapter

Convert data to suitable keys by defining a json object.

**Usage**

```
const data = {
    one: {
        one: 'this is one',
        two: 'this is two',
        renderAdd: { 'one': 1, two: 2 }
    }
}

const schema = [
    { dataKey: 'one.one', key: 'first' },
    { dataKey: 'one.two', key: 'second' }
    { 
      dataKey: 'one.renderAdd', 
      key: 'addition', 
      renderer: data => parseInt(data.one, 10) + parseInt(data.two, 10)
    }
]

const entity = {
    three: 'this is third',
    four: {
        five: 'this is nested'
    }
}
```

Pass the data and schema to the adapter. The transformed adapter will be mapped to the entity.

```
const transformedData = buildEntity({ data, schema , entity })
```

**Output**

```
{
    first: 'this is one',
    second: 'this is two',
    three: 'this is third',
    addition: 3,
    four: {
        five: 'this is nested'
    }
}
```


If the input data is an array of data, use `mapDataToAdapter({ data, schema})`, which will map and call the `buildEntity` internally. In this case, it will allow entity to be mapped with the object as there are too many different use cases.

## Build schema object
Alternatively, you might want a flexible schema output that could be utilised for rendering in the UI. 

**Usage**

```
const schema = [
    { dataKey: 'one.one', key: 'first' , uiRenderer: data => <em>data</em> },
    { dataKey: 'one.two', key: 'second' }
    { 
      dataKey: 'one.renderAdd', 
      key: 'addition', 
      renderer: data => parseInt(data.one, 10) + parseInt(data.two, 10)
    }
]

buildSchema({ data, schema })
```
You can also define a default schema to be added to each schema. By default, we add a `uiRenderer` key to render '-' if no data is found.
```
const defaultSchema = { uiRenderer: _data => _data || '-' }; 
buildSchema({ data, schema, defaultSchema })
```

**Output**
```
{
	first: {
		dataKey: 'one.one',
		key: 'first',
		data: 'this is one',
        uiRenderer: _data => _data || '-' 
	},
	second: {
		dataKey: 'one.two',
		key: 'second',
		data: 'this is two',
        uiRenderer: _data => _data || '-' 
	},
};
```


## Dependencies 
[Immutable JS](https://github.com/immutable-js/immutable-js)