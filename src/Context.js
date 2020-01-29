import React, {Component} from 'react';
import {fire, db} from './config/Fire';
import firebase from 'firebase';
import {Form, Button} from 'semantic-ui-react';

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
		bookNowModalOpen: false,
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
		lastSignInDate: '',
		verified: false,
		accountDetailsModalOpen: false,
		verificationModalOpen: false,
		fireStoreUserData: [],
		tourParticipantCount: 1,
		bookedTours: [],
		totalTourCost: 0,
		accountBio: 'No bio',
		editAccountBioActivated: false
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
						this.setState({selectedTourToView: this.state.adventures[0]}, () => {
							let tourCost = parseFloat(
								this.state.selectedTourToView.price.amount
							).toFixed(2);
							this.setState({
								totalTourCost: tourCost
							});
						});
					}
				);
			});
	}

	renderAccount = user => {
		db
			.collection('users')
			.get()
			.then(snapshot => {
				snapshot.docs.find(doc => {
					if (doc.data().id === fire.auth().currentUser.providerData[0].uid) {
						this.setState({fireStoreUserData: doc.data()}, () => {
							this.setState(
								{
									user,
									name: this.state.fireStoreUserData.name,
									photoURL:
										'https://png.pngtree.com/svg/20161027/service_default_avatar_182956.png',
									email: this.state.fireStoreUserData.email,
									dateAccountCreated: user.metadata.creationTime,
									lastSignInDate: user.metadata.lastSignInTime,
									verified: user.emailVerified,
									wishlist: this.state.fireStoreUserData.wishlist,
									bookedTours: this.state.fireStoreUserData.bookedTours,
									accountBio: this.state.fireStoreUserData.bio
								},
								() => console.log(user, this.state)
							);
						});
					}
				});
			});
	};

	authListener() {
		fire.auth().onAuthStateChanged(user => {
			if (user && fire.auth().currentUser.providerData[0].displayName === null) {
				this.renderAccount(user);
			} else if (user) {
				this.setState({
					user,
					name: fire.auth().currentUser.providerData[0].displayName,
					photoURL: fire.auth().currentUser.providerData[0].photoURL,
					email: user.email,
					dateAccountCreated: user.metadata.creationTime,
					lastSignInDate: user.metadata.lastSignInTime,
					verified: user.metadata.emailVerified
				});
			} else {
				this.setState({user: null});
			}
		});
	}

	signUp = e => {
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {})
			.then(() => {
				this.sendEmailVerification();
				db
					.collection('users')
					.doc(`${fire.auth().currentUser.providerData[0].uid}`)
					.set({
						id: fire.auth().currentUser.providerData[0].uid,
						name: this.state.signUpName,
						email: fire.auth().currentUser.providerData[0].email,
						wishlist: [],
						bookedTours: [],
						bio: 'No Bio'
					});

				this.handleVerificationModalOpen();
			})

			.catch(error => {
				console.log(error);
				document.getElementById('sign-up-error-message').innerHTML = error;
			});
	};

	sendEmailVerification = () => {
		var user = firebase.auth().currentUser;

		user
			.sendEmailVerification()
			.then(function() {
				console.log('Verification Email Sent');
			})
			.catch(function(error) {
				console.log(error);
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
			logInModalOpen: false,
			wishlist: []
		});
	};

	addToWishList = tour => {
		let currentWishList = this.state.wishlist;
		currentWishList.push(tour);
		db
			.collection('users')
			.doc(`${fire.auth().currentUser.providerData[0].uid}`)
			.set(
				{
					wishlist: currentWishList
				},
				{merge: true}
			);
		db
			.collection('users')
			.get()
			.then(snapshot => {
				snapshot.docs.find(doc => {
					if (doc.data().id === fire.auth().currentUser.providerData[0].uid) {
						this.setState({fireStoreUserData: doc.data()}, () => {
							this.setState({wishlist: this.state.fireStoreUserData.wishlist});
						});
					}
				});
			});
	};

	removeFromWishList = tour => {
		let currentWishList = this.state.wishlist;
		let foundTour = currentWishList.find(item => item.id === tour.id);
		currentWishList.splice(currentWishList.indexOf(foundTour), 1);

		db
			.collection('users')
			.doc(`${fire.auth().currentUser.providerData[0].uid}`)
			.set(
				{
					wishlist: currentWishList
				},
				{merge: true}
			);
		db
			.collection('users')
			.get()
			.then(snapshot => {
				snapshot.docs.find(doc => {
					if (doc.data().id === fire.auth().currentUser.providerData[0].uid) {
						this.setState({fireStoreUserData: doc.data()}, () => {
							this.setState({wishlist: this.state.fireStoreUserData.wishlist});
						});
					}
				});
			});
	};

	setCostToEachTour = () => {
		let originalSort = this.state.adventures;
		let price = originalSort.map(item => parseFloat(item.price.amount));
		originalSort.map(item => {
			item.cost = price[0];
			price.shift();
		});
		this.setState({adventures: originalSort});
	};

	setTagsToEachTour = () => {
		this.state.adventures.map(item => {
			item.all_tags = item.name.toLowerCase().split(' ');
			item.all_tags = item.all_tags.concat(item.tag_labels);
		});
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
		this.setState({selectedTourToView: item});
	};

	searchbarFilter = () => {
		let searchbarInput = document
			.getElementById('searchbox')
			.value.toLowerCase()
			.split(' ')
			.filter(word => word.length !== 0);

		this.setState({searchbarInput: searchbarInput}, () => {
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

	incrementParticipantCount = () => {
		let newCount = this.state.tourParticipantCount + 1;
		let totalTourCost = parseFloat(
			newCount * this.state.selectedTourToView.price.amount
		).toFixed(2);
		this.setState(
			{tourParticipantCount: newCount, totalTourCost: totalTourCost},
			() => {
				console.log(this.state.selectedTourToView);
			}
		);
	};

	decrementParticipantCount = () => {
		if (this.state.tourParticipantCount > 1) {
			let newCount = this.state.tourParticipantCount - 1;
			let totalTourCost = parseFloat(
				newCount * this.state.selectedTourToView.price.amount
			).toFixed(2);
			this.setState(
				{
					tourParticipantCount: newCount,
					totalTourCost: totalTourCost
				},
				() => console.log(this.state.selectedTourToView)
			);
		}
	};

	bookTour = () => {
		let currentBookedTours = this.state.bookedTours;
		this.state.selectedTourToView.totalBookedCost = this.state.totalTourCost;
		this.state.selectedTourToView.participants = this.state.tourParticipantCount;
		currentBookedTours.push(this.state.selectedTourToView);
		db
			.collection('users')
			.doc(`${fire.auth().currentUser.providerData[0].uid}`)
			.set(
				{
					bookedTours: currentBookedTours
				},
				{merge: true}
			);
		db
			.collection('users')
			.get()
			.then(snapshot => {
				snapshot.docs.find(doc => {
					if (doc.data().id === fire.auth().currentUser.providerData[0].uid) {
						this.setState({fireStoreUserData: doc.data()}, () => {
							this.setState(
								{bookedTours: this.state.fireStoreUserData.bookedTours},
								() => console.log(this.state.fireStoreUserData.bookedTours)
							);
						});
					}
				});
			});
	};

	changeAccountBio = () => {
		console.log('changing account bio');
		let currentSetting = this.state.editAccountBioActivated;
		this.setState({editAccountBioActivated: !currentSetting});
	};

	submitNewBio = () => {
		db
			.collection('users')
			.doc(`${fire.auth().currentUser.providerData[0].uid}`)
			.set(
				{
					bio: this.state.accountBio
				},
				{merge: true}
			);
		db
			.collection('users')
			.get()
			.then(snapshot => {
				snapshot.docs.find(doc => {
					if (doc.data().id === fire.auth().currentUser.providerData[0].uid) {
						this.setState({fireStoreUserData: doc.data()}, () => {
							this.setState({accountBio: this.state.fireStoreUserData.bio}, () =>
								console.log(this.state.fireStoreUserData)
							);
						});
					}
				});
			});
		this.changeAccountBio();
	};

	handleLogInModalOpen = () => this.setState({logInModalOpen: true});
	handleLogInModalClose = () => this.setState({logInModalOpen: false});

	handleSignUpModalOpen = () => this.setState({signUpModalOpen: true});
	handleSignUpModalClose = () => this.setState({signUpModalOpen: false});

	handleBookNowModalOpen = () => this.setState({bookNowModalOpen: true});
	handleBookNowModalClose = () => this.setState({bookNowModalOpen: false});

	handleVerificationModalOpen = () => {
		this.setState({verificationModalOpen: true});
	};
	handleVerificationModalClose = () =>
		this.setState({verificationModalOpen: false});

	handleAccountDetailsModalOpen = () =>
		this.setState({accountDetailsModalOpen: true});
	handleAccountDetailsModalClose = () =>
		this.setState({accountDetailsModalOpen: false});

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value}, () => {
			this.tourPriceFilter();
			console.log();
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
					changeProfilePicture: this.changeProfilePicture,
					handleAccountDetailsModalOpen: this.handleAccountDetailsModalOpen,
					handleAccountDetailsModalClose: this.handleAccountDetailsModalClose,
					handleBookNowModalOpen: this.handleBookNowModalOpen,
					handleBookNowModalClose: this.handleBookNowModalClose,
					handleVerificationModalClose: this.handleVerificationModalClose,
					handleVerificationModalOpen: this.handleVerificationModalOpen,
					incrementParticipantCount: this.incrementParticipantCount,
					decrementParticipantCount: this.decrementParticipantCount,
					bookTour: this.bookTour,
					changeAccountBio: this.changeAccountBio,
					submitNewBio: this.submitNewBio
				}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

const Consumer = Context.Consumer;

export {Provider, Consumer};
