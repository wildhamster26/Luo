import React from 'react';
import { Container } from 'reactstrap';

export default function PleaseConfirm(props) {
  return (
    <Container className="please-confirm">
        Great! <br/> 
        Now click the link we've sent to your email address and get back to your item. :) <br/>
        <img className="please-confirm-image" height="200px" src="https://res.cloudinary.com/wildhamster26/image/upload/v1543505122/folder-name/email-image.png" alt="Check your email"/>

    </Container>
  )
}
