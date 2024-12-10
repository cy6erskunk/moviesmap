import fs from 'node:fs';
import path from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;
const locations = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'locations_data.json'), 'utf8')
);

export default (req: any, res: any) => res.json(locations);
