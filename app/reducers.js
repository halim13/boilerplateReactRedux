import {combineReducers} from 'redux';

import {DATA_AVAILABLE} from './actions';

let dataState = {data: []};

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      return {...state, data: action.data};
    default:
      return state;
  }
};

// combine all the reducers
const rootReducer = combineReducers({
  dataReducer,
});

export default rootReducer;
