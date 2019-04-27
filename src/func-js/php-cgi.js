const {spawnSync} = require('child_process');

async function handler(event, context)
{
    return new Promise((resolve, reject) => {

        const php = spawnSync(
            '/opt/bin/php-cgi',
            ['-r', 'echo file_get_contents("php://stdin");'],
            {cwd: "/opt", env: process.env, input: event.body});

        if (php.status === 0)
        {
            resolve({
                statusCode: 200,
                headers: event.headers,
                body: php.stdout.toString('utf8'),
                isBase64Encoded: event.isBase64Encoded
            });
        }
        else
        {
            reject({
                statusCode: 500,
                headers: [],
                body: php.stderr.toString('utf8'),
                isBase64Encoded: false
            });
        }

    });
}

// noinspection JSUnusedGlobalSymbols
module.exports = exports = {handler};