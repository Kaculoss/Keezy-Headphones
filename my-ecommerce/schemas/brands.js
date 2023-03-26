export default {
  name: 'brands',
  title: 'Brands',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Brand name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Brand Image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
  ],
}
