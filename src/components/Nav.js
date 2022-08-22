import { Link } from "react-router-dom";

const Nav = () => {
	return (
	<nav>
		<div className="nav-content container">
			<h1 className="logo">ConstructionSim</h1>
			<ul>
				{/* <Link to="/">Home</Link> */}
				{/* <Link to="/statistics">Statistics</Link> */}
			</ul>
		</div>
	</nav>
	);
}
 
export default Nav;