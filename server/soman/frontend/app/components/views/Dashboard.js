import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import StatCard from './../StatCard';
import { featConfig } from '../../featConfig'

class Dashboard extends PureComponent {
    render() {
        return <div>
        	<div className="basic-stats">
        		<StatCard sensor="temperature" />
        		<StatCard sensor="humidity" />
        		<StatCard sensor="smoke" />
        	</div>
					<p style={{textAlign: 'center', fontSize: '2em', marginBottom: '1em'}}>
						<strong>{featConfig.title}</strong><br />
						<small>{featConfig.subtitle}</small>
					</p>
					<p style={{textAlign: 'center'}}>
						<img src={require('./../../../img/feats/main.png')} alt="" />
					</p>
        </div>;
    }
}

export default Dashboard;
