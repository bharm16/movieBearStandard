const assert = require('assert');
const {TmdbClient} = require("../../../src/tmdb-js");
const tmdbTestUtils = require('../utils/tmdb_test_utils');

const { getCredentialsPath } = require('../utils/tmdb_test_utils');
const credentialsPath = getCredentialsPath();

// Use the credentialsPath variable as needed in this test file


module.exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new TmdbClient(apiKey);

    describe("Authentication tests", () => {

        it('Should create a guest session.', async () => {
            let guestSessionID = await tmdb.getAuthenticator().createGuestSessionAsync();
            assert.ok(guestSessionID);
        });

        it('Should create a session without login.', async () => {
            let authenticator = tmdb.getAuthenticator();

            try {
                // Create a session
                const sessionId = await authenticator.createSessionAsync("chrome");
                console.log('Session ID:', sessionId); // Add a console log for sessionId
                assert.ok(sessionId);

                // Delete the session
                const isDeleted = await authenticator.deleteSessionAsync(sessionId);
                console.log('Session deletion status:', isDeleted); // Add a console log for session deletion status
                assert.ok(isDeleted);
            } catch (error) {
                console.error('Error:', error); // Add a console log for the caught error
                throw error;
            }
        }).timeout(15000);



        // Tests that do not work in CIs
        if (!process.env.CI) {

            it('Should create a session without login.', async () => {

                this.skip(); //skip for now

                let authenticator = tmdb.getAuthenticator();

                // Create a session
                const sessionId = await authenticator.createSessionAsync("chrome");
                assert.ok(sessionId);

                // Delete the session
                assert.ok(await authenticator.deleteSessionAsync(sessionId));
            }).timeout(15000);
        }
    });
}
