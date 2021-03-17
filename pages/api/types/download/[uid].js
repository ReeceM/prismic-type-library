import fs from 'fs'
import path from 'path'

export default function handler(req, res) {

  const {
    query: { uid },
    headers,
    method,
  } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end('Method not allowed')
  }

  const dir = path.resolve('./public', 'index.json');
  let file = fs.readFileSync(dir);
  let {data} = JSON.parse(file.toString())

  let custom_type = data.filter(t => t.hid === uid);

  if (!custom_type || custom_type.length <= 0) {
    res.status(404).end(`Custom Type: ${uid} not found`);
  }
  else {
    let type = custom_type[0];

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${type.name}.json"`);

    res.json(JSON.stringify(type.custom_type, null, 2));
  }
}
