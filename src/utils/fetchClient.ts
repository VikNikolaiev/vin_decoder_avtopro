const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

// a promise resolved after a given delay
function wait(delay: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
    url: string,
    method: RequestMethod = 'GET',
    // eslint-disable-next-line
  data: any = null, // we can send any data to the server
): Promise<T> {
    const options: RequestInit = { method };

    if (data) {
        // We add body and Content-Type only for the requests with data
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
    }

    // we wait for testing purpose to see loaders
    return wait(300)
        .then(() => fetch(BASE_URL + url, options))
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        });
}

export const client = {
    get: <T>(url: string) => request<T>(url),
    // eslint-disable-next-line
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
    // eslint-disable-next-line
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
    delete: (url: string) => request(url, 'DELETE'),
};
