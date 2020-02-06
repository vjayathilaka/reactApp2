import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lat: null, errorMessage: null};
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({lat: position.coords.latitude})
            },
            positionError => {
                this.setState({errorMessage: positionError.message})
            }
        );
    }

    renderContent() {
        if(!this.state.lat && this.state.errorMessage){
            return <div>Error: {this.state.errorMessage}</div>;
        } else if(this.state.lat && !this.state.errorMessage) {
            return <SeasonDisplay lat={this.state.lat}/>;
        } else {
            return <Spinner message="Please accept the location request"/>;
        }
    }
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"));
