let baseUrl = "";
switch (process.env.NODE_ENV) {
    case 'dev':
        baseUrl = "http://localhost:8088/"
        break
    case 'serve':
        baseUrl = "http://localhost:8089/"
        break
}

export default baseUrl;
