import React, { Component } from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {Users} from "meteor-user-roles";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class AdminUsersDetailsPage extends Component {
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
	<div>
		<div className="page-container container" id="content">
			<div className="row" id="title_row">
				<div className="col-md-12">
					<div id="page_menu" className="pull-right">
					</div>
				</div>
			</div>
			<AdminUsersDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const AdminUsersDetailsPageContainer = createContainer(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("admin_user", props.routeParams.userId)
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

				admin_user: Users.findOne({_id:props.routeParams.userId}, {})
			};
		

		
	}
	return { data: data };

}, AdminUsersDetailsPage);
export class AdminUsersDetailsPageDetailsForm extends Component {
	constructor () {
		super();
		this.state = {
			adminUsersDetailsPageDetailsFormErrorMessage: "",
			adminUsersDetailsPageDetailsFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
	}

	renderErrorMessage() {
		return(
	<div className="alert alert-warning">
		{this.state.adminUsersDetailsPageDetailsFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.adminUsersDetailsPageDetailsFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ adminUsersDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ adminUsersDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var adminUsersDetailsPageDetailsFormMode = "read_only";
			if(!$("#admin-users-details-page-details-form").find("#form-cancel-button").length) {
				switch(adminUsersDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ adminUsersDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ adminUsersDetailsPageDetailsFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("admin.users", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("admin.users", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	render() {
		return (
	<div id="admin-users-details-page-details-form" className="">
		<h2 id="component-title">
			<a href="#" id="form-back-button" className="btn btn-default" title="back" onClick={this.onBack}>
				<span className="fa fa-chevron-left">
				</span>
			</a>
			<span id="component-title-icon" className="">
			</span>
			User details
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.adminUsersDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.adminUsersDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-profile-name">
				<label htmlFor="profile.name">
					Name
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-profile-name">
						{this.props.data.admin_user.profile.name}
					</p>
				</div>
			</div>
			<div className="form-group  field-profile-email">
				<label htmlFor="profile.email">
					E-mail
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-profile-email">
						{this.props.data.admin_user.profile.email}
					</p>
				</div>
			</div>
			<div className="form-group  field-roles">
				<label htmlFor="roles">
					Role
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-roles">
						{this.props.data.admin_user.roles}
					</p>
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div">
					<a href="#" id="form-close-button" className="btn btn-primary" onClick={this.onClose}>
						OK
					</a>
				</div>
			</div>
		</form>
	</div>
);
	}
}
