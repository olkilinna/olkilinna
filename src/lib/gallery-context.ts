import type { CollectionEntry } from 'astro:content'

let currentGalleries: CollectionEntry<'posts'>['data']['galleries'] | null = null

export function setGalleries(galleries: typeof currentGalleries) {
  currentGalleries = galleries
}

export function getGalleries() {
  return currentGalleries
}
