// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	storageKey: 'sessionsStorage',
	userKey: 'bmconlineUser',
	firebaseConfig : {
		apiKey: "AIzaSyBRfy0F3ozhhq6cI5WaNHtkZqvtCTx-h6s",
		authDomain: "bmconline-5cee2.firebaseapp.com",
		databaseURL: "https://bmconline-5cee2.firebaseio.com",
		projectId: "bmconline-5cee2",
		storageBucket: "bmconline-5cee2.appspot.com",
		messagingSenderId: "920704956145",
		appId: "1:920704956145:web:6877b55e973db3f577db50",
		measurementId: "G-VXHRSCZQM2"
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
