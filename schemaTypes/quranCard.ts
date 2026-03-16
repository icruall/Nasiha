import { defineType, defineField } from 'sanity'

export const quranCard = defineType({
  name: 'quranCard',
  title: 'Qur’anic Grounding Card',
  type: 'object',
  fields: [
    defineField({
      name: 'arabic',
      title: 'Arabic Verse',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
      description: 'Arabic text of the Qur’anic verse (mandatory).'
    }),
    defineField({
      name: 'translation',
      title: 'Translation',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description: 'Accurate translation of the verse.'
    }),
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Example: Qur’an 2:286'
    })
  ]
})
