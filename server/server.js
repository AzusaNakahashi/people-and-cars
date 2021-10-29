import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'

//import { typeDefs, resolvers } from './src/schema'
import { resolvers, typeDefs } from './src/peopleCarsScheme'

const startApolioServer = async (typeDefs, resolvers, peopleTypeDefs, peopleResolvers) => {

    const app = express() 
    const httpServer = http.createServer(app)

    //connect express sever with apollo server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    })

    await server.start()

    server.applyMiddleware({app})

    await new Promise(resolve => httpServer.listen({port:4000}, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)

}

startApolioServer(typeDefs, resolvers )