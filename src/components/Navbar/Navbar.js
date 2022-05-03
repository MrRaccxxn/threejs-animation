import RaccoonLogo from "../../assets/img/raccoon-logo.png";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={RaccoonLogo} alt="Raccoon" />
        </div>

        <nav className="navItems">
          <a id="about">about</a>
          <a>projects</a>
          <a href="https://medium.com/@MrRaccxxn" target="_blank">
            blog
          </a>
          <a id="contact">contact me</a>
        </nav>
      </div>
    </>
  );
}
