import {
  getUrlParamByName,
  processParamToArray,
  processParamToString,
  getSingleQueryString,
  getArrayQueryString
} from '../../utilities/urlParamHelper'

describe('getUrlParamByName', () => {
  test('empty query', () => {
    const res = getUrlParamByName('tags', '')
    expect(res).toBe(null)
  })

  test('empty value', () => {
    const res = getUrlParamByName('tags', '')
    expect(res).toBe(null)
  })

  test('non-existing param name', () => {
    const res = getUrlParamByName('tags', '')
    expect(res).toBe(null)
  })

  test('invalid input', () => {
    const res = getUrlParamByName({}, [])
    expect(res).toBe(null)
  })

  test('multiples queries', () => {
    const res = getUrlParamByName(
      'tags',
      '?tags=one,two,three&search=someTerm&toaster=hi'
    )
    expect(res).toBe('one,two,three')
  })
})

describe('getArrayQueryString', () => {
  test('takes out existing tag', () => {
    const res = getArrayQueryString(
      'tags',
      'one',
      '?tags=one,two,three&search=someTerm&toaster=hi'
    )
    expect(res).toBe('tags=two,three')
  })
  test('inserts tag to array', () => {
    const res = getArrayQueryString(
      'tags',
      'one',
      '?tags=two,three&search=someTerm&toaster=hi'
    )
    expect(res).toBe('tags=two,three,one')
  })
  test('adds a new tag when there is no existing tag', () => {
    const res = getArrayQueryString(
      'tags',
      'one',
      'search=someTerm&toaster=hi'
    )
    expect(res).toBe('tags=one')
  })
  test('returns empty string when the last tag is taken out', () => {
    const res = getArrayQueryString(
      'tags',
      'one',
      '?tags=one&search=someTerm&toaster=hi'
    )
    expect(res).toBe('')
  })

  test('returns empty string when input is invalid', () => {
    const res = getArrayQueryString({}, 'one', [])
    expect(res).toBe('')
  })
})
