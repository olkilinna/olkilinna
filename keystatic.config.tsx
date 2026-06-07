// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core'
import { block, wrapper } from '@keystatic/core/content-components'

const markdocComponents = {
  gallery: block({
    label: 'Gallery',
    schema: {
      id: fields.text({ label: 'Gallery ID' }),
    },
  }),
  video: block({
    label: 'Video',
    schema: {
      file: fields.file({
        label: 'Video file',
        directory: 'public/videos',
        publicPath: '/videos/',
      }),
    },
  }),
  youtube: block({
    label: 'YouTube',
    schema: {
      url: fields.url({ label: 'YouTube URL' }),
    },
  }),
  infoCard: block({
    label: 'Info Card',
    ContentView({ value }) {
      return value.heading ? `📝 ${value.heading}` : '📝 Info Card';
    },
    schema: {
      heading: fields.text({ label: 'Heading (h3)' }),
      content: fields.text({ label: 'Content (supports markdown: **bold**, *italic*, [link](url), - lists)', multiline: true }),
    },
  }),
  materialCard: block({
    label: 'Material Card',
    ContentView({ value }) {
      return value.heading ? `📝 ${value.heading}` : '📝 Material Card';
    },
    schema: {
      heading: fields.text({ label: 'Heading (h3)' }),
      content: fields.text({ label: 'Content (supports markdown: **bold**, *italic*, [link](url), - lists)', multiline: true }),
      image: fields.image({
        label: 'Image',
        directory: 'public/images/pages',
        publicPath: '/images/pages/',
      }),
      relatedPosts: fields.multiRelationship({
        label: 'Related Posts',
        collection: 'posts',
      }),
    },
  }),
  accordion: block({
    label: 'Accordion Item',
    ContentView({ value }) {
      return value.title ? `📝 ${value.title}` : '📝 Accordion Item';
    },
    schema: {
      title: fields.text({ label: 'Accordion Title (h3)' }),
      content: fields.text({ label: 'Accordion Content (supports markdown: **bold**, *italic*, [link](url), - lists)', multiline: true }),
    },
  }),
  sourceCard: block({
    label: 'Source Card',
    ContentView({ value }) {
      return value.heading ? `📝 ${value.heading}` : '📝 Source Card';
    },
    schema: {
      linkType: fields.text({ label: 'Link Type (e.g., artikkeli, kirja, blogi)' }),
      heading: fields.text({ label: 'Heading (h3)' }),
      content: fields.text({ label: 'Description (supports markdown: **bold**, *italic*, [link](url), - lists)', multiline: true }),
      image: fields.image({
        label: 'Image',
        directory: 'public/images/pages',
        publicPath: '/images/pages/',
      }),
      link: fields.url({ label: 'External Link' }),
      bgColor: fields.text({
        label: 'Background Color',
        description: 'Tailwind class (e.g., bg-white) or hex code (e.g., #1a1a1a)',
        defaultValue: 'bg-black',
      }),
    },
  }),
  cardList: wrapper({
    label: 'Card List Wrapper',
    schema: {
      columns: fields.select({
        label: 'Desktop Columns',
        description: 'Choose how many columns to display on larger screens.',
        options: [
          { label: '2 Columns', value: '2' },
          { label: '3 Columns', value: '3' },
        ],
        defaultValue: '3',
      }),
    },
    ContentView({ value, children }) {
      const cols = value.columns === '2' ? 'md:grid-cols-2' : 'md:grid-cols-3';
      return <ul class={`grid grid-cols-1 ${cols} gap-6 list-none p-0 m-0`}>{children}</ul>;
    },
  }),
  prosNConsCard: block({
    label: 'Pros & Cons Card',
    ContentView({ value }) {
      return value.heading ? `📝 ${value.heading}` : '📝 Pros & Cons Card';
    },
    schema: {
      heading: fields.text({ label: 'Heading (h3)' }),
      content: fields.text({ label: 'Content (supports markdown: **bold**, *italic*, [link](url), - lists)', multiline: true }),
      color: fields.text({ 
        label: 'Color Code', 
        description: 'Tailwind class (e.g., bg-green-50, border-red-500) or hex code',
        defaultValue: '',
      }),
    },
  }),
}

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      columns: ['title', 'videoFile'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        arrange: fields.number({
          label: 'Arrange order',
          description: 'Navigation menu sorting, older posts have smaller numbers.',
        }),
        year: fields.text({
          label: 'Year',
          description: 'Navigation menu sorting, write eg. 2024',
        }),
        date: fields.text({
          label: 'Date',
          description: 'Text on post hero, eg. 2023 Tammi-Joulukuu',
        }),
        hero: fields.image({
          label: 'Hero image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        ingressi: fields.text({ label: 'Ingress', multiline: true }),
        tags: fields.multiRelationship({
          label: 'Tags',
          collection: 'tags',
          description: 'Select one or more tags for this post.',
        }),
        content: fields.markdoc({ label: 'Content', components: markdocComponents }),
        galleries: fields.array(
          fields.object({
            id: fields.slug({
              name: { label: 'Gallery ID' },
              slug: { label: 'Gallery ID (slug)' },
            }),
            images: fields.array(
              fields.object({
                image: fields.image({
                  label: 'Image',
                  directory: 'public/images/blog',
                  publicPath: '/images/blog/',
                }),
                alt: fields.text({ label: 'Alt text' }),
                caption: fields.text({ label: 'Caption', multiline: true }),
              }),
              {
                label: 'Images',
                itemLabel: (props) => {
                  const imageValue = props.fields.image.value
                  if (
                    imageValue &&
                    typeof imageValue === 'object' &&
                    'filename' in imageValue &&
                    typeof imageValue.filename === 'string'
                  ) {
                    return imageValue.filename
                  }
                  return 'Image'
                },
              }
            ),
          }),
          {
            label: 'Galleries',
            itemLabel: (props) => {
              const idValue = props.fields.id.value
              if (idValue && typeof idValue === 'object') {
                if ('name' in idValue && typeof idValue.name === 'string' && idValue.name) {
                  return idValue.name
                }
                if ('slug' in idValue && typeof idValue.slug === 'string' && idValue.slug) {
                  return idValue.slug
                }
              }
              return 'Gallery'
            },
          }
        ),
        youtube: fields.url({
          label: 'YouTube URL',
          description: 'The YouTube video URL',
        }),
        videoFile: fields.file({
          label: 'Video file',
          description: 'Select a video file. Large files may take a moment to process — the interface may appear briefly unresponsive.',
          directory: 'public/videos',
          publicPath: '/videos/',
        }),
      },
    }),
    news: collection({
      label: 'Ajankohtaista',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.text({ label: 'Date' }),
        content: fields.markdoc({ label: 'Content', components: markdocComponents }),
      },
    }),
    tags: collection({
      label: 'Kategoriat',
      slugField: 'title',
      path: 'src/content/tags/*',
      format: { data: 'yaml' },
      columns: ['title'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
      },
    }),
  },
  singletons: {
    talommeResepti: singleton({
      label: 'Talomme resepti',
      path: 'src/content/pages/talomme-resepti',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Page Title (h1)', defaultValue: 'Talomme resepti' }),
        content: fields.markdoc({
          label: 'Page Content',
          description: 'Use H2 for section titles. Insert "Info Card" or "Material Card" components where needed.',
          components: markdocComponents,
        }),
      },
    }),
    olkielementit: singleton({
      label: 'Olkielementit',
      path: 'src/content/pages/olkielementit',
      format: { contentField: 'content' },
      schema: {
        titlePart1: fields.text({ label: 'Title Part 1', defaultValue: 'Kysymyksiä ja vastauksia' }),
        titleSpan: fields.text({ label: 'Title Highlight (span)', description: 'Leave blank if the span is purely for CSS styling/decoration' }),
        titlePart2: fields.text({ label: 'Title Part 2', defaultValue: ' olkielementeistä' }),
        content: fields.markdoc({
          label: 'Page Content',
          description: 'Write rich content. Insert "Info Card" or "Accordion Item" components as needed.',
          components: markdocComponents,
        }),
      },
    }),
    tietolahteita: singleton({
      label: 'Tietolähteitä',
      path: 'src/content/pages/tietolahteita',
      format: { contentField: 'content' },
      schema: {
        titlePart1: fields.text({ label: 'Title Part 1', defaultValue: 'Alkuun auttavia' }),
        titleSpan: fields.text({ label: 'Title Highlight (span)' }),
        titlePart2: fields.text({ label: 'Title Part 2', defaultValue: ' tietolähteitä' }),
        content: fields.markdoc({
          label: 'Page Content',
          description: 'Use H2 for section titles. Insert "Source Card" components for the lists.',
          components: markdocComponents,
        }),
      },
    }),
  },
})
