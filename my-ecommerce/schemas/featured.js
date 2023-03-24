export default {
  name: 'featured',
  title: 'Featured Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured Category name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      validation: (Rule) => Rule.required(),
    },
  ],
}
