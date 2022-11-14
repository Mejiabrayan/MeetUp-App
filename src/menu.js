import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { GoLocation } from 'react-icons/go';

export default function menu() {
    return (
        <Navbar variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="#home">
                <GoLocation style={{ color: 'red' }} />{' '}
                  MeetUp App
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
