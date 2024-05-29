import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { CgProfile } from "react-icons/cg";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="title">
        Study With Buddies
      </Link>
      <ul>
        <CustomLink to="/findbuddy"><b>Find Buddies</b></CustomLink>
        <CustomLink to="/joingroup"><b>Join Group</b></CustomLink>
        <CustomLink to="/creategroup"><b>Create Group</b></CustomLink>
        <CustomLink to="/profile"><CgProfile size={35}/></CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}