import * as UploadApi from "../api/UploadRequest";


export const UploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action started");

    // Log FormData contents
    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    await UploadApi.UploadImage(data);
  } catch (error) {
    console.log("Upload error:", error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};


export const UploadPost = (data) => async (dispatch) => {
  dispatch({ type: 'UPLOAD_START' });
  try {
    const newPost = await UploadApi.UploadPost(data);
    dispatch({ type: 'UPLOAD_SUCCESS', data: newPost });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'UPLOAD_FAIL' });
  }
};





