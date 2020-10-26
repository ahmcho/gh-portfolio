import React, { Component } from 'react';
import styled from 'styled-components'
import Link from '../components/Link/Link';
import List from '../components/List/List';

const ProfileWrapper = styled.div`
    width: 50%;
    margin: 10px auto;
`;

const Avatar = styled.img`
    width: 150px;
`;

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            repos: [],
            loading: true,
            error: ''
        }
    }

    async componentDidMount() {
        try {
            const profile = await fetch('https://api.github.com/users/ahmcho');
            const profileJSON = await profile.json();
            if(profileJSON){
                const repositories = await fetch(profileJSON.repos_url);
                const repositoriesJSON = await repositories.json();
                this.setState({
                    data: profileJSON,
                    repos: repositoriesJSON,
                    loading: false,
                })
            }
        } catch (error) {
            this.setState({
                loading: false,
                error: error.message,
            });
        }
    }
    
    render(){
        const { data, loading, repos, error } = this.state;

        if(loading || error){
            return <div>{ loading ? 'Loading...' : error }</div>;
        }

        const projects = repos.filter( repo => !repo.fork).map( repo => ({
            label: repo.name,
            value: <Link url={repo.html_url} title="Github URL" />
        }))

        const items = [
            { label: 'Name', value: data.name },
            { label: 'Profile', value: <Link url={data.html_url} title="Visit" />},
            { label: 'My Repos', value: data.repos_url },
            { label: 'Company', value: data.company },
            { label: 'Location', value: data.location },
            { label: 'Bio', value: data.bio }
        ];

        return (
            <ProfileWrapper>
                <Avatar src={data.avatar_url} alt="avatar" />
                <List title="Profile" items={items} />
                <List title="Projects" items={projects} />
            </ProfileWrapper>
        )
    }
}

export default Profile;