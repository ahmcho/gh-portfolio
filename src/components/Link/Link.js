import React from 'react';
import styled from 'styled-components';

const InnerLink = styled.a`
    color: #rgb(35 121 145);
    text-decoration: none;
`;

const Link = ({ url, title}) => (
    <InnerLink
        className="App-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
    >
        {title}
    </InnerLink>

);

export default Link;