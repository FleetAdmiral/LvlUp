import React, { Component } from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {Users} from "meteor-user-roles";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as httpUtils from "/imports/modules/client/http_utils";
import {ConfirmationDialog} from "/imports/ui/components/confirmation_dialog/confirmation_dialog.jsx";


export class AdminUsersPage extends Component {
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
			<AdminUsersPageView data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const AdminUsersPageContainer = createContainer(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("admin_users")
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

				admin_users: Users.find({}, {}).fetch()
			};
		

		
	}
	return { data: data };

}, AdminUsersPage);
export class AdminUsersPageView extends Component {
	constructor () {
		super();
		this.state = {
			AdminUsersPageViewSearchString: "",
			AdminUsersPageViewSortBy: "",
			AdminUsersPageViewStyle: "table"
		};

		this.isNotEmpty = this.isNotEmpty.bind(this);
		this.isNotFound = this.isNotFound.bind(this);
		this.onInsert = this.onInsert.bind(this);
		this.onSearchInputChange = this.onSearchInputChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onSort = this.onSort.bind(this);
		this.exportData = this.exportData.bind(this);
		this.onExportCSV = this.onExportCSV.bind(this);
		this.onExportTSV = this.onExportTSV.bind(this);
		this.onExportJSON = this.onExportJSON.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.renderList = this.renderList.bind(this);
		this.renderBlog = this.renderBlog.bind(this);
		this.renderCards = this.renderCards.bind(this);
		this.renderData = this.renderData.bind(this);
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

	isNotEmpty() {
		return this.props.data.admin_users && this.props.data.admin_users.length > 0;
	}

	isNotFound() {
		return this.props.data.admin_users && this.props.data.admin_users.length == 0 && this.state.AdminUsersPageViewSearchString;
	}

	onInsert(e) {
		FlowRouter.go("admin.users.insert", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onSearchInputChange(e) {
		this.setState({AdminUsersPageViewSearchString: e.target.value});
	}

	onSearch(e) {
		e.preventDefault();
		let form = $(e.currentTarget).parent();
		let searchInput = form.find("#dataview-search-input");
		searchInput.focus();
		let searchString = searchInput.val();
		this.setState({ AdminUsersPageViewSearchString: searchString });
	}

	onSort(e) {
		e.preventDefault();
		let sortBy = $(e.currentTarget).attr("data-sort");
		this.setState({ AdminUsersPageViewSortBy: sortBy });
	}

	exportData(data, fileType) {
		let exportFields = [];

		let str = objectUtils.exportArrayOfObjects(data, exportFields, fileType);

		let filename = "export." + fileType;

		httpUtils.downloadLocalResource(str, filename, "application/octet-stream");
	}

	onExportCSV(e) {
		this.exportData(this.props.data.admin_users, "csv");
	}

	onExportTSV(e) {
		this.exportData(this.props.data.admin_users, "tsv");
	}

	onExportJSON(e) {
		this.exportData(this.props.data.admin_users, "json");
	}

	renderTable() {
		var self = this;
		return (
	<div id="dataview-data-table">
		<table id="dataview-table" className="table table-striped table-hover">
			<thead id="dataview-table-header">
				<tr id="dataview-table-header-row">
					<th className="th-sortable" data-sort="profile.name" onClick={this.onSort}>
						Name
					</th>
					<th className="th-sortable" data-sort="profile.email" onClick={this.onSort}>
						E-mail
					</th>
					<th className="th-sortable" data-sort="roles" onClick={this.onSort}>
						Role
					</th>
					<th>
						&nbsp;
					</th>
				</tr>
			</thead>
			<tbody id="dataview-table-items">
				{this.props.data.admin_users.map(function(item) {
			return(
				<AdminUsersPageViewTableItems key={item._id} data={item} routeParams={self.props.routeParams} onDelete={self.onDelete} />
				);
		})}
			</tbody>
		</table>
	</div>
);
	}

	renderList() {
		var self = this;
		return (
	<div id="dataview-data-list">
	</div>
);
	}

	renderBlog() {
		var self = this;
		return (
	<div id="dataview-data-blog">
	</div>
);
	}

	renderCards() {
		var self = this;
		return (
	<div id="dataview-data-cards">
	</div>
);
	}

	renderData() {
		let viewStyle = this.state.AdminUsersPageViewStyle || "table";
		switch(viewStyle) {
			case "table": return this.renderTable(); break;
			case "blog": return this.renderBlog(); break;
			case "list" : return this.renderList(); break;
			case "cards": return this.renderCards(); break;
			default: return this.renderTable();
		}
	}

	render() {
		return (
	<div id="admin-users-page-view" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			Users
		</h2>
		<form id="dataview-controls" className="form-inline">
			<div id="dataview-controls-insert" className="form-group ">
				<button type="button" id="dataview-insert-button" className="btn btn-success" onClick={this.onInsert}>
					<span className="fa fa-plus">
					</span>
					Add new
				</button>
			</div>
			<div id="dataview-controls-search">
				{
				<div id="dataview-controls-search-group" className="form-group">
					<label className="sr-only" htmlFor="search">
						Search
					</label>
					<input type="text" className="form-control" id="dataview-search-input" placeholder="Search" name="search" value={this.state.AdminUsersPageViewSearchString} onChange={this.onSearchInputChange} autoFocus="true" />
					<button type="submit" id="dataview-search-button" className="btn btn-primary" onClick={this.onSearch}>
						<span className="fa fa-search">
						</span>
					</button>
				</div>
				}
			</div>
		</form>
		{this.isNotEmpty() ? this.renderData() : (this.isNotFound() ?
		<div className="alert alert-warning">
			{"\"" + this.state.AdminUsersPageViewSearchString + "\" not found."}
		</div>
		:
		<div className="alert alert-info">
			No users yet
		</div>
		)}
	</div>
);
	}
}
export class AdminUsersPageViewTableItems extends Component {
	constructor() {
		super();
		this.onToggle = this.onToggle.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onToggle(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;
		let toggleField = $(e.currentTarget).attr("data-field");

		let data = {};
		data[toggleField] = !this.props.data[toggleField];

		Meteor.call("", itemId, data, function(err, res) {
			if(err) {
				alert(err);
			}
		});
	}

	onEdit(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;
		FlowRouter.go("admin.users.edit", objectUtils.mergeObjects(FlowRouter.current().params, {userId: this.props.data._id}));
	}

	onDelete(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;
		ConfirmationDialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			onYes: function(id) {
				Meteor.call("", id, function(err, res) {
					if(err) {
						alert(err);
					}
				});
			},
			onNo: null,
			onCancel: null,
			buttonYesTitle: "Yes",
			buttonNoTitle: "No",
			buttonCancelTitle: null,
			showCancelButton: false,
			payload: itemId
		});
	}

	onSelect(e) {
		e.stopPropagation();
		let self = this;
		let itemId = this.props.data._id;

		/*ON_ITEM_CLICKED_CODE*/
		FlowRouter.go("admin.users.details", objectUtils.mergeObjects(FlowRouter.current().params, {userId: this.props.data._id}));
	}

	render() {
		return(
	<tr id="dataview-table-items-row">
		<td onClick={this.onSelect}>
			{this.props.data.profile.name}
		</td>
		<td onClick={this.onSelect}>
			{this.props.data.profile.email}
		</td>
		<td onClick={this.onSelect}>
			{this.props.data.roles}
		</td>
		<td className="td-icon">
			<span id="edit-button" className="fa fa-pencil {{editButtonClass}}" title="Edit" onClick={this.onEdit}>
			</span>
		</td>
	</tr>
);
	}
}
