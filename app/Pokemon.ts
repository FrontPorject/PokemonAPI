const API =  "https://pokeapi.co/api/v2/pokemon"
async function api() {
    const response = await fetch(API);
    const resData = await response.json()
    if (!response.ok) {
        throw new Error(`Failed to fetch data`);
      }
    return resData
}

async function apiEachInfo(name:string) {
    const response = await fetch(`${API}/${name}`);
    const resData = await response.json()
    if (!response.ok) {
        throw new Error(`There is no name of ${name}`);
      }
    return resData
}
export default{api,apiEachInfo}