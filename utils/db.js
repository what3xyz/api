const env = require("../config/api.json");
const { Pool } = require('pg');


const pool = new Pool({connectionString: env.dbConnectionString});
if(env.LOGGING_DB) console.log('Pool: Opening Pool.');


module.exports = {

    query: async (text, params) => {

        const start = Date.now();

        let results = {};
        try {
            results = await pool.query(text, params);
        } catch (e) {
            results.error = e;
            console.error('Query Error: ', e);
        }

        const duration = Date.now() - start;
        if(env.LOGGING_DB) console.log('Query ('+results.rowCount+'):', duration + ' ms. '+ text.substring(0, 40));

        return results;

    }

};