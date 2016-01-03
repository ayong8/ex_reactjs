var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');
var Navigation = ReactRouter.Navigation;

// NAME PROPERTY
var NameProperty = React.createClass({
	getInitialState: function () {
		console.log(this.props.url);
		return {data: []};
	},
	/*
	loadPropertiesFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	*/
	handleCommentSubmit: function(entity) {
		console.log(entity);
		console.log(this.state.data.push(entity));
		this.state.data.push(entity);
		this.setState({data: this.state.data});
		/*
		console.log("coming in");
    $.ajax({    	
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: entity,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
		*/
	},
	componentDidMount: function () {
		this.setState({
			data: require('../data.json')
		});
		//this.loadPropertiesFromServer();
		//setInterval(this.loadPropertiesFromServer, );
	},
	render: function () {
		var entities = [];
		this.state.data.map(function(entity){
			entities.push(<Entity entity={entity} />);
		}.bind(this));
		return(
			<div className="p1" >
				<AddEntity onCommentSubmit={this.handleCommentSubmit} />
				{entities}
			</div>
		);
	}
});

var AddEntity = React.createClass({
	getInitialState: function() {
		return {name: ''};
	},
	handleSubmit: function(e) {
		// submit form에 대한 기본동작을 막기 위함
		e.preventDefault();
		// Approach an DOM named "dom" to do something ; this.refs.dom
		var entityName = { name: this.refs.addEntity.value }

		// Send input to the upper component... to handle submit using ajax
		this.props.onCommentSubmit(entityName);
		this.refs.entityForm.reset();

		return;
	},
	render: function () {
		return(
			<form className="sm-col-6 clearfix" ref="entityForm"onSubmit={this.handleSubmit}>
				<label className="control-label block" for="name">
					<h3>Name</h3>
				</label>
				<input type="text" id="name" ref="addEntity" className="sm-col-8 field rounded-left x-group-item"></input>
				<button type="submit" className="btn white bg-blue">Add</button>
			</form>
		);
	}
});

var Entity = React.createClass({
	render: function () {
		console.log(this.props.entity);
		var entity = this.props.entity;
		return(
			<form>
				<span>{entity.name}</span>
				<input type="button" className="btn_link h5">edit</input>
				<input type="button" className="btn_link h5">delete</input>
				<div className="EntityPropertyWrapper border">
					<EntityPropertyTable entity={entity}/>
				</div>
			</form>
		);
	}
});


var EntityPropertyTable = React.createClass({
	render: function () {
		var rows = [];
		var entity = this.props.entity;
			// Key = property name
		for(var key in entity.property) {
			rows.push(
				<tr className="border-none p0">
					<EntityProperty propertyData={entity.property} propertyName={key}/>
				</tr>
			);
		}
		return(
			<table className="border-none p0">
				{rows}
			</table>
		);
	}
});

var EntityProperty = React.createClass({
	render: function () {
		var propertyData = this.props.propertyData;
		var propertyName = this.props.propertyName;
		return(
			<th className="right-align col-3 p0 px1">{propertyData[propertyName]}</th>, 
			<td className="p0 px1">{propertyData[propertyName]}</td>
		);
	}
});

var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
});

var routes = (
  <Router>
    <Route path="/" component={NameProperty} />
    <Route path="/name" component={NameProperty} />
    <Route path="*" component={NotFound} />
  </Router>
)


ReactDOM.render(routes, document.getElementById('LeftContainer'));

