import React from "react";
import { Box, Text} from "@chakra-ui/react";

const Logo = (props) => {
  return (
    <Box {...props}>
      <a fontSize="lg" fontWeight="bold" href="/">
        CurrenSeed<span>🌱</span>
      </a>
    </Box>
  );
}

export default Logo;