import data from './data'

const customFilter = (dataArray, filteringObject) => {
  const t1 = performance.now()

  const conditions =
    Object
    .keys(filteringObject)
    .map(key => ({
      key,
      type: typeof filteringObject[key],
      value: filteringObject[key]
    }))

  const result = dataArray.filter(item => {
    const hasAllKeys = !conditions.some(condition => !(condition.key in item));

    if (!hasAllKeys) return false;

    return conditions.every(condition => {
      const value = item[condition.key]

      switch (typeof value) {
        case 'string':
          if (condition.type === 'string')
            return value === condition.value;

          if (condition.type === 'object')
            return condition.value.includes(value);

        case 'object':
          const values = Object.values(value)
          if (condition.type === 'string')
            return values.includes(condition.value);

          if (condition.type === 'object')
            return values.some(value =>
              condition.value.includes(value)
            );
      }
    })
  })

  const t2 = performance.now()

  return {
    time: t2 - t1,
    total: dataArray.length,
    results: result.length,
    result
  }
}

const filteringObject = {
  category: ["bal", "nog", "sdr"],
  ID: ['004', '002']
}

const result = customFilter(data, filteringObject);

console.log(result);