import React from 'react';
import Cookie from 'js-cookie';
import { Redirect, useHistory} from 'react-router-dom';
import AppBarStyled from '../../Components/AppBarStyled'
import ReactMarkdown from 'react-markdown';
import './home.css'
import url from '../../constant';
import {ProfileModel} from '../../Models/profile.model' 
import ProfileCard from '../../Components/profileCard'

interface HomeState extends ProfileModel{
    verified : boolean
    markdown : string
}

class Home extends React.Component<{}, HomeState> {
    constructor(props : any){
        super(props);

        this.state = {
            verified : true,
            markdown : "",
            email : "",
            timeCreate: 0,
            followings : 0,
            followers : 0,
            username : "",
            id : "",
            bio : "",
            placesVisited : 0,
            profilePhotoUrl : "",
            posts : []
        }

        this.getUser = this.getUser.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.getReadme = this.getReadme.bind(this);
    }

    async getUser() {
        const res = await fetch(`${url}/u/${Cookie.get().username}`, {headers : {authToken : Cookie.get().authToken}});
        const data = await res.json();
        console.log(data);
        return data;
    }

    async getReadme(){
        // const readmePath = require("../../Assets/README.md");
        await fetch('https://raw.githubusercontent.com/madrix01/Travelouge/main/README.md?token=AMIIOX3I62GQBR4WFED7JNLAPLMRG')
            .then(response => {
                return response.text();
            })
            .then(text => {
                this.setState({ 
                    markdown : text
                })
            })

        console.log(this.state.markdown);
        
    }

    async componentDidMount() {
        await this.getReadme();
        const luser= await this.getUser();
        if(luser){
            this.setState(luser);
            this.setState({verified : true})
        }else{
            this.setState({verified : false});
        }
    }

    async onLogout() {
        Cookie.remove("authToken");
        Cookie.set('verified', '0', {path : '/'})
        console.log("Cookie reset");
        this.setState({verified : false});
    }

    redirectTo() {
        console.log(this.state.verified);
        
        if(this.state.verified === false){
            return <Redirect to='/login'/>
        }
    }

    render() {
        const lgout = () => {   
        }
        return(
            <div className="homeMain">
                <AppBarStyled/>
                <div className="feedMain">
                    <div className="feedLeft">
                        Hello Left
                    </div>
                    <div className="feedMid">
                        <div className="feedMidMain">
                            <h1>Hello, {Cookie.get().username}</h1>
                            <button onClick={this.onLogout}>Logout</button>
                            <h1>⚠️ Feed under construction⚠️</h1>
                            <div className="homeMd">
                                <ReactMarkdown source={this.state.markdown} />
                            </div>
                            {this.redirectTo()}
                        </div>
                    </div>
                    <div className="feedRight">
                        <ProfileCard
                            imgSrc={this.state.profilePhotoUrl}
                            username={this.state.username}
                            followers={this.state.followers}
                            followings={this.state.followings}
                            bio={this.state.bio}
                        />
                    </div>
                </div>
            </div>
        )   
    }
}

export default Home;