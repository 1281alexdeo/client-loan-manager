import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {
  reactReduxFirebase,
  firebaseReducer,
  reduxReactFirebase
} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

//Reducers
import notifyReducer from './Components/reducers/NotifyReducer';
import settingsReducer from './Components/reducers/SettingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyAlUSabuIwsv2fPkh9BdwJ6IhiKtycyVuk',
  authDomain: 'client-loan-manager.firebaseapp.com',
  databaseURL: 'https://client-loan-manager.firebaseio.com',
  projectId: 'client-loan-manager',
  storageBucket: 'client-loan-manager.appspot.com',
  messagingSenderId: '449220903015'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

//init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

//Check if local storage is null then set default settings into local storage
if (localStorage.getItem('settings') == null) {
  //construct default settings object
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };
  //store default settings in local storage as JSON string (local storage only accepts JSON strings)
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// initial state => (get settings from localstroage and set it as initalState of the  App )
const initialState = {
  //parse settings from local storage to JS Object and set settings part of Application state to settings in localstorage
  settings: JSON.parse(localStorage.getItem('settings'))
};

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reduxReactFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
