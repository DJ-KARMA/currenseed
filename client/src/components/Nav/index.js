import React from "react";
import { Link, Box, Flex, Text, Button, Stack, Icon, IconButton } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { CloseButton} from "@chakra-ui/react";
import Logo from "./Logo";
import Auth from "../../utils/auth";


const Nav = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  

  const toggle = () => setIsOpen(!isOpen);


  return (
    <NavBarContainer {...props}>
      <Logo
        w="140px"
        color={["white"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};


const CloseIcon = () => (

  <CloseButton color={["white"]}/>
);


const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);




const MenuToggle = ({ toggle, isOpen }) => {


  
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};


const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};


const MenuLinks = ({ isOpen }) => {

    if (Auth.loggedIn()) {
      return (
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end"]}
            direction={["column", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/profile">My Profile</MenuItem>
            <MenuItem to="/">
              <Button
                onClick={() => Auth.logout()}
                size="sm"
                rounded="md"
                color={["brand.500"]}
                bg={["brand.800"]}
                _hover={{
                  bg: ["white"]
                }}
              >
              Logout
              </Button>
            </MenuItem>
            <MenuItem><IconButton icon={<FaShoppingCart/>} size="md" as="a" href="/cart"></IconButton></MenuItem>
            
          </Stack>
        </Box>
      );
    } else {
      return (
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end"]}
            direction={["column", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/login">My Profile</MenuItem>
            <MenuItem to="/signup">
              <Button
                size="sm"
                rounded="md"
                color={["brand.500"]}
                bg={["brand.800"]}
                _hover={{
                  bg: ["white"]
                }}
              >
              Sign Up
              </Button>
            </MenuItem>
          </Stack>
        </Box>
      );
    };
    }

  



const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={[ "brand.800"]}
      color={["brand.500"]}
      {...props}
    >
      {children}
    </Flex>
  );
};



export default Nav




