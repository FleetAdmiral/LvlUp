import React, { Component } from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";


export class SellersHubPage extends Component {
	constructor () {
		super();
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="page-container container">
		<div className="row">
			<div className="col-md-12" id="content">
				<div className="row" id="title_row">
					<div className="col-md-12">
						<div id="page_menu" className="pull-right">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-md-12" id="menu">
				<SellersHubPageTabs data={this.props.data} routeParams={this.props.routeParams} />
			</div>
		</div>
		<div className="row">
			<div className="col-md-12" id="subcontent">
				{this.props.subcontent}
			</div>
		</div>
	</div>
);
		}
	}
}

export const SellersHubPageContainer = createContainer(function(props) {
		var isReady = function() {
		

		var subs = [
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	var data = { dataLoading: true };

	if(isReady()) {
		

		data = {

			};
		

		
	}
	return { data: data };

}, SellersHubPage);
export class SellersHubPageTabs extends Component {
	constructor () {
		super();
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/
	}

	render() {
		return (
	<ul id="menu-items" className="">
		<li id="menu-item-simple" className="">
			<a href="#">
				<span className="item-title">
					Manage Goods
				</span>
			</a>
		</li>
		<li id="menu-item-dropdown" className="dropdown ">
			<a href="#" className="dropdown-toggle" data-toggle="dropdown">
				<span className="item-title">
					Active Services
				</span>
				<b className="caret">
				</b>
			</a>
			<ul id="menu-items" className="dropdown-menu">
				<li className="">
					<a href="#">
						<span className="item-title">
							Chatbot
						</span>
					</a>
				</li>
				<li className="">
					<a href="#">
						<span className="item-title">
							Landing Page
						</span>
					</a>
				</li>
			</ul>
		</li>
	</ul>
);
	}
}
