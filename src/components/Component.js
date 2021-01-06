import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    &:hover{
        color: navy;
    }
    
    // color: black;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => <StyledLink {...props} />;