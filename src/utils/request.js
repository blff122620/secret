export default function request (history, method, url, body) {
  method = method.toUpperCase();
  if (method === 'GET') {
    // fetch的GET不允许有body，参数只能放在url中
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
    },
    body
  })
    .then((res) => {
      if (res.status === 401) {
        history.push('/login');
        return Promise.reject('Unauthorized.');
      } else {
        const token = res.headers.get('access-token');
        if (token) {
          sessionStorage.setItem('access_token', token);
        }
        return res.json();
      }
    });
}

export const get = (history, url) => request(history, 'GET', url);
export const post = (history, url, body) => request(history, 'POST', url, body);
export const put = (history, url, body) => request(history, 'PUT', url, body);
export const del = (history, url, body) => request(history, 'DELETE', url, body);