import * as UserApi from "../api/UserRequest.js";

export const UpdateUser=(id, formData)=> async(dispatch)=> {
  dispatch({type: "UPDATING_START"})
  try{
      const {data} = await UserApi.UpdateUser(id, formData);
      console.log("Action ko receive hoa hy ye : ",data)
      dispatch({type: "UPDATING_SUCCESS", data: data})
  }   
  catch(error){
      dispatch({type: "UPDATING_FAIL"})
  }
}

/*
export const FollowUser = (id, data)=> async(dispatch)=> {
  dispatch({type: "FOLLOW_USER", data: id})
  UserApi.FollowUser(id, data)
}

export const UnFollowUser = (id, data)=> async(dispatch)=> {
  dispatch({type: "UNFOLLOW_USER", data: id})
  UserApi.UnFollowUser(id, data)
}
*/

export const FollowUser = (id, data) => async (dispatch) => {
  dispatch({type: "FOLLOW_USER", data: id})
  UserApi.FollowUser(id, data)
};



export const UnFollowUser = (id, data) => async (dispatch) => {
  dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.UnFollowUser(id, data)
};
