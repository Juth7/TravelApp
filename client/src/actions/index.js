import swal from "sweetalert";
const axios = require("axios");
//const userSet = require("../auth/utils/userSet");

export function searchDestination(name) {
  return async function (dispatch) {
    let response = await axios.get(
      "https://travelapp-x6lf.onrender.com/getplains?location=" + name
    );
    return dispatch({
      type: "SEARCH_DESTINATION",
      payload: response.data,
    });
  };
}

export function getPlains() {
  return async function (dispatch) {
    var json = await axios.get("https://travelapp-x6lf.onrender.com/getplains");
    //console.log(json.data)
    return dispatch({
      type: "GET_PLAINS",
      payload: json.data,
    });
  };
}

export function getDetailId(id) {
  return async function (dispatch) {
    let response = await axios.get("https://travelapp-x6lf.onrender.com/getDetails/" + id);
    //console.log('juth', response.data)
    return dispatch({
      type: "GET_DETAIL",
      payload: response.data,
    });
  };
}
export function getDashboardAdmin() {
  return async function (dispatch) {
    let response = await axios.get("https://travelapp-x6lf.onrender.com/getDashboardAdmin", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    if (response.status === 200) {
      return dispatch({
        type: "GET_DASHBOARD_ADMIN",
        payload: response.data,
      });
    } else if (response.status === 401) {
      return dispatch({
        type: "GET_DASHBOARD_ADMIN",
        payload: [{ error: "Unauthorized" }],
      });
    }
  };
}

export function postPlain(data) {
  return async function (dispatch) {
    let response = await axios.post("https://travelapp-x6lf.onrender.com/postPlains", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    //console.log('agus', response.data)
    return dispatch({
      type: "POST_PLAIN",
      payload: response.data,
    });
  };
}

// filtrado por provincia

export function filterByProvince(payload) {
  return {
    type: "FILTER_BY_PROVINCE",
    payload,
  };
}

// Ordenamiento por precio

export function orderByPrice(payload) {
  return {
    type: "ORDER_BY_PRICE",
    payload,
  };
}

// Ordenamiento por Estrellas o Puntuacion

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}

export function clearState(payload) {
  return {
    type: "CLEAR_STATE",
    payload,
  };
}
export function getPlainsDestacados() {
  return async function (dispatch) {
  try {
      var json = await axios.get("https://travelapp-x6lf.onrender.com/getplains");
      //console.log(json.data)
      return dispatch({
        type: "GET_PLAINS_DESTACADOS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}



export function setCurrentUser(users) {
  return {
    type: "SET_CURRENT_USER",
    user: users,
  };
}
export function googleLogIn(payload) {
  return async (dispatch) => {
  try {
      const res = await axios.post(
        "https://travelapp-x6lf.onrender.com/auth/google",
        payload
      );
      const token = res.data.token;
      const role = res.data.role;
      const id = res.data.id;
      const username = res.data.username;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", username);
      window.localStorage.setItem("id", id);
      window.localStorage.setItem("test", JSON.stringify(res.data));
      console.log("statusgoogle", res.status);
      return dispatch(
        {
          type: "GOOGLE_LOGIN",
          payload: res.data,
        }(
          // users(token);
          // dispatch(
          //   users({
          //     token: token,
          //     email: jwt.decode(token).email,
          //     name: jwt.decode(token).name,
          //     role: role,
          //     id: id,
          //   }),
          (window.location.href = "/")
        )
      );
      // return {
      //   email: jwt.decode(token).email,
      //   name: jwt.decode(token).name,
      //   role: role,
      //   id: id,
      // };
    } catch (error) {
      console.log(error);
    };
  }
}

export function signin(data) {
  try {
    return async function (dispatch) {
      let response = await axios.post(
        "https://travelapp-x6lf.onrender.com/auth/signin",
        data
      );
      // window.localStorage.setItem("test", JSON.stringify(response.data));
      console.log("status", response.status);
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("user", response.data.username);
        window.localStorage.setItem("id", response.data.id);
        const { data } = await axios.post(
          "https://travelapp-x6lf.onrender.com/wishlist/create",
          { userId: response.data.id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        return dispatch(
          {
            type: "SIGNIN",
            payload: response.data,
          }((window.location.href = "/"))
        );
      } else {
        return swal({
          title: "¡Usuario o contraseña incorrectos!",
          icon: "error",
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
}

export function signup(data) {
  try {
    return async function (dispatch) {
      let response = await axios.post(
        "https://travelapp-x6lf.onrender.com/auth/signup",
        data
      );
      //console.log('juthUP', response.data)
      if (response.status === 200) {
        return dispatch({
          type: "SIGNUP",
          payload: response.data,
        })((window.location.href = "/login"));
      } else {
        return swal({
          title: "¡Credenciales en uso!",
          icon: "error",
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
}

export const Logout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const addItem = (item) => ({
  type: "ADD_ITEM",
  payload: item,
});

export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  payload: item,
});

export const addItemFromCart = (item) => ({
  type: "ADD_ITEM_IN_CART",
  payload: item,
});

export const removeAllItemsFromCart = (item) => ({
  type: "REMOVE_ALL_ITEMS_IN_CART",
  payload: item,
});

export function updatePlain(id, plains) {
  return async function (dispatch) {
    try {
      const { data } = await axios.patch(
        "https://travelapp-x6lf.onrender.com/updateplain/" + id,
        plains,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log("update", data);
      return dispatch({
        type: "UPDATE_PLAIN",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deletePlain(id) {
  return async function (dispatch) {
    try {
      await axios.delete("https://travelapp-x6lf.onrender.com/deleteplain/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      console.log("delete", id);
      return dispatch({
        type: "DELETE_PLAIN",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProvince() {
  return async function (dispatch) {
    try {
      var json = await axios.get("https://travelapp-x6lf.onrender.com/apiLugares/provincias");
      //console.log(json.data)
      return dispatch({
        type: "GET_PROVINCE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getCity(id) {
  return async function (dispatch) {
    var json = await axios.get(
      "https://travelapp-x6lf.onrender.com/apiLugares/ciudades/" + id
    );
    //console.log(json.data)
    return dispatch({
      type: "GET_CITY",
      payload: json.data,
    });
  };
}

export function getIsAdmin() {
  return async function (dispatch) {
    try {
      const response = await axios.get("https://travelapp-x6lf.onrender.com/checkAdmin/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      console.log("actionadmin", response.status);
      if (response.status === 200) {
        return dispatch({
          type: "GET_IS_ADMIN",
          payload: true,
        });
      } else {
        return dispatch({
          type: "GET_IS_ADMIN",
          payload: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// export const addItemToWish = (item) => ({
//   type: "ADD_ITEM_TO_WISH",
//   payload: item,
// });
export function addItemToWish(id) {
  console.log(id);
  return async function (dispatch) {
    let response = await axios.put(
      "https://travelapp-x6lf.onrender.com/wishlist/additem",
      {
        userId: localStorage.getItem("id"),
        plainId: id,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    if (response) {
      return dispatch({
        type: "ADD_ITEM_TO_WISH",
      });
    }
  };
}

export const removeAllItemsFromWish = (item) => ({
  type: "REMOVE_ALL_ITEMS_IN_WISH",
  payload: item,
});

export function checkout(dataCheckout) {
  try {
    return async function (dispatch) {
      const data = {
        userId: localStorage.getItem("id"),
        plains: dataCheckout.plains,
        email: dataCheckout.email,
        amount: dataCheckout.amount,
        token: dataCheckout.token,
      };
      let response = await axios.post(
        "https://travelapp-x6lf.onrender.com/checkout",
        data, // todo: implementar mapeo de servicios
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (response) {
        return dispatch({
          type: "CHECKOUT",
          payload: response.data,
        })((window.location.href = "/"));
      } else {
        console.log("Cosas");
      }
    };
  } catch (error) {
    console.log(error);
  }
}

export function addReview(id, data) {
  return async function (dispatch) {
    let response = await axios.patch(
      "https://travelapp-x6lf.onrender.com/postreview/" + id,
      data,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    return dispatch({
      type: "ADD_REVIEW",
      payload: response.data,
    })((window.location.href = "/destination/" + id));
  };
}

export function getUsers() {
  return async function (dispach) {
    try {
      const res = await axios.get("https://travelapp-x6lf.onrender.com/getusers");
      //	console.log(res);
      return dispach({
        type: "GET_ALL_USERS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrders() {
  return async (dispatch) => {
    try {
      const res = await axios.get("https://travelapp-x6lf.onrender.com/orders/allorders");
      return dispatch({
        type: "GET_ALL_ORDERS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function rolAdmin(id, email) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(
        "https://travelapp-x6lf.onrender.com/updateuser/addadmin/" + id,
        email,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log("El usuario ahora es admin", data);
      return dispatch({
        type: "UPDATE_USER",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function bloquearUser(id, email) {
  return async function (dispatch) {
    let response = await axios.put(
      "https://travelapp-x6lf.onrender.com/updateuser/addban/" + id,
      email,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    return dispatch({
      type: "ADD_BAN",
      payload: response.data,
    });
  };
}

export function desbloquearUser(id, email) {
  return async function (dispatch) {
    let response = await axios.put(
      "https://travelapp-x6lf.onrender.com/updateuser/removeban/" + id,
      email,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    return dispatch({
      type: "REMOVE_BAN",
      payload: response.data,
    });
  };
}
export function deleteUser(id) {
  return async function (dispatch) {
    try {
      await axios.delete("https://travelapp-x6lf.onrender.com/updateuser/delete/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      console.log("Usuario eliminado", id);
      return dispatch({
        type: "DELETE_USER",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getWishUser(id) {
  return async function (dispatch) {
    console.log(localStorage.getItem("id"));
    console.log(localStorage.getItem("token"));
    let response = await axios.get(
      "https://travelapp-x6lf.onrender.com/wishlist/" + id,
      // {
      //   userId: localStorage.getItem("id"),
      // },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    console.log(response.data);
    if (response) {
      return dispatch({
        type: "GET_USER_WL",
        payload: response.data,
      });
    }
  };
}
export function removeItemWL(id) {
  return async function (dispatch) {
    let response = await axios.put(
      "https://travelapp-x6lf.onrender.com/wishlist/deletewl",
      {
        userId: localStorage.getItem("id"),
        plainId: id,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    if (response) {
      return dispatch({
        type: "DELETE_ITEM_WL",
        payload: response.data,
      });
    }
  };
}
export function createWishlist(userId) {
  try {
    return async function (dispatch) {
      // const userId = localStorage.getItem("id");
      const { data } = await axios.post(
        "https://travelapp-x6lf.onrender.com/wishlist/create",
        userId,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log("Wishlist creada", data);
      return dispatch({
        type: "CREATE_WISHLIST",
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}
