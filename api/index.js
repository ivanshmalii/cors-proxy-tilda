export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing "url" query parameter.');
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.arrayBuffer();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.status(200).send(Buffer.from(data));
  } catch (err) {
    res.status(500).send('Error fetching the target URL.');
  }
}

