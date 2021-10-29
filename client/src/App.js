import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import Title from './components/layout/Title'
import AddPerson from './components/forms/AddPerson'
import People from './components/lists/People'
import Cars from './components/lists/Cars';
import AddCar from './components/forms/AddCar';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div className='App'>
        <Route exact path="/" component={Title} />
        <Route exact path="/" component={AddPerson} />
        <Route exact path="/" component={AddCar} />
        <Route exact path="/" component={People} />
        <Route path="/carsList" component={Cars}　/>
        </div>
    </BrowserRouter>
  </ApolloProvider>
)
export default App
