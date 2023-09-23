
import { Link } from 'react-router-dom';
import logo from "../../images/logo.svg";

export default function Header({ loggedIn, email, onLogout, isActiveHeader, setIsActiveHeader }) {

 
  
  const handleAuthClick = () => {
    setIsActiveHeader(!isActiveHeader);
  };

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="логотип"
      />
      <div 
        className="header__info">
        {loggedIn && <div className="header__email">{email}</div>} 
        {loggedIn ? (<Link className="header__auth header__auth_exit" to="/sign-in" onClick={onLogout}>Выйти</Link>
        ) : (
          <>
            {!isActiveHeader ? (
              <Link className="header__auth" to="/sign-up" onClick={handleAuthClick}>Регистрация</Link>        
            ) : (
              <Link className="header__auth" to="/sign-in" onClick={handleAuthClick}>Войти</Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}