/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import PostSearchBar from './searchbars/PostSearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="d-flex align-items-center">
            <span className="mr-2"> Blabber </span>
            <Image className="navbar-logo" src="https://i.pinimg.com/originals/b6/77/73/b6777347a6a6ac60fb3e1f6f823a124b.png" fluid />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/all-posts">
              <Nav.Link>All Posts</Nav.Link>
            </Link>
            <Link passHref href="/my-posts">
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link>Tag Manager</Nav.Link>
            </Link>
            <Link passHref href="/reactions">
              <Nav.Link>Reaction Manager</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>My Profile</Nav.Link>
            </Link>
            <PostSearchBar className="navSearch" />
            <Button variant="danger" id="sign-out" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
