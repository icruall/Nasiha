import { defineType, defineField } from 'sanity'

export const hopeCard = defineType({
  name: 'hopeCard',
  title: 'Hope & Return Card',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Hope Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description:
        'Reopens hope, reminds of Allah’s mercy, and prevents despair.'
    }),
    defineField({
      name: 'nextStep',
      title: 'Gentle Next Step',
      type: 'string',
      description:
        'Optional gentle action (e.g. dhikr, dua, reflection), never a command.'
    })
  ]
})
