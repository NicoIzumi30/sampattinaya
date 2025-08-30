// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ 
    name: 'sampattinaya API',
    message: 'Welcome to sampattinaya API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
