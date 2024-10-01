// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,

	// API BASEURL.
	// BACKEND_BASEURL: "http://127.0.0.1:8000/api/",
	// BACKEND_BASEURL: "http://localhost:3002/api/",
	// // Image Url
	// IMG_BASEURL: "http://localhost:3002/",
	BACKEND_BASEURL: "https://insta-clone-v8hc.onrender.com/api/",
	// Image Url
	IMG_BASEURL: "https://insta-clone-v8hc.onrender.com/",

	// FRONTEND BASEURL.
	FRONTEND_BASEURL: "http://localhost:4200/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.