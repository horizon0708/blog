// https://stackoverflow.com/a/901144
export function getUrlParamByName (name, query = '') {
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(query)
  if (!results || !results[2]) return null
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function processParamToArray (paramName, query) {
  const arr = getUrlParamByName(paramName, query)
  return arr ? arr.split(',') : null
}

export function processParamToString (paramName, query) {
  return getUrlParamByName(paramName, query)
}
export function getSingleQueryString (param,rawQuery, newQuery) {
  const existingQuery = processParamToString(param, rawQuery)
  if (newQuery) {
    return existingQuery === newQuery ? '' : `${param}=${newQuery}`
  }
  return existingQuery ? `${param}=${existingQuery}` : ''
}

export function getArrayQueryString (param, rawQuery, newQuery) {
  const existingQueries = processParamToArray(param, rawQuery)
  if (newQuery) {
    if (existingQueries && Array.isArray(existingQueries)) {
      if (!arrIncludes(newQuery, existingQueries)) {
        return `${param}=${existingQueries.concat(newQuery).join(',')}`
      }

      const newArr = findAndPop(newQuery, existingQueries)
      return newArr.length === 0 ? '' : `${param}=${newArr.join()}`
    }
    return `${param}=${newQuery}`
  }
  return ''
}

export function constructQuery (queries, defaultRoute = '/') {
  // filters out empty constructed queries
  const filtered = queries.filter(x => {
    return x.length > 0
  })
  if (filtered.length > 0) {
    const output = filtered.reduce((a, b, i) => {
      return a + `&${b}`
    })
    return `?${output}`
  }
  return defaultRoute
}

export function arrIncludes (ele, arr) {
  return arr ? arr.includes(ele) : false
}

export function findAndPop (ele, arr) {
  const index = arr.findIndex(x => x === ele)
  if (index > -1) {
    const head = arr.slice(0, index)
    const tail = arr.slice(index + 1)
    return [...head, ...tail]
  }
  return arr
}
