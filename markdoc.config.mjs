import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    gallery: {
      render: component('./src/components/markdoc/Gallery.astro'),
      attributes: {
        id: { type: String },
      },
    },
    cardList: {
      render: component('./src/components/CardList.astro'),
      attributes: {
        columns: { type: String },
      },
    },
    infoCard: {
      render: component('./src/components/InfoCard.astro'),
      attributes: {
        heading: { type: String },
        content: { type: String },
      },
    },
    materialCard: {
      render: component('./src/components/MaterialCard.astro'),
      attributes: {
        heading: { type: String },
        image: { type: String },
        relatedPosts: { type: Array },
        content: { type: String },
      },
    },
    video: {
      render: component('./src/components/markdoc/Video.astro'),
      attributes: {
        file: { type: String },
      },
    },
    accordion: {
      render: component('./src/components/Accordion.astro'),
      attributes: {
        title: { type: String },
        content: { type: String },
      },
    },
    prosNConsCard: {
      render: component('./src/components/ProsNConsCard.astro'),
      attributes: {
        heading: { type: String },
        content: { type: String },
        color: { type: String },
      },
    },
    sourceCard: {
      render: component('./src/components/SourceCard.astro'),
      attributes: {
        linkType: { type: String },
        heading: { type: String },
        link: { type: String },
        bgColor: { type: String },
        image: { type: String },
        content: { type: String },
      },
    },
  },
});
