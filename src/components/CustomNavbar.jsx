import React from "react";
import MobileNav from "./MobileNav";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarEnd,
  NavbarBurger,
  NavbarLink
} from "bloomer";
import Link from "gatsby-link";

export default class CustomNavbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <Navbar>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <NavbarItem />
          <div style={{ display: "flex" }}>
            <NavbarItem className="is-hidden-mobile">
              <Link to="/about/">About</Link>
            </NavbarItem>
            <NavbarItem className="is-hidden-mobile">
              <Link to="/posts">Posts</Link>
            </NavbarItem>
            <NavbarBurger
              className="is-large"
              isHidden="tablet"
              onClick={this.handleToggle}
            />
          </div>
        </div>
        <MobileNav open={this.state.open} onClose={this.handleToggle}>
          <div className="brand"></div>
          <div className="menu">
          <Link to="/about/">About</Link>
          <Link to="/posts">Posts</Link>
          </div>
          <div className="navbar-footer">
          </div>
        </MobileNav>
      </Navbar>
    );
  }
}
