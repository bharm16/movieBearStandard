const fs = require('fs').promises;
const path = require('path');

const getCredentialsPath = () => {
    const credentialsDirectory = "/Users/bryceharmon/Desktop/movieBearStandard/my-tmdb-project_copy/src/";
    return path.join(credentialsDirectory, 'credentials.json');
};

/**
 * Gets the API key from the file system.
 * @returns {Promise<string>} A Promise of an API key as a string.
 */
module.exports.getApiKeyAsync = async () => {
    if (process.env.TMDB_API_V3_KEY) {
        // If the TMDb API key can be found among the secrets, use it
        return process.env.TMDB_API_V3_KEY;
    } else {
        // Otherwise, get it from the file system
        let credentials = await getCredentialsJsonAsync();
        return credentials["tmdb_api_v3_key"];
    }
}
/**
 * Gets login information.
 * @returns {Promise<{password: string, username: string}>}
 */
exports.getLoginInformationAsync = async () => {

    if (process.env.TMDB_USERNAME && process.env.TMDB_PASSWORD) {
        return {
            "username": process.env.TMDB_USERNAME,
            "password": process.env.TMDB_PASSWORD
        }
    }

    let credentials = await getCredentialsJsonAsync();
    return {
        "username": credentials.username,
        "password": credentials.password
    };
};

/**
 * Gets a session ID.
 * @returns {Promise<string>} A Promise of a session ID string.
 */
exports.getSessionIdAsync = async () => {
    return process.env.TMDB_SESSION_ID
        ? process.env.TMDB_SESSION_ID
        : (await getCredentialsJsonAsync()).session_id;
};

/**
 * Gets the credentials JSON from the file system.
 * @returns {Promise<*>} A Promise of credential data in JSON format.
 */
getCredentialsJsonAsync = async () => {
    let credentialsPath = getCredentialsPath();
    let credentials = await fs.readFile(credentialsPath);
    return JSON.parse(credentials.toString());
}


module.exports = {
    getCredentialsPath,
    getApiKeyAsync: module.exports.getApiKeyAsync,
    getLoginInformationAsync: exports.getLoginInformationAsync,
    getSessionIdAsync: exports.getSessionIdAsync,
};