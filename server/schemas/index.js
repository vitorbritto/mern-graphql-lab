const Project = require('../models/Project');
const Client = require('../models/Client');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// Types
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      }
    }
  })
});

// Queries
const Query = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { 
          type: new GraphQLNonNull(GraphQLString), 
        },
        email: { 
          type: new GraphQLNonNull(GraphQLString), 
        },
        phone: { 
          type: new GraphQLNonNull(GraphQLString), 
        },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      }
    },
    removeClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const foundProjects = Project.find({ clientId: args.id });

        foundProjects.then(
          projects => {
            projects.forEach(project => {
              project.deleteOne();
            });
          }
        );

        return Client.findByIdAndRemove(args.id);
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { 
          type: new GraphQLNonNull(GraphQLString), 
        },
        description: { 
          type: new GraphQLNonNull(GraphQLString), 
        },
        status: { 
          type: new GraphQLEnumType({
            name: 'ProjectStatusCreate',
            values: {
              NOT_STARTED: { value: 'Not Started', },
              IN_PROGRESS: { value: 'In Progress', },
              COMPLETED: { value: 'Completed', },
            }
          }), 
          defaultValue: 'Not Started',
        },
        clientId: {
          type: new GraphQLNonNull(GraphQLID),
        }
      },
      resolve (parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { 
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              NOT_STARTED: { value: 'Not Started', },
              IN_PROGRESS: { value: 'In Progress', },
              COMPLETED: { value: 'Completed', },
            }
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            }
          },
          { 
            new: true,
          },
        );
      },
    },
    removeProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    }
  },
});


module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})