import React from "react";
function DeleteBtn(props) {
  //needs to be converted to Chakra
  return (
    <span {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;