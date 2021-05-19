import React from "react";
import { Button } from "@chakra-ui/react";


function DeleteBtn(props) {
  //needs to be converted to Chakra
  return (
    <Button {...props} role="button" tabIndex="0">
      ✗
    </Button>
  );
}

export default DeleteBtn;