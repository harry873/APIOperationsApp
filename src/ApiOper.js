import axios from "axios";

export const getAllPosts = () => {
  //  console.log(`${process.env.REACT_APP_BASEURL}/posts`);
  return axios({
    method: "GET",
    url: `${process.env.REACT_APP_BASEURL}/posts`,
    headers: { "content-type": "application/json" },
  });
};

export const deletePosts = (id) => {
  return axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BASEURL}/posts/${id}`,
    headers: { "content-type": "application/json" },
  });
};

export const upDatePosts = (id, body, title) => {
  return axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BASEURL}/posts/${id}`,
    data: JSON.stringify({
      id: id,
      title: title,
      body: body,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
