import fs from 'fs';

const locations = JSON.parse(fs.readFileSync('public/locations.json', 'utf8'));

export default (req: any, res: any) => res.json(locations);
