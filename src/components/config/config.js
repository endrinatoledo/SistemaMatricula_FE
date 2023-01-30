const api = "http://localhost:8081"
const data = process.env.REACT_APP_ENV === 'production' ? 
{
    backURL: "/api",
    apiURL: api
}:
{
    backURL: api+"/api",
    apiURL: api
};
module.exports = data
