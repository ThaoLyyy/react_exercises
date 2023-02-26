import { connect, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout, LOGOUT_ACTION } from "../../store/actions/AuthActions";
import { isAuthenticated } from "../../store/selectors/AuthSelectors";
import "./Header.css";

function Header(props) {
  const dispatch = useDispatch();

  function onLogout(e) {
    e.preventDefault();
    // dispatch(LOGOUT_ACTION())
    dispatch(logout(props.history));
  }
  return (
    <div>
      <section className="head">
        <div className="container">
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <Link to="/posts" className="nav-link">
              Posts
            </Link>

            {!props.isAuthenticated && (
              <>
                <Link to="/signup" className="nav-link">
                  SignUp
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}

            {props.isAuthenticated && (
              <button className="px-2" onClick={onLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(Header));
