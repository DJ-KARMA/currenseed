//dependencies
import React from "react";
import { Link } from "react-router-dom";
//chakra ui
import { Box } from "@chakra-ui/react";

const Logo = (props) => {
  return (
    <Box {...props}>
        <Link to='/'>CurrenSeed<span>🌱</span>
        </Link>
    </Box>
  );
}

export default Logo;