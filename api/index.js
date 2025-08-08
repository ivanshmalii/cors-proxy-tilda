module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).send('Missing "url" query parameter.');
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.arrayBuffer();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.status(200).send(Buffer.from(data));
  } catch (err) {
    res.status(500).send('Error fetching the target URL.');
  }
};
