import React, {PropTypes} from 'react';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router';

class LakePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.lakeUrl = 'http://localhost:3005/api/lakes/getlakes';
        this.state = {
            lakes: []
        };
    }
    componentDidMount() {
        this.fetchLakes();
    }
    
    fetchLakes() {
        fetch(this.lakeUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            }
        }).then((result) => {
            return result.json();
        }).then((result) => {
            this.setState({ lakes: result.lakes });
        }).catch(error => {
            throw (error);
        });
    }
    render() {
        let lakes = this.state.lakes.map((lake, index) => {
            console.log(index % 3);
            return (
            <div  key={lake.id}>
            {function(){
                    if (index % 3 == 0) {
                        return <div className="clearfix"></div>
                    }
                }.call(this)}
                <div className="col-md-4">
                    <div className="card">
                        <div className="content">
                            <h4>Lake Name: {lake.lakename}</h4>
                            
                        </div>
                        <div className="action">
                                <Link to={"/lake/" + lake.id} activeClassName="active">View Details </Link>
                        </div>
                    </div>
                </div>
                
            </div>
            );
        });
        return (
            <div>
                <h1> Your Lakes </h1>
                <br />
                <Link to="/newlake" className="btn btn-primary" activeClassName="active">Create a new lake </Link>
                <br />
                <br />
                {lakes}
            </div>
        );
    }
}

LakePage.contextTypes = {
    router: PropTypes.object.isRequired
};


export default (LakePage);