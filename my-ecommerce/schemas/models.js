export default {
  name: 'models',
  title: 'Models',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category name',
      validation: (Rule) => Rule.required(),
    },
  ],
}
