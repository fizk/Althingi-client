import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { LayoutContextProvier } from './context/LayoutContext';
import { BrowserRouter } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

ReactDOM.render(
    <BrowserRouter>
    <ApolloProvider client={client}>
        <LayoutContextProvier>
            <App />
        </LayoutContextProvier>
    </ApolloProvider>
    </BrowserRouter>,
    document.querySelector('[data-react]')
)
