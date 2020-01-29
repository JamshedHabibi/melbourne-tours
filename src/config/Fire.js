import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBPTmsmPT84-P4AipJaa_N9wcmGJj3jqD0',
	authDomain: 'melbourne-tours.firebaseapp.com',
	databaseURL: 'https://melbourne-tours.firebaseio.com',
	projectId: 'melbourne-tours',
	storageBucket: 'melbourne-tours.appspot.com',
	messagingSenderId: '173422600342',
	appId: '1:173422600342:web:c3c9f86e5d79be65f2e2b7',
	measurementId: 'G-V6NH2Q8396'
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
firebase.analytics();

export {fire, db};
