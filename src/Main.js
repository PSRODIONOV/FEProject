import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import { Search } from './Search.js';
import { MyMovies } from './MyMovies.js';

export const Main = () => {
    return (
        <div>
            <Switch>
                <Route path='/search' component={Search} />
                <Route path='/mymovies' component={MyMovies} />
            </Switch>
        </div>
    )
}