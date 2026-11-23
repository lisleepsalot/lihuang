import {defineType, defineField} from 'sanity'

// Defines the "Project" content type — one entry per portfolio piece.
export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  // Lets the studio list (and the rendered site) be sorted by the "index" field below.
  orderings: [
    {
      title: 'Display Order',
      name: 'indexAsc',
      by: [{field: 'index', direction: 'asc'}],
    },
  ],
  fields: [
    // Controls the order projects render in — lower numbers come first.
    defineField({
      name: 'index',
      title: 'Order (lower numbers render first)',
      type: 'number',
    }),

    // Hides the project from the work page grid/list and the prev/next links,
    // without deleting it — its page still works if someone has the direct link.
    defineField({
      name: 'archived',
      title: 'Archive (hide from work page)',
      type: 'boolean',
      initialValue: false,
    }),

    // Used to name the folder/URL for this project.
    defineField({
      name: 'slug',
      title: 'Slug (folder name, no spaces)',
      type: 'slug',
      options: {source: 'webTitle'},
    }),

    // Shown as the page/project title.
    defineField({
      name: 'webTitle',
      title: 'Web Title',
      type: 'string',
    }),

    // Cover thumbnail — replaces the placeholder. Accepts an image OR a video file;
    // your render script checks the uploaded file's type to decide how to display it.
    defineField({
      name: 'coverImage',
      title: 'Cover Media — image or video',
      type: 'file',
      options: {accept: 'image/*,video/*'},
    }),

    // If set, links straight out. If empty, a page gets built from this project's content.
    defineField({
      name: 'url',
      title: 'External URL (leave blank to auto-render a page)',
      type: 'url',
    }),

    // Full-viewport cover shown at the top of the project page, before the info (year,
    // description, client, credit). Optional — leave blank and the page skips straight to info.
    defineField({
      name: 'heroImage',
      title: 'Hero Image (landing cover, optional) — image or video',
      type: 'file',
      options: {accept: 'image/*,video/*'},
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),

    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'text',
    }),

    // Multiple tags, e.g. "branding", "video".
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // The page body — an ordered, repeatable list of layout blocks.
    // Each block picks a layout type, 1-2 desktop media slots, and optional mobile alternates.
    // Your GitHub CSS/JS renders the actual look and swaps in mobile media at small screen sizes.
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contentBlock',
          title: 'Content Block',
          fields: [
            defineField({
              name: 'type',
              title: 'Layout Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Full Bleed', value: 'full-bleed'},
                  {title: 'Wide', value: 'wide'},
                  {title: 'Small', value: 'small'},
                  {title: '2 Full Bleed (side by side)', value: '2-full-bleed'},
                  {title: '2 Wide (side by side)', value: '2-wide'},
                  {title: '2 Small (side by side)', value: '2-small'},
                ],
              },
            }),
            // Media slot 1 (desktop). Accepts an image OR a video file in the same slot —
            // your render script checks the uploaded file's type to decide how to display it.
            defineField({
              name: 'image1',
              title: 'Media 1 (desktop) — image or video',
              type: 'file',
              options: {accept: 'image/*,video/*'},
            }),
            // Optional mobile alt for slot 1 — also accepts image or video.
            defineField({
              name: 'mobileImage1',
              title: 'Media 1 (mobile alt, optional) — image or video',
              type: 'file',
              options: {accept: 'image/*,video/*'},
            }),
            // Media slot 2 (desktop), used only in "2-..." side-by-side layouts.
            defineField({
              name: 'image2',
              title: 'Media 2 (desktop, side-by-side layouts only) — image or video',
              type: 'file',
              options: {accept: 'image/*,video/*'},
            }),
            // Optional mobile alt for slot 2.
            defineField({
              name: 'mobileImage2',
              title: 'Media 2 (mobile alt, optional) — image or video',
              type: 'file',
              options: {accept: 'image/*,video/*'},
            }),
          ],
          preview: {
            select: {title: 'type'},
          },
        },
      ],
    }),
  ],
})