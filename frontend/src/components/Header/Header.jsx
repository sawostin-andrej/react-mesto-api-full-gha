import logo from "../../images/logo.svg";
export default function Header() {
  return (
    <header className="header">
      <a className="header__link" href={logo} target="_self">
        <div className="header__logo" />
      </a>
    </header>
  );
}