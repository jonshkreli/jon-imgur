/*
  src/actions/simpleAction.js
*/
import {ActionTypes} from "./ActionTypes";

export const simpleAction = ({result_of_simple_action}) => dispatch => {
  dispatch({
    type: ActionTypes.SIMPLE_ACTION,
    payload: {result_of_simple_action}
  })
}

export const subredditAction = ({subreddit}) => dispatch => {
  // console.log(SubredditList)
  dispatch({
    type: ActionTypes.SUBREDDIT_ACTION,
    payload: {subreddit}
  })
}

export const galleryAction = ({gallery}) => dispatch => { //set gallery array in redux state
  // console.log(SubredditList)
  dispatch({
    type: ActionTypes.GALLERY_ACTION,
    payload: {gallery}
  })
}




