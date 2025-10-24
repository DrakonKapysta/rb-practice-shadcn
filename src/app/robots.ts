import { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/', '/admin', '/api', '/graphql'],
    },
  }
}

export default robots
