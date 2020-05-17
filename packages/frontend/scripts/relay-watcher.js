// TODO: It would be nice to make the log out put here pretty :)

const chokidar = require('chokidar');
const execa = require('execa');

async function compile() {
    try {
        await execa('relay-compiler');
    } catch (e) {
        console.error('Error ocurred in Relay compilation.');
        console.error(e);
    }
}

async function main() {
    await compile();

    chokidar
        .watch(['./src/**/*.{ts,tsx}', '../backend/src/schema.gql'], {
            ignoreInitial: true,
            ignored: /__generated__/,
        })
        .on('all', async () => {
            await compile();
        });
}

main();
