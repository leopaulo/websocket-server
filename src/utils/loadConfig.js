import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { fileURLToPath } from 'url';

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = path.dirname(FILE_NAME);
const ENV_PATH = path.resolve(DIR_NAME, '../../.env');

if (fs.existsSync(ENV_PATH)) {
	console.log('Loading config...');

	dotenvExpand.expand(
		dotenv.config({
			path: ENV_PATH,
		})
	);

	console.log('Config loaded!');
}
