const fs = require('fs');
const html = fs.readFileSync('live-homepage.html', 'utf8');
const patterns = [
  /<title>.*?<\/title>/gi,
  /<meta[^>]+name=['"]description['"][^>]*>/gi,
  /<meta[^>]+property=['"]og:title['"][^>]*>/gi,
  /<meta[^>]+property=['"]og:description['"][^>]*>/gi,
  /<meta[^>]+property=['"]og:image['"][^>]*>/gi,
  /<meta[^>]+name=['"]twitter:title['"][^>]*>/gi,
  /<meta[^>]+name=['"]twitter:description['"][^>]*>/gi,
  /<meta[^>]+name=['"]twitter:image['"][^>]*>/gi,
];
for (const pattern of patterns) {
  const matches = html.match(pattern);
  if (matches) {
    for (const match of matches) {
      console.log(match);
    }
  }
}
