import * as commentApi from "../api/CommentRequests";
export const addComment = (id,data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" });
    try {
      const newComment =await commentApi.addComments(id,data);
      console.log(newComment);
      dispatch({ type: "UPLOAD_SUCCESS", data: newComment.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };