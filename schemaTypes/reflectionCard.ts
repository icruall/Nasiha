import { defineType, defineField } from 'sanity'

export const reflectionCard = defineType({
  name: 'reflectionCard',
  title: 'Reflection Card',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Reflection Text',
      type: 'text',
      rows: 4,
      validation: Rule =>
        Rule.required().max(600)
    })
  ]
})
