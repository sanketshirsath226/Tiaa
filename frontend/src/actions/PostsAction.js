import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getCategoryPosts = (id,category) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getCategoryPosts(id,category);
    console.log(data);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getAllPost = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getAllPost();
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};