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

## Dependencies 
[Immutable JS](https://github.com/immutable-js/immutable-js)