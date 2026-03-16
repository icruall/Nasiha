import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '65dy2j27',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
