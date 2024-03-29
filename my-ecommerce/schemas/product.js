export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 90},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brands'}],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'categories'}],
    },
    {
      name: 'colours',
      type: 'array',
      title: 'Colours',
      of: [{type: 'reference', to: [{type: 'colour'}]}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from (1-5 Stars)',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please enter a Value between 1 and 5'),
    },
    {
      name: 'reviews',
      title: 'Number of Customer Reviews',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],
}
