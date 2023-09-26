const baseURL = () => {
    const inProduction = false

    if (inProduction) {
        return 'https://reach-server.onrender.com'
    }

    return 'https://reach-server.onrender.com'
}

export default baseURL