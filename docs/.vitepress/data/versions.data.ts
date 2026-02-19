import { createContentLoader } from 'vitepress'

export default createContentLoader('en/**/*.md', {
  transform(rawData) {
    const versions: Record<string, string> = {}

    for (const page of rawData) {
      let cleanUrl = page.url.replace(/\.html$/, '').replace(/\/$/, '')

      if (cleanUrl.startsWith('/en/')) {
        cleanUrl = cleanUrl.replace(/^\/en\//, '/')
      } else if (cleanUrl === '/en') {
        cleanUrl = '/'
      }

      versions[cleanUrl] = String(page.frontmatter.version || '0')
    }

    return versions
  }
})
