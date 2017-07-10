import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

class RouteTest extends React.Component {
	// previousLocation = this.prop.location;
	componentWillUpdate(nextProps) {
		console.log('nextProps:', nextProps);
		console.log('thisProps:', this.props);

		// if(nextProps.history.action !== 'POP' &&(!location.state || !location.state.model)) {
		// 	this.previousLocation = this.props.location;
		// }
	}

	render() {
		// const {location} = this.props;
		// const isModal = !!(location.state && location.state.modal && this.previousLocation !== location);
		return (
			<div className="wrapper">
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/about' component={About}/>
					<Route path='/news' component={News}/>
				</Switch>
			</div> 
		);
	}
}

const news = [
	{ id: 0, title: 'news title 0', color: 'news content 0' },
	{ id: 1, title: 'news title 1', color: 'news content 1' },
	{ id: 2, title: 'news title 2', color: 'news content 2' },
	{ id: 3, title: 'news title 3', color: 'news content 3' },
	{ id: 4, title: 'news title 4', color: 'news content 4' }
];

const Home = () => (
	<div>
		<ul>
			<li><Link to='/'>Home</Link></li>
			<li><Link to='/about'>About</Link></li>
			<li><Link to='/news'>News</Link></li>
		</ul>
	</div>
);

const About = () => (
	<div>
		This is about page
	</div>
);

const News = ({match}) => (
	<div>
		<ul>
		{news.map(i => (
			<li key={i.id}><Link to={{pathname: `/news/${i.id}`}}>{i.title}</Link></li>
		))}
		<Route path={`${match.url}/:id`} component={SingleNews} />
		</ul>
	</div>
);

const SingleNews = ({match}) => {
	console.log('match:', match);
	const getNews = news[parseInt(match.params.id, 10)];
	if(!getNews) {
		return <div>News not found!</div>;
	}

	return (
		<div>
			<h1>{getNews.title}</h1>
			<p>{getNews.content}</p>
		</div>
	);
};

const RouteDemo = () => (
	<Router>
		<Route component={RouteTest} />
	</Router>
);

export default RouteDemo;
