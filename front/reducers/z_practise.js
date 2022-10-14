const initalState = {
  name: "zerocho",
  age: 27,
  password: "babo",
};

const changeNicknameBoogicho = {
  type: "CHANGE_NICKNAME",
  data: "boogicho",
}; // changeNickname('boogicho");

//action creator
const changeNickname = (data) => {
  return {
    type: "CHANGE_NCIKNAME",
    data,
  };
};
//store.dispatch(changeNickname('mighty tak'));

//async action creator

const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case "CHANGE_NICKNAME":
      return {
        ...state,
        name: action.data,
      };
  }
};

export default rootReducer;
