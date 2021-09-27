/*
  src/reducers/simpleReducer.js
*/
import {ActionTypes} from "../actions/ActionTypes";

export default (state = {}, action) => {
  // console.log(state,action.payload)
  if(action.payload === undefined) return state

  const {result_of_simple_action, subreddit, gallery} = action.payload

  const {SIMPLE_ACTION, SUBREDDIT_ACTION, GALLERY_ACTION} = ActionTypes

  switch (action.type) {
    case SIMPLE_ACTION:
      return {...state, result_of_simple_action}

    case SUBREDDIT_ACTION:
      return {...state, subreddit}

    case GALLERY_ACTION:
      return {...state, gallery}


    default:
      return state
  }
}
