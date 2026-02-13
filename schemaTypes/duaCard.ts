import { defineType, defineField } from 'sanity'

export const duaCard = defineType({
  name: 'duaCard',
  title: 'Duʿā’ Card',
  type: 'object',
  fields: [
    defineField({
      name: 'arabic',
      title: 'Arabic Duʿā’',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'translation',
      title: 'Translation',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'prophet',
      title: 'Prophet',
      type: 'string'
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string'
    })
  ]
})