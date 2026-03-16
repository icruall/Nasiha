// lib/queries.ts
export const emotionsQuery = `
*[_type == "emotion"]{
  _id,
  title,
  description,
  "slug": slug.current
} | order(order asc)
`

export const emotionBySlugQuery = `
*[_type == "emotion" && slug.current == $slug][0]{
  title,
  description,
  showMoralAnchor,
  cards {
    reflection { text },
    moralAnchor { text },
    quran {
      verses[] {
        arabic,
        translation,
        reference
      }
    },
    dua {
      duas[] {
        arabic,
        translation,
        prophet,
        canonicalSource
      }
    },
    hope {
      text,
      nextStep
    }
  }
}
`
