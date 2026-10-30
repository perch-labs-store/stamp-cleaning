// Pre-renders the React app into dist/index.html so search engines see full content.
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
const { render, faqs } = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)
let html = readFileSync('dist/index.html', 'utf8')
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(faqLd)}</script></head>`)
writeFileSync('dist/index.html', html)
console.log('Pre-rendered dist/index.html')
