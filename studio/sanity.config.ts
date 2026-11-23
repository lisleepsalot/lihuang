import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {arrangeTool} from './tools/arrange'

export default defineConfig({
  name: 'default',
  title: 'lihuang_website',

  projectId: '91e2aldw',
  dataset: 'production',

  plugins: [structureTool(), arrangeTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
