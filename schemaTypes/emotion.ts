import { defineType, defineField } from 'sanity'

export const emotion = defineType({
  name: 'emotion',
  title: 'Emotion',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Emotion Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text'
    }),
    defineField({
      name: 'showMoralAnchor',
      title: 'Show Moral Anchor?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'object',
      fields: [
        defineField({ name: 'reflection', type: 'reflectionCard' }),
        defineField({
          name: 'moralAnchor',
          type: 'moralAnchorCard',
          hidden: ({ parent }) => !parent?.showMoralAnchor
        }),
        defineField({ name: 'quran', type: 'quranCard' }),
        defineField({ name: 'dua', type: 'duaCard' }),
        defineField({ name: 'hope', type: 'hopeCard' })
      ]
    })
  ]
})
