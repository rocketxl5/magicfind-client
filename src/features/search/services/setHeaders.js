export const setHeaders = (token) => {
    if (!token) {
        return { headers: { 'Content-Type': 'application/json' } }
    }
    else {
        return { headers: { 'Content-Type': 'application/json', 'auth-token': token } }
    }
}

export default setHeaders;