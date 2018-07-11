const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GrahQLString,
  GraphQLID,
} = graphql;

// const PostType = new GraphQLObjectType({
//   name: 'BlogPost',
//   fields: () => ({
//     id: { type: GraphQLID },
//     title: { type: GrahQLString },
//     post: { type: GraphQLInt },
//     author: { type: GraphQLString },
//   }),
// });

// const PostType = new GraphQLObjectType({
//   name: 'Post',
//   fields: {
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     description: { type: GraphQLString },
//   },
// });
//
//
// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addPost: {
//       type: PostType,
//       args: {
//         title: { type: GrahQLString },
//         post: { type: GraphQLInt },
//         author: { type: GraphQLString },
//       },
//       resolve(parent, args) {
//         const post = {
//           title: args.title,
//           post: args.age,
//           author: args.author,
//         };
//         return post;
//       },
//     },
//     // addBook: {
//     //   type: BookType,
//     //   args: {
//     //     name: { type: GraphQLString },
//     //     genre: { type: GraphQLString },
//     //     authorId: { type: GraphQLID }
//     //   },
//     //   resolve(parent, args) {
//     //     let book = new Book({
//     //       name: args.name,
//     //       genre: args.genre,
//     //       authorId: args.authorId
//     //     });
//     //     return book.save();
//     //   }
//     // }
//   },
// });

const { LocalLoginUser } = require('../models/LocalLogin');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    middleName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: PostType,
      args: { firstName: { type: GraphQLString } },
      resolve(parent, args) {
        const posttest = new LocalLoginUser();
        return posttest.findUsers(args.firstName);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
