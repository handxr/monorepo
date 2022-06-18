const Note = require("../models/Note");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Note Type
const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});

// Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    notes: {
      type: new GraphQLList(NoteType),
      resolve() {
        return Note.find();
      },
    },
    note: {
      type: NoteType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_parent, args) {
        return Note.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addNote: {
      type: NoteType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, args) {
        const note = new Note({
          title: args.title,
          content: args.content,
        });
        return note.save();
      },
    },
    updateNote: {
      type: NoteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      resolve(_parent, args) {
        return Note.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              content: args.content,
            },
          },
          { new: true }
        );
      },
    },
    deleteNote: {
      type: NoteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_parent, args) {
        return Note.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
