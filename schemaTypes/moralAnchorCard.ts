import { defineType, defineField } from 'sanity'

export const moralAnchorCard = defineType({
  name: 'moralAnchorCard',
  title: 'Moral Anchor Card',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Moral Anchor Text',
      type: 'text',
      rows: 4,
      description:
        'Clearly states halal/haram where applicable, without fatwa tone or accusation.'
    })
  ]
})
