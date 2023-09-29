import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="notFound">
            <div className="ct">
                 <h1>404</h1>
                 <div className='bc'>
                <Link to="/" className="button">
                        <svg className="button__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <path className="button__path" d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0 z" />
                        </svg>
                        <span className="button__content">
                            GO BACK HOME
                        </span>
                </Link>
                </div>
            </div>
        </main>
  );
};

export default NotFound;