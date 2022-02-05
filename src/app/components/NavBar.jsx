import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Route, Switch } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@mui/styles";
import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { purple } from "@mui/material/colors";
import { logout } from "../../store/actions/userActions";

const drawerWidth = 200;

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles({
  navBrand: {
    flexGrow: "1",
  },
});

let employee = [
  {
    title: "list employee",
    path: "/list-employee",
  },
  {
    title: "Add Employee",
    path: "/add-employee",
  },
  {
    title: "Add Training",
    path: "/add-training",
  },
  {
    title: "List Training",
    path: "/list-training",
  },
];
export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const handleAccordionChange = (panel) => {
  //   console.log({ event, isExpanded });
  //   setExpandedPanel(isExpanded ? panel : false);
  // };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  // const [expandedPanel, setExpandedPanel] = useState(false);

  // const handleAccordionChange = (panel) => (event, isExpanded) => {
  //   console.log({ event, isExpanded });
  //   setExpandedPanel(isExpanded ? panel : false);
  // };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", mb: 3, height: "2vh" }}>
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: "#FE6B8B", color: "white" }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            {userInfo && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              className="classes.navBrand"
              variant="h6"
              component="div"
              className={classes.navBrand}
            >
              CALS HR
            </Typography>

            {!userInfo && (
              <Typography variant="h6" sx={{ textDecoration: "none" }}>
                <Link to="/login">Login</Link>
              </Typography>
            )}

            {userInfo && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="./robel.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleLogout}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {/* Drawer implementation */}

        {userInfo && (
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            {open && <Typography variant="p"> Employee </Typography>}

            <List>
              {employee.map((text, index) => (
                <ListItem
                  button
                  key={text.title}
                  onClick={() => {
                    history.push(text.path);
                  }}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.title} />
                </ListItem>
              ))}
              {/* <Accordion /> */}
            </List>
            <Divider />
            {open && <Typography variant="p">performance</Typography>}

            <List>
              {["performance", "Directory", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
      </Box>
    </ThemeProvider>
  );
}
