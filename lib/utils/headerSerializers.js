const startCase = require('lodash/startCase')
const { SPACE, DASH } = require('../utils/constants')
const { CRLF } = require('../writers/warcFields')

/**
 * @param {string} headerKey
 * @return {string}
 */
function ensureHTTP2Headers (headerKey) {
  if (headerKey[0] === ':') return headerKey
  return startCase(headerKey).replace(SPACE, DASH)
}

/**
 * @desc Converts an HTTP headers object into its string representation
 * @param {Object} headers - The HTTP header object to be stringified
 * @returns {string}
 */
exports.stringifyHeaders = function stringifyHeaders (headers) {
  let headerKey
  let outString = ''
  for (headerKey in headers) {
    outString += `${ensureHTTP2Headers(headerKey)}: ${
      headers[headerKey]
    }${CRLF}`
  }
  outString += CRLF
  return outString
}

/**
 * @desc Converts an HTTP request headers object into its string representation
 * @param {Object} headers - The HTTP headers object for the request
 * @param {string} host - The host for the request to be used if the HTTP headers object does not contain the Host field
 * @returns {string}
 */
exports.stringifyRequestHeaders = function stringifyRequestHeaders (
  headers,
  host
) {
  let hasHost = false
  let headerKey
  let outString = ''
  for (headerKey in headers) {
    if (headerKey === 'host' || headerKey === 'Host') {
      hasHost = true
    }
    outString += `${ensureHTTP2Headers(headerKey)}: ${
      headers[headerKey]
    }${CRLF}`
  }
  if (!hasHost) {
    return outString + `Host: ${host}${CRLF}${CRLF}`
  }
  return outString + CRLF
}
