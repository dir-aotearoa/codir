module.exports = {
  // Global CloudCannon configuration
  _inputs: {
    title: {
      type: 'text',
      comment: 'The title of your page.'
    }
  },
  _select_data: {
    colors: ['Red', 'Green', 'Blue']
  },

  // Base path to your site source files, same as input for Eleventy
  source: 'src',

  // The subpath your built output files are mounted at
  base_url: '/documentation',

  // Populates collections for navigation and metadata in the editor
  collections_config: {
    people: {
      // Base path for files in this collection, relative to source
      path: 'content/people',

      // Whether this collection produces output files or not
      output: true,

      // Collection-level configuration
      name: 'Personnel',
      _enabled_editors: ['data']
    },
    posts: {
      path: '_posts',
      output: true
    },
    pages: {
      name: 'Pages'
    }
  },

  // Generates the data for select and multiselect inputs matching these names
  data_config: {
    // Populates data with authors from an data file with the matching name
    authors: true,
    offices: true
  },

  paths: {
    // The default location for newly uploaded files, relative to source
    uploads: 'assets/uploads',

    // The path to site data files, relative to source
    data: '_data', // defaults to _data

    // The path to site layout files, relative to source
    layouts: '_includes', // defaults to _includes

    // The path to site include files, relative to source
    includes: '_includes' // defaults to _includes
  }
};