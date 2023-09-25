const baseURL = () => {
    const inProduction = false

    if (inProduction) {
        return 'https://reach-server.onrender.com'
    }

    return ''
}

export default baseURL