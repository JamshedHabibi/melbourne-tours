import React, {Component} from 'react';
import fire from './config/Fire';

const Context = React.createContext();

class Provider extends Component {
	state = {
		user: {},
		name: '',
		signUpName: '',
		photoURL: '',
		email: '',
		password: '',
		logInModalOpen: false,
		signUpModalOpen: false,
		apiIsLoaded: false,
		apiTours: [],
		adventures: [],
		sortByOption: 1,
		minPrice: 0,
		maxPrice: 200,
		wishlist: [],
		searchbarInput: [],
		selectedTourToView: [],
		filterPanelActivated: false,
		dateAccountCreated: '',
		lastSignInDate: ''
	};

	componentDidMount() {
		this.authListener();
		const baseURL = 'https://www.triposo.com';
		fetch(
			`${baseURL}/api/20190906/tour.json?location_ids=Melbourne&count=50&fields=all&order_by=-score`,
			{
				headers: {
					'X-Triposo-Account': 'AVS4CLAN',
					'X-Triposo-Token': 'y2dj8ynw6f9jci31qyrq47a1xft161ow'
				}
			}
		)
			.then(res => res.json())
			.then(json => {
				this.setState(
					{apiIsLoaded: true, apiTours: json, adventures: json.results},
					() => {
						this.setTagsToEachTour();
						this.setCostToEachTour();
						this.setState({selectedTourToView: this.state.adventures[0]});
					}
				);
			});
	}
	authListener() {
		fire.auth().onAuthStateChanged(user => {
			if (user && fire.auth().currentUser.providerData[0].displayName === null) {
				this.setState({user}, () => {
					//fire.auth().currentUser.providerData[0].displayName = this.state.signUpName; - Cannot assign to read-only property
					this.setState({
						name: this.state.signUpName,
						photoURL:
							'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
						email: fire.auth().currentUser.providerData[0].email,
						dateAccountCreated: fire.auth().currentUser.providerData[0].metadata
							.creationTime,
						lastSignInDate: fire.auth().currentUser.providerData[0].metadata
							.lastSignInTime
					});
				});
			} else if (user) {
				this.setState({user}, () => console.log(fire.auth().currentUser));
				this.setState({
					name: fire.auth().currentUser.providerData[0].displayName,
					photoURL: fire.auth().currentUser.providerData[0].photoURL,
					email: fire.auth().currentUser.providerData[0].email,
					dateAccountCreated: fire.auth().currentUser.metadata.creationTime,
					lastSignInDate: fire.auth().currentUser.metadata.lastSignInTime
				});
			} else {
				this.setState({user: null});
			}
		});
	}

	setCostToEachTour = () => {
		let originalSort = this.state.adventures;
		let price = originalSort.map(item => parseFloat(item.price.amount));
		originalSort.map(item => {
			item.cost = price[0];
			price.shift();
		});
		this.setState({adventures: originalSort}, () =>
			console.log(this.state.adventures, this.state.apiTours)
		);
	};

	setTagsToEachTour = () => {
		this.state.adventures.map(item => {
			item.all_tags = item.name.toLowerCase().split(' ');
			item.all_tags = item.all_tags.concat(item.tag_labels);
		});
	};

	changeProfilePicture = () => {
		let pictureInput = document.getElementById('image-file').value;
		this.setState({photoURL: pictureInput}, () => console.log(pictureInput));
	};

	activateFilterPanel = () => {
		let currentSetting = this.state.filterPanelActivated;
		this.setState({filterPanelActivated: !currentSetting}, () => {
			if (this.state.filterPanelActivated === false) {
				document.getElementById('adventures-filter-side-panels').style.left =
					'-8vw';
			} else {
				document.getElementById('adventures-filter-side-panels').style.left =
					'-150vw';
			}
		});
	};

	viewSelectedTour = item => {
		this.setState({selectedTourToView: item}, () => {
			console.log(this.state.selectedTourToView);
		});
	};

	searchbarFilter = () => {
		let searchbarInput = document
			.getElementById('searchbox')
			.value.toLowerCase()
			.split(' ')
			.filter(word => word.length !== 0);

		this.setState({searchbarInput: searchbarInput}, () => {
			console.log(this.state.searchbarInput);
			let tourListings = this.state.apiTours;
			let filteredTours = [];
			for (let i = 0; i < tourListings.results.length; i++) {
				if (this.state.searchbarInput.length === 0) {
					filteredTours.push(tourListings.results[i]);
				} else {
					for (let j = 0; j < tourListings.results[i].all_tags.length; j++) {
						for (let k = 0; k < this.state.searchbarInput.length; k++) {
							if (
								tourListings.results[i].all_tags[j] === this.state.searchbarInput[k] &&
								filteredTours.indexOf(tourListings.results[i]) === -1
							) {
								filteredTours.push(tourListings.results[i]);
							}
						}
					}
				}
			}
			this.setState({adventures: filteredTours});
		});
	};

	addToWishList = tour => {
		let currentWishList = this.state.wishlist;
		currentWishList.push(tour);

		this.setState({wishlist: currentWishList}, () =>
			console.log(this.state.wishlist)
		);
	};

	removeFromWishList = tour => {
		let currentWishList = this.state.wishlist;
		let foundTour = currentWishList.find(item => item.id === tour.id);
		currentWishList.splice(currentWishList.indexOf(foundTour), 1);
		this.setState({wishlist: currentWishList});
	};

	tourPriceFilter = () => {
		let minPrice = this.state.minPrice;
		let maxPrice = this.state.maxPrice;
		let tourListings = this.state.apiTours;
		let filteredTours = [];
		for (let i = 0; i < tourListings.results.length; i++) {
			if (
				tourListings.results[i].cost > minPrice &&
				tourListings.results[i].cost < maxPrice
			) {
				filteredTours.push(tourListings.results[i]);
			}
		}
		this.setState({adventures: filteredTours});
	};

	sortToursByRecommended = () => {
		let originalSort = this.state.adventures;
		//sort can accept compareFunction - if a - b < 0, sorts a as the lower number. if a - b > 0, sorts b as the lower number.
		originalSort
			.sort((a, b) => {
				const scoreA = a.score;
				const scoreB = b.score;
				return scoreA - scoreB;
			})
			.reverse();
		this.state.apiTours.results = originalSort;
		this.setState({adventures: originalSort});
	};

	sortToursByPriceLowToHigh = () => {
		let originalSort = this.state.adventures;
		originalSort.sort((a, b) => {
			const costA = a.cost;
			const costB = b.cost;
			return costA - costB;
		});
		this.state.apiTours.results = originalSort;
		this.setState({adventures: originalSort});
	};

	sortToursByPriceHighToLow = () => {
		let originalSort = this.state.adventures;
		originalSort
			.sort((a, b) => {
				const costA = a.cost;
				const costB = b.cost;
				return costA - costB;
			})
			.reverse();
		this.state.apiTours.results = originalSort;
		this.setState({adventures: originalSort});
	};

	handleLogInModalOpen = () => this.setState({logInModalOpen: true});
	handleLogInModalClose = () => this.setState({logInModalOpen: false});

	handleSignUpModalOpen = () => this.setState({signUpModalOpen: true});
	handleSignUpModalClose = () => this.setState({signUpModalOpen: false});

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.tourPriceFilter();
		});
	};

	logIn = e => {
		e.preventDefault();
		fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {})
			.catch(error => {
				console.log(error);
				document.getElementById('login-error-message').innerHTML = error;
			});
	};

	logOut = () => {
		fire.auth().signOut();
		this.setState({
			user: null,
			name: 0,
			email: '',
			password: '',
			signUpModalOpen: false,
			logInModalOpen: false
		});
	};

	signUp = e => {
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {})
			.catch(error => {
				console.log(error);
				document.getElementById('sign-up-error-message').innerHTML = error;
			});
	};

	render() {
		return (
			<Context.Provider
				value={{
					...this.state,
					logIn: this.logIn,
					handleChange: this.handleChange,
					logOut: this.logOut,
					signUp: this.signUp,
					handleLogInModalOpen: this.handleLogInModalOpen,
					handleLogInModalClose: this.handleLogInModalClose,
					handleSignUpModalOpen: this.handleSignUpModalOpen,
					handleSignUpModalClose: this.handleSignUpModalClose,
					sortToursByPriceLowToHigh: this.sortToursByPriceLowToHigh,
					sortToursByPriceHighToLow: this.sortToursByPriceHighToLow,
					sortToursByRecommended: this.sortToursByRecommended,
					tourPriceFilter: this.tourPriceFilter,
					addToWishList: this.addToWishList,
					searchbarFilter: this.searchbarFilter,
					viewSelectedTour: this.viewSelectedTour,
					activateFilterPanel: this.activateFilterPanel,
					removeFromWishList: this.removeFromWishList,
					changeProfilePicture: this.changeProfilePicture
				}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

const Consumer = Context.Consumer;

export {Provider, Consumer};
