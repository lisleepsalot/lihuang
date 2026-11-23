import {definePlugin} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'
import {ArrangeTool} from './ArrangeTool'

// Adds the "Arrange" tab to the Studio's top bar.
export const arrangeTool = definePlugin({
  name: 'arrange-tool',
  tools: [
    {
      name: 'arrange',
      title: 'Arrange',
      icon: ThLargeIcon,
      component: ArrangeTool,
    },
  ],
})
