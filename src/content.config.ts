import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    arrange: z.number().optional(),
    year: z.string().optional(),
    date: z.string().optional(),
    hero: z.string().optional(),
    ingressi: z.string().optional(),
    tags: z.array(z.string()).optional(),
    youtube: z.string().optional(),
    videoFile: z.string().optional(),
    galleries: z
      .array(
        z.object({
          id: z.object({
            name: z.string(),
            slug: z.string(),
          }),
          images: z
            .array(
              z.object({
                image: z.string(),
                alt: z.string().optional(),
                caption: z.string().optional(),
              })
            )
            .optional(),
        })
      )
      .optional(),
  }),
})

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    order: z.number().int().optional(),
  }),
})

const tags = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = {
  posts,
  news,
  tags,
}
