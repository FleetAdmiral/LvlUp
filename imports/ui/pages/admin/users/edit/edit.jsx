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


export class AdminUsersEditPage extends Component {
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
			<AdminUsersEditPageEditForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const AdminUsersEditPageContainer = createContainer(function(props) {
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

}, AdminUsersEditPage);
export class AdminUsersEditPageEditForm extends Component {
	constructor () {
		super();
		this.state = {
			adminUsersEditPageEditFormErrorMessage: "",
			adminUsersEditPageEditFormInfoMessage: ""
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
		{this.state.adminUsersEditPageEditFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.adminUsersEditPageEditFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ adminUsersEditPageEditFormInfoMessage: "" });
		this.setState({ adminUsersEditPageEditFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var adminUsersEditPageEditFormMode = "update";
			if(!$("#admin-users-edit-page-edit-form").find("#form-cancel-button").length) {
				switch(adminUsersEditPageEditFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ adminUsersEditPageEditFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("admin.users", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ adminUsersEditPageEditFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("updateUserAccount", self.props.data.admin_user._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("admin.users", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	render() {
		return (
	<div id="admin-users-edit-page-edit-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			Edit user
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.adminUsersEditPageEditFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.adminUsersEditPageEditFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-profile-name">
				<label htmlFor="profile.name">
					Name
				</label>
				<div className="input-div">
					<input type="text" name="profile.name" defaultValue={this.props.data.admin_user.profile.name} className="form-control " autoFocus="autoFocus" required="required" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-profile-email">
				<label htmlFor="profile.email">
					E-mail
				</label>
				<div className="input-div">
					<input type="text" name="profile.email" defaultValue={this.props.data.admin_user.profile.email} className="form-control " required="required" data-type="email" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-roles">
				<label htmlFor="roles">
					Role
				</label>
				<div className="input-div">
					<div className="radio">
						<label>
							<input type="radio" defaultValue="user" name="roles" data-type="array" defaultChecked={formUtils.itemIsChecked(this.props.data.admin_user.roles, "user")} />
							User
						</label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" defaultValue="admin" name="roles" data-type="array" defaultChecked={formUtils.itemIsChecked(this.props.data.admin_user.roles, "admin")} />
							Admin
						</label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" defaultValue="blocked" name="roles" data-type="array" defaultChecked={formUtils.itemIsChecked(this.props.data.admin_user.roles, "blocked")} />
							Blocked
						</label>
					</div>
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div">
					<button id="form-submit-button" className="btn btn-success" type="submit">
						<span className="fa fa-check" />
						Save
					</button>
					<a href="#" id="form-cancel-button" className="btn btn-default" onClick={this.onCancel}>
						Cancel
					</a>
				</div>
			</div>
		</form>
	</div>
);
	}
}
