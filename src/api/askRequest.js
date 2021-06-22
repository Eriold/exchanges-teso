export default async function askRequest (path, config = {}, api = 1, isContentType = true) {
  let baseUrl


  let headers = {}
  if (isContentType) {
    headers = {
      // 'Ocp-Apim-Subscription-Key': API_KEY,
      'Ocp-Apim-Trace': true,
      // Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  } else {
    headers = {
      // 'Ocp-Apim-Subscription-Key': API_KEY,
      'Ocp-Apim-Trace': true,
      // Authorization: `Bearer ${getToken()}`
    }
  }

  const _config = { ...config }
  _config.headers = { ...headers, ..._config.headers}

  let response

  try {
    response = await window.fetch(`${baseUrl}${path}`, _config)
  } catch (error) {
    return Promise.resolve({ data: null, error })
  }

  if (!response.ok) {
    return Promise.resolve({ data: await response.json(), error: response.statusText, statusCode: response.status })
  }

  const data = api === 2 ? response : await response.json()
  return Promise.resolve({ data, error: null, statusCode: response.status })
}
