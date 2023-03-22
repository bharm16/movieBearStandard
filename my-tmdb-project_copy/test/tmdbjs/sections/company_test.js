const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Company GET tests', () => {

        // TODO [david98hall, 2021-08-15]: Test all GET methods

        let company = {id: "1", name: "Lucasfilm Ltd."};
        it('Should get detail data.', async () => {
            try {
                let json = await tmdb.getCompanySection().getCompany(company.id).getDetailsAsync();

                // Assert the results
                assert.ok(json);
                assert.ok(json.name.includes(company.name));

            } catch (error) {
                console.error("Error in 'Should get detail data.' test:", error);
                assert.fail(error);
            }
        });


        it("Should get alternative name data.", async () => {
            let data = await tmdb.getCompanySection().getCompany(company.id).getAlternativeNamesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get image data.", async () => {
            let data = await tmdb.getCompanySection().getCompany(company.id).getImagesAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });
    });
}