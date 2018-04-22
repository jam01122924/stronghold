import { applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from "redux-thunk";

const errorHandler = (store)=>(next)=>(action)=>{
  try{
    next(action);
  } catch(e) {
    console.log(e);
  }
};
const middleware = applyMiddleware(logger, thunk, errorHandler);

export default middleware;
