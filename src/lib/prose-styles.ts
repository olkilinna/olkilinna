export const proseHeadings =
  'prose-headings:uppercase prose-h2:font-heading md:prose-h2:text-3xl prose-h2:text-2xl prose-h3:font-bold prose-h3:text-lg md:prose-h3:text-xl prose-h4:font-bold prose-h4:text-md md:prose-h4:text-lg'

export const proseParagraph = 'prose-p:text-black prose-p:leading-normal'

export const proseLinks =
  'prose-a:font-bold prose-a:text-black prose-a:underline prose-a:underline-offset-4 prose-a:hover:text-link-hover prose-a:duration-200'

export const proseLists =
  'prose-li:text-black prose-li:marker:text-black prose-li:ml-5 prose-li:my-1'

export const proseBlockquote =
  'prose-blockquote:border-yellow-500 prose-blockquote:border-l-3 prose-blockquote:w-[80%] prose-blockquote:py-1 prose-blockquote:text-lg prose-blockquote:font-normal prose-blockquote:md:ml-10 prose-blockquote:ml-6 prose-blockquote:my-10 prose-blockquote:leading-normal'

// Helper to combine them all into a single string for convenience
export const proseClasses = `prose ${proseHeadings} ${proseParagraph} ${proseLinks} ${proseLists} ${proseBlockquote}`
