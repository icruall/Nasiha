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
      name: 'canonicalSource',
      title: 'Canonical Source (Required)',
      type: 'string',
      validation: Rule =>
        Rule.required().custom(value => {
          if (!value) return 'Canonical source is required'

          const allowed = [
            'bukhari',
            'muslim',
            'abu dawud',
            'tirmidhi',
            'nasai',
            'ibn majah',
            'qur’an',
            'quran'
          ]

          const lower = value.toLowerCase()
          const isValid = allowed.some(src => lower.includes(src))

          return isValid
            ? true
            : 'Source must reference a canonical collection (e.g. Sahih al-Bukhari, Sahih Muslim, Qur’an)'
        })
    }),

    defineField({
      name: 'referenceLink',
      title: 'Reference Link (Optional)',
      type: 'url',
      description:
        'Optional external link (e.g. Sunnah.com). This is secondary.'
    })
  ]
})
