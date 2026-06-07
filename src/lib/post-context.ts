import type { CollectionEntry } from 'astro:content'

let currentGalleries: CollectionEntry<'posts'>['data']['galleries'] | null = null
let currentVideoFile: string | null = null

export function setPostContext(galleries: typeof currentGalleries, videoFile: string | null) {
  currentGalleries = galleries
  currentVideoFile = videoFile
}

export function getGalleries() {
  return currentGalleries
}

export function getVideoFile() {
  return currentVideoFile
}
