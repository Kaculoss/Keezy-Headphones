export default {
  name: 'colour',
  title: 'Colour',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Colour Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hash',
      type: 'string',
      title: 'Hash Colour Code',
      validation: (Rule) => Rule.required(),
    },
  ],
}
