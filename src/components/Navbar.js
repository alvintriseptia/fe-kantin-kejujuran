import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../contexts/AuthContext";
import { useBalance } from "../contexts/BalanceContext";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";

export default function Navbar(props) {
	const { pathname } = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);
	const auth = useAuth();
	const balance = useBalance();
	const snackbar = useSnackbar();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const container =
		window !== undefined ? () => window().document.body : undefined;

	const handleLogout = () => {
		auth.logout();
		snackbar.setSnackbar("Logout successful", 1);
	};

	const drawerWidth = 240;

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		balance.getBalance();
	}, [balance]);

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Link to="/">
				<Typography variant="h6" sx={{ my: 2 }}>
					Kantin Kejujuran
				</Typography>
			</Link>
			<Divider />
			<List>
				<ListItem disablePadding>
					<Link to="/store">
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={"Store"} />
						</ListItemButton>
					</Link>
				</ListItem>
				{auth.token && (
					<ListItem disablePadding>
						<Link to="/box">
							<ListItemButton sx={{ textAlign: "center" }}>
								<ListItemText primary={"Canteen's Box"} />
							</ListItemButton>
						</Link>
					</ListItem>
				)}
			</List>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1, borderBottom: "2px solid rgba(0,0,0,0.1)" }}>
			<Container maxWidth="xl">
				<AppBar position="sticky" color="white" elevation={0}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
						>
							<Link to="/">Kantin Kejujuran</Link>
						</Typography>
						<Box sx={{ display: { xs: "none", sm: "block" } }} mr={4}>
							{auth.token && (
								<Link to="/box">
									<Typography
										variant="button"
										sx={{
											color: pathname === "/box" ? "#2D2E36" : "#888",
										}}
										mr={2}
									>
										Canteen's Box
									</Typography>
								</Link>
							)}
							<Link to="/store">
								<Typography
									variant="button"
									sx={{
										color: pathname === "/store" ? "#2D2E36" : "#888",
									}}
								>
									Store
								</Typography>
							</Link>
						</Box>
						{auth.token ? (
							<Box sx={{ marginLeft: "auto" }}>
								<Button
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									sx={{
										background:
											"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
										color: "#fff",
										textTransform: "capitalize",
									}}
								>
									<AccountCircle />
								</Button>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<Stack>
										<MenuItem
											sx={{ justifyContent: "center", fontSize: "1rem" }}
											onClick={handleLogout}
										>
											Logout
										</MenuItem>
									</Stack>
								</Menu>
							</Box>
						) : (
							<Stack
								sx={{ marginLeft: "auto" }}
								direction="row"
								alignItems="center"
								spacing={2}
							>
								<Link to="/login">
									<Button
										sx={{
											background:
												"linear-gradient(101.12deg, #EB1484 27.35%, #C91CC3 99.99%, #C81CC5 100%, #C81CC5 100%)",
											color: "#fff",
											paddingX: "1.5rem",
											textTransform: "capitalize",
										}}
									>
										Login
									</Button>
								</Link>
								<Link to="/register">
									<Button
										sx={{
											border: "2px solid #EB1484",
											color: "#2D2E36",
											paddingX: "1.5rem",
											textTransform: "capitalize",
										}}
									>
										Register
									</Button>
								</Link>
							</Stack>
						)}
					</Toolbar>
				</AppBar>
				<Box component="nav">
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
				</Box>
			</Container>
		</Box>
	);
}
