const assert = require('assert');

const tmdbUtils = require('../src/utils/tmdb_utils');
const tmdbTestUtils = require('./tmdbjs/utils/tmdb_test_utils');

const { getApiKey, getLoginInformationAsync } = require('./tmdbjs/utils/tmdb_test_utils.js');

const tests = [
    require('./tmdbjs/utils/tmdb_utils_test'),
    require('./tmdbjs/authentication/authentication_test'),
    require('./tmdbjs/sections/account_test'),
    require('./tmdbjs/sections/collection_test'),
    //require('./tmdbjs/sections/company_test'),
    require('./tmdbjs/sections/configuration_test'),
    require('./tmdbjs/sections/credit_test'),
    require('./tmdbjs/sections/discover_test'),
    require('./tmdbjs/sections/find_test'),
    require('./tmdbjs/sections/genre_test'),
    require('./tmdbjs/sections/guest_session_test'),
    require('./tmdbjs/sections/keyword_test'),
    require('./tmdbjs/sections/list_test'),
    require('./tmdbjs/sections/movie_test'),
    require('./tmdbjs/sections/network_test'),
    require('./tmdbjs/sections/people_test'),
    require('./tmdbjs/sections/review_test'),
    require('./tmdbjs/sections/search_test'),
    require('./tmdbjs/sections/trending_test'),
    require('./tmdbjs/sections/tv_show_test'),
    require('./tmdbjs/sections/watch_provider_test')
];


describe('TMDb API Wrapper', function() {
    this.timeout(10000); // Increase the timeout to 10000ms (10 seconds)

    it('Unit Tests', async function() {

        let apiKey = await tmdbTestUtils.getApiKeyAsync();
        assert.ok(apiKey);

        // Get login information
        let loginInfo = await getLoginInformationAsync();

        // Create a session
        let sessionId = await tmdbUtils.createLoginSessionAsync(apiKey, loginInfo.username, loginInfo.password);
        assert.ok(sessionId);
        console.log("Successfully created a session.");

        // Run all tests
        tests.forEach(test => {
            test.runTest({ "apiKey": apiKey, "sessionId": sessionId });
        });

        // After all tests have finished, delete the session
        after(async function() {
            this.timeout(10000); // Increase the timeout for the after hook to 10000ms (10 seconds)
            await tmdbUtils.deleteSessionAsync(apiKey, sessionId);
            console.log("Successfully deleted the session.");
        });
    });
});