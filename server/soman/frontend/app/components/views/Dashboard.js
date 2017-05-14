import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import StatCard from './../StatCard';

class Dashboard extends PureComponent {
    render() {
        return <div>
        	<div className="basic-stats">
        		<StatCard sensor="temperature" value={15} />
        		<StatCard sensor="humidity" value={75} />
        		<StatCard sensor="airPollution" value={50} />
        	</div>
        </div>;
    }
}

export default Dashboard;