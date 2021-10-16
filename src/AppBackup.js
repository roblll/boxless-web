// import React, { Component } from "react";

// import Player from "./components/Player";
// import Tabs from "./components/Tabs";
// import Options from "./components/Options";
// import Pick from "./components/Pick";
// import Search from "./components/Search";
// import Playlist from "./components/Playlist";
// import MinControls from "./components/MinControls";
// import FullControls from "./components/FullControls";
// import Login from "./components/Login";
// import { getFormattedDate, getDefaultDates } from "./utils/utils";

// const {
//   dayMin,
//   monthMin,
//   yearMin,
//   dayMax,
//   monthMax,
//   yearMax,
// } = getDefaultDates();

// export default class App extends Component {
//   state = {
//     loggedIn: false,
//     activeTab: "options",
//     options: {
//       lyrics: false,
//       clean: false,
//       karaoke: false,
//       norepeats: true,
//       alternative: true,
//       country: true,
//       dance: true,
//       electronic: true,
//       hiphop: true,
//       house: true,
//       latin: true,
//       pop: true,
//       rap: true,
//       randb: true,
//       rock: true,
//       trance: true,
//       dayMin,
//       dayMax,
//       monthMin,
//       monthMax,
//       yearMin,
//       yearMax,
//       rankMin: 1,
//       rankMax: 100,
//     },
//     currentVid: {
//       vidId: null,
//       vidLength: null,
//       title: null,
//       artist: null,
//     },
//     playlist: [],
//     playlistPosition: 0,
//     pickVid1: null,
//     pickVid2: null,
//     searchResults: {},
//     cachedVid: null,
//     cachedPickVid1: null,
//     cachedPickVid2: null,
//     hiphopAfter: "",
//     hiphopCount: "",
//     houseAfter: "",
//     houseCount: "",
//     tranceAfter: "",
//     tranceCount: "",
//     songLength: 100,
//     timers: null,
//     player: null,
//     playing: false,
//   };

//   componentDidMount() {
//     if (localStorage.getItem("token")) {
//       this.setState({ loggedIn: true }, () => {
//         const {
//           currentVid: { vidId },
//         } = this.state;
//         if (vidId === null) {
//           this.getVid();
//         }
//       });
//     }
//   }

//   handleTabClick = (e, { name }) => {
//     if (this.state.activeTab === name) {
//       this.setState({ activeTab: "none" });
//     } else {
//       this.setState({ activeTab: name });
//     }
//   };

//   handleOptionClick = (e) => {
//     const option = e.target.name;
//     this.setState({
//       options: {
//         ...this.state.options,
//         [option]: !this.state.options[option],
//       },
//     });
//   };

//   handleDropDownChange = (dropDownType, value) => {
//     this.setState({
//       options: { ...this.state.options, [dropDownType]: value },
//     });
//   };

//   getVid = async () => {
//     const {
//       options: {
//         rankMin,
//         rankMax,
//         alternative,
//         country,
//         dance,
//         electronic,
//         hiphop,
//         house,
//         latin,
//         pop,
//         rap,
//         randb,
//         rock,
//         trance,
//       },
//       hiphopAfter,
//       hiphopCount,
//       houseAfter,
//       houseCount,
//       tranceAfter,
//       tranceCount,
//       playlist,
//     } = this.state;
//     const { dateMin, dateMax } = getFormattedDate(this.state);
//     try {
//       const token = localStorage.getItem("token");
//       const api_url =
//         process.env.NODE_ENV === "production"
//           ? "https://boxless.herokuapp.com"
//           : "http://localhost:3001";
//       const response = await fetch(
//         `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
//         {
//           method: "GET",
//           headers: { "content-type": "application/json", Authorization: token },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         if (data.vidId) {
//           const { vidId, vidLength, title, artist } = data;
//           this.addToPlaylist({ vidId, vidLength, title, artist });
//           this.getVidToCache();
//           if (data.nextPage) {
//             console.log(data.nextPage);
//           }
//         } else {
//           // console.log("getVid() - no data");
//           // // this.getVid();
//           console.log("getVid() - no data");
//           setTimeout(() => {
//             this.getVid();
//           }, 4000);
//         }
//       } else {
//         localStorage.clear();
//         this.setState({ loggedIn: false });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   getVidToCache = async () => {
//     const {
//       options: {
//         rankMin,
//         rankMax,
//         alternative,
//         country,
//         dance,
//         electronic,
//         hiphop,
//         house,
//         latin,
//         pop,
//         rap,
//         randb,
//         rock,
//         trance,
//         norepeats,
//       },
//       hiphopAfter,
//       hiphopCount,
//       houseAfter,
//       houseCount,
//       tranceAfter,
//       tranceCount,
//       playlist,
//     } = this.state;
//     const { dateMin, dateMax } = getFormattedDate(this.state);
//     try {
//       const token = localStorage.getItem("token");
//       const api_url =
//         process.env.NODE_ENV === "production"
//           ? "https://boxless.herokuapp.com"
//           : "http://localhost:3001";
//       const response = await fetch(
//         `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
//         {
//           method: "GET",
//           headers: { "content-type": "application/json", Authorization: token },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         if (data.vidId) {
//           const { vidId, vidLength, title, artist } = data;

//           let repeat = false;
//           playlist.forEach((vid) => {
//             if (vidId === vid.vidId) {
//               repeat = true;
//             }
//           });
//           if (norepeats && repeat) {
//             console.log("repeat");
//             setTimeout(() => {
//               this.getVidToCache();
//             }, 4000);
//           } else {
//             const newState = { cachedVid: { vidId, vidLength, title, artist } };
//             if (data.genre === "hiphop") {
//               if (
//                 hiphopAfter === data.hiphopAfter &&
//                 hiphopCount === data.hiphopCount
//               ) {
//                 newState.hiphopAfter = "";
//                 newState.hiphopCount = "";
//               } else {
//                 newState.hiphopAfter = data.hiphopAfter;
//                 newState.hiphopCount = data.hiphopCount;
//               }
//             }
//             if (data.genre === "house") {
//               if (
//                 houseAfter === data.houseAfter &&
//                 houseCount === data.houseCount
//               ) {
//                 newState.houseAfter = "";
//                 newState.houseCount = "";
//               } else {
//                 newState.houseAfter = data.houseAfter;
//                 newState.houseCount = data.houseCount;
//               }
//             }
//             if (data.genre === "trance") {
//               if (
//                 tranceAfter === data.tranceAfter &&
//                 tranceCount === data.tranceCount
//               ) {
//                 newState.tranceAfter = "";
//                 newState.tranceCount = "";
//               } else {
//                 newState.tranceAfter = data.tranceAfter;
//                 newState.tranceCount = data.tranceCount;
//               }
//             }
//             this.setState({ ...newState });
//           }
//         } else {
//           // console.log("no data");
//           // this.getVidToCache();
//           console.log("getVidToCache() - no data");
//           setTimeout(() => {
//             this.getVidToCache();
//           }, 4000);
//         }
//       } else {
//         localStorage.clear();
//         this.setState({ loggedIn: false });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   addToPlaylist = (vid) => {
//     const { playlist } = this.state;
//     if (playlist.length === 0) {
//       this.setState({ playlist: [...playlist, vid] }, () => this.play());
//     } else {
//       this.setState({ playlist: [...playlist, vid] });
//     }
//   };

//   play = () => {
//     const { playlist, playlistPosition } = this.state;
//     this.setState({ currentVid: { ...playlist[playlistPosition] } }, () => {
//       if (this.checkPlaylistQueue()) {
//         // this.getVid();
//       }
//     });
//   };

//   checkPlaylistQueue = () => {
//     const { playlist, playlistPosition } = this.state;
//     return playlistPosition === playlist.length - 1;
//   };

//   playNext = () => {
//     let { playlist, playlistPosition, cachedVid, timers } = this.state;
//     timers.forEach((timer) => {
//       clearTimeout(timer);
//     });
//     if (playlist.length > playlistPosition + 1) {
//       const { vidId, vidLength, title, artist } = playlist[
//         playlistPosition + 1
//       ];
//       playlistPosition += 1;
//       this.setState({
//         currentVid: { vidId, title, artist },
//         playlistPosition,
//       });
//     } else {
//       if (cachedVid !== null) {
//         this.setState({ currentVid: cachedVid }, () => {
//           this.addToPlaylist(cachedVid);
//           this.getVidToCache();
//         });
//       } else {
//         this.getVid();
//       }
//     }
//   };

//   getPickVid1 = async () => {
//     const {
//       options: {
//         rankMin,
//         rankMax,
//         alternative,
//         country,
//         dance,
//         electronic,
//         hiphop,
//         house,
//         latin,
//         pop,
//         rap,
//         randb,
//         rock,
//         trance,
//       },
//       hiphopAfter,
//       hiphopCount,
//       houseAfter,
//       houseCount,
//       tranceAfter,
//       tranceCount,
//     } = this.state;
//     const { dateMin, dateMax } = getFormattedDate(this.state);
//     try {
//       const token = localStorage.getItem("token");
//       const api_url =
//         process.env.NODE_ENV === "production"
//           ? "https://boxless.herokuapp.com"
//           : "http://localhost:3001";
//       const response = await fetch(
//         `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
//         {
//           method: "GET",
//           headers: { "content-type": "application/json", Authorization: token },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         if (data.vidId && data.title) {
//           const { vidId, title, artist } = data;
//           let newState = {};
//           if (data.genre === "hiphop") {
//             if (
//               hiphopAfter === data.hiphopAfter &&
//               hiphopCount === data.hiphopCount
//             ) {
//               newState.hiphopAfter = "";
//               newState.hiphopCount = "";
//             } else {
//               newState.hiphopAfter = data.hiphopAfter;
//               newState.hiphopCount = data.hiphopCount;
//             }
//           }
//           if (data.genre === "house") {
//             if (
//               houseAfter === data.houseAfter &&
//               houseCount === data.houseCount
//             ) {
//               newState.houseAfter = "";
//               newState.houseCount = "";
//             } else {
//               newState.houseAfter = data.houseAfter;
//               newState.houseCount = data.houseCount;
//             }
//           }
//           if (data.genre === "trance") {
//             if (
//               tranceAfter === data.tranceAfter &&
//               tranceCount === data.tranceCount
//             ) {
//               newState.tranceAfter = "";
//               newState.tranceCount = "";
//             } else {
//               newState.tranceAfter = data.tranceAfter;
//               newState.tranceCount = data.tranceCount;
//             }
//           }
//           this.setState(
//             { ...newState, pickVid1: { vidId, title, artist } },
//             () => this.getCachedPickVid1()
//           );
//         } else {
//           localStorage.clear();
//           this.setState({ loggedIn: false });
//         }
//       } else {
//         // console.log("getVid() - no data");
//         // // this.getVid();
//         // console.log("getVid() - no data");
//         console.log("getPickVid1 failed");
//         setTimeout(() => {
//           this.getPickVid1();
//         }, 4000);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   getCachedPickVid1 = async () => {
//     const {
//       options: {
//         rankMin,
//         rankMax,
//         alternative,
//         country,
//         dance,
//         electronic,
//         hiphop,
//         house,
//         latin,
//         pop,
//         rap,
//         randb,
//         rock,
//         trance,
//       },
//       hiphopAfter,
//       hiphopCount,
//       houseAfter,
//       houseCount,
//       tranceAfter,
//       tranceCount,
//     } = this.state;
//     const { dateMin, dateMax } = getFormattedDate(this.state);
//     try {
//       const token = localStorage.getItem("token");
//       const api_url =
//         process.env.NODE_ENV === "production"
//           ? "https://boxless.herokuapp.com"
//           : "http://localhost:3001";
//       const response = await fetch(
//         `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
//         {
//           method: "GET",
//           headers: { "content-type": "application/json", Authorization: token },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         if (data.vidId && data.title) {
//           const { vidId, title, artist } = data;
//           let newState = {};
//           if (data.genre === "hiphop") {
//             if (
//               hiphopAfter === data.hiphopAfter &&
//               hiphopCount === data.hiphopCount
//             ) {
//               newState.hiphopAfter = "";
//               newState.hiphopCount = "";
//             } else {
//               newState.hiphopAfter = data.hiphopAfter;
//               newState.hiphopCount = data.hiphopCount;
//             }
//           }
//           if (data.genre === "house") {
//             if (
//               houseAfter === data.houseAfter &&
//               houseCount === data.houseCount
//             ) {
//               newState.houseAfter = "";
//               newState.houseCount = "";
//             } else {
//               newState.houseAfter = data.houseAfter;
//               newState.houseCount = data.houseCount;
//             }
//           }
//           if (data.genre === "trance") {
//             if (
//               tranceAfter === data.tranceAfter &&
//               tranceCount === data.tranceCount
//             ) {
//               newState.tranceAfter = "";
//               newState.tranceCount = "";
//             } else {
//               newState.tranceAfter = data.tranceAfter;
//               newState.tranceCount = data.tranceCount;
//             }
//           }
//           this.setState({
//             ...newState,
//             cachedPickVid1: { vidId, title, artist },
//           });
//         } else {
//           // console.log("getVid() - no data");
//           // // this.getVid();
//           // console.log("getVid() - no data");
//           console.log("getCachedPickVid1 failed");
//           setTimeout(() => {
//             this.getCachedPickVid1();
//           }, 4000);
//         }
//       } else {
//         localStorage.clear();
//         this.setState({ loggedIn: false });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   getPickVid2 = async () => {
//     const {
//       options: {
//         rankMin,
//         rankMax,
//         alternative,
//         country,
//         dance,
//         electronic,
//         hiphop,
//         house,
//         latin,
//         pop,
//         rap,
//         randb,
//         rock,
//         trance,
//       },
//       hiphopAfter,
//       hiphopCount,
//       houseAfter,
//       houseCount,
//       tranceAfter,
//       tranceCount,
//     } = this.state;
//     const { dateMin, dateMax } = getFormattedDate(this.state);
//     try {
//       const token = localStorage.getItem("token");
//       const api_url =
//         process.env.NODE_ENV === "production"
//           ? "https://boxless.herokuapp.com"
//           : "http://localhost:3001";
//       const response = await fetch(
//         `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
//         {
//           method: "GET",
//           headers: { "content-type": "application/json", Authorization: token },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         if (data.vidId && data.title) {
//           const { vidId, title, artist } = data;
//           let newState = {};
//           if (data.genre === "hiphop") {
//             if (
//               hiphopAfter === data.hiphopAfter &&
//               hiphopCount === data.hiphopCount
//             ) {
//               newState.hiphopAfter = "";
//               newState.hiphopCount = "";
//             } else {
//               newState.hiphopAfter = data.hiphopAfter;
//               newState.hiphopCount = data.hiphopCount;
//             }
//           }
//           if (data.genre === "house") {
//             if (
//               houseAfter === data.houseAfter &&
//               houseCount === data.houseCount
//             ) {
//               newState.houseAfter = "";
//               newState.houseCount = "";
//             } else {
//               newState.houseAfter = data.houseAfter;
//               newState.houseCount = data.houseCount;
//             }
//           }
//           if (data.genre === "trance") {
//             if (
//               tranceAfter === data.tranceAfter &&
//               tranceCount === data.tranceCount
//             ) {
//               newState.tranceAfter = "";
//               newState.tranceCount = "";
//             } else {
//               newState.tranceAfter = data.tranceAfter;
//               newState.tranceCount = data.tranceCount;
//             }
//           }
//           this.setState(
//             { ...newState, pickVid2: { vidId, title, artist } },
//             () => this.getCachedPickVid2()
//           );
//         } else {
//           // console.log("getVid() - no data");
//           // // this.getVid();
//           // console.log("getVid() - no data");
//           console.log("getPickVid2 failed");
//           setTimeout(() => {
//             this.getPickVid2();
//           }, 4000);
//         }
//       } else {
//         localStorage.clear();
//         this.setState({ loggedIn: false });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   getCachedPickVid2 = async () => {
//     const {
//       options: {
//         rankMin,
//         rankMax,
//         alternative,
//         country,
//         dance,
//         electronic,
//         hiphop,
//         house,
//         latin,
//         pop,
//         rap,
//         randb,
//         rock,
//         trance,
//       },
//       hiphopAfter,
//       hiphopCount,
//       houseAfter,
//       houseCount,
//       tranceAfter,
//       tranceCount,
//     } = this.state;
//     const { dateMin, dateMax } = getFormattedDate(this.state);
//     try {
//       const token = localStorage.getItem("token");
//       const api_url =
//         process.env.NODE_ENV === "production"
//           ? "https://boxless.herokuapp.com"
//           : "http://localhost:3001";
//       const response = await fetch(
//         `${api_url}/api/vid?dateMin=${dateMin}&dateMax=${dateMax}&rankMin=${rankMin}&rankMax=${rankMax}&pop=${pop}&rap=${rap}&latin=${latin}&alternative=${alternative}&electronic=${electronic}&country=${country}&randb=${randb}&rock=${rock}&dance=${dance}&hiphop=${hiphop}&house=${house}&trance=${trance}&lyrics=false&clean=false&karaoke=false&hiphopAfter=${hiphopAfter}&hiphopCount=${hiphopCount}&houseAfter=${houseAfter}&houseCount=${houseCount}&tranceAfter=${tranceAfter}&tranceCount=${tranceCount}`,
//         {
//           method: "GET",
//           headers: { "content-type": "application/json", Authorization: token },
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         if (data.vidId && data.title) {
//           const { vidId, title, artist } = data;
//           let newState = {};
//           if (data.genre === "hiphop") {
//             if (
//               hiphopAfter === data.hiphopAfter &&
//               hiphopCount === data.hiphopCount
//             ) {
//               newState.hiphopAfter = "";
//               newState.hiphopCount = "";
//             } else {
//               newState.hiphopAfter = data.hiphopAfter;
//               newState.hiphopCount = data.hiphopCount;
//             }
//           }
//           if (data.genre === "house") {
//             if (
//               houseAfter === data.houseAfter &&
//               houseCount === data.houseCount
//             ) {
//               newState.houseAfter = "";
//               newState.houseCount = "";
//             } else {
//               newState.houseAfter = data.houseAfter;
//               newState.houseCount = data.houseCount;
//             }
//           }
//           if (data.genre === "trance") {
//             if (
//               tranceAfter === data.tranceAfter &&
//               tranceCount === data.tranceCount
//             ) {
//               newState.tranceAfter = "";
//               newState.tranceCount = "";
//             } else {
//               newState.tranceAfter = data.tranceAfter;
//               newState.tranceCount = data.tranceCount;
//             }
//           }
//           this.setState(
//             {
//               ...newState,
//               cachedPickVid2: { vidId, title, artist },
//             },
//             () => console.log(this.state.hiphopAfter, this.state.hiphopCount)
//           );
//         } else {
//           // console.log("getVid() - no data");
//           // // this.getVid();
//           // console.log("getVid() - no data");
//           console.log("getCachedPickVid2 failed");
//           setTimeout(() => {
//             this.getCachedPickVid2();
//           }, 4000);
//         }
//       } else {
//         localStorage.clear();
//         this.setState({ loggedIn: false });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   refreshPickVids = () => {
//     const { cachedPickVid1, cachedPickVid2 } = this.state;
//     if (cachedPickVid1 && cachedPickVid2) {
//       this.setState(
//         {
//           pickVid1: { ...cachedPickVid1 },
//           pickVid2: { ...cachedPickVid2 },
//           cachedPickVid1: null,
//           cachedPickVid2: null,
//         },
//         () => {
//           this.getCachedPickVid1();
//           this.getCachedPickVid2();
//         }
//       );
//     } else {
//       this.setState(
//         {
//           pickVid1: null,
//           pickVid2: null,
//         },
//         () => {
//           this.getPickVid1();
//           this.getPickVid2();
//         }
//       );
//     }
//   };

//   getSearchVids = async (searchTerm) => {
//     try {
//       const token = localStorage.getItem("token");
//       const api_url =
//         process.env.NODE_ENV === "production"
//           ? "https://boxless.herokuapp.com"
//           : "http://localhost:3001";
//       const response = await fetch(
//         `${api_url}/api/searchvids?search=${searchTerm.replace(/ /g, "%")}`,
//         {
//           method: "GET",
//           headers: { "content-type": "application/json", Authorization: token },
//         }
//       );
//       if (response.ok) {
//         const { searchResults } = await response.json();
//         this.setState({ searchResults });
//       } else {
//         localStorage.clear();
//         this.setState({ loggedIn: false });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   handleLogin = () => {
//     this.setState({ loggedIn: true }, () => {
//       if (localStorage.getItem("token")) {
//         this.setState({ loggedIn: true }, () => {
//           const {
//             currentVid: { vidId },
//           } = this.state;
//           if (vidId === null) {
//             this.getVid();
//           }
//         });
//       }
//     });
//   };

//   getTimers = (timers) => {
//     this.setState({ timers });
//   };

//   togglePlayPause = () => {
//     const { player, playing } = this.state;
//     if (player) {
//       if (playing) {
//         player.pauseVideo();
//       } else {
//         player.playVideo();
//       }
//     }
//   };

//   setPlayer = (event) => {
//     this.setState({ player: event.target });
//   };

//   onPlay = () => {
//     this.setState({ playing: true });
//   };

//   onPause = () => {
//     this.setState({ playing: false });
//   };

//   playPrevious = () => {
//     const { playlist, playlistPosition, timers } = this.state;
//     timers.forEach((timer) => {
//       clearTimeout(timer);
//     });
//     const previousVid = playlist[playlistPosition - 1];
//     this.setState({
//       currentVid: previousVid,
//       playlistPosition: playlistPosition - 1,
//     });
//   };

//   render() {
//     const {
//       activeTab,
//       currentVid: { vidId, vidLength, title, artist },
//       options,
//       pickVid1,
//       pickVid2,
//       searchResults,
//       playlist,
//       playlistPosition,
//       loggedIn,
//       songLength,
//       cachedVid,
//       playing,
//     } = this.state;

//     if (loggedIn) {
//       return (
//         <div style={styles.container}>
//           <Player
//             getVid={this.getVid}
//             vidId={vidId}
//             vidLength={vidLength}
//             playNext={this.playNext}
//             songLength={songLength}
//             getTimers={this.getTimers}
//             setPlayer={this.setPlayer}
//             onPlay={this.onPlay}
//             onPause={this.onPause}
//           />
//           {activeTab !== "none" && (
//             <MinControls
//               title={title}
//               artist={artist}
//               vidId={vidId}
//               playNext={this.playNext}
//               playPrevious={this.playPrevious}
//               cachedVid={cachedVid}
//               togglePlayPause={this.togglePlayPause}
//               playing={playing}
//             />
//           )}
//           {activeTab === "none" && (
//             <FullControls title={title} artist={artist} vidId={vidId} />
//           )}
//           {activeTab === "options" && (
//             <Options
//               options={options}
//               toggle={this.handleOptionClick}
//               handleChange={this.handleDropDownChange}
//             />
//           )}
//           {activeTab === "pick" && (
//             <Pick
//               pickVid1={pickVid1}
//               pickVid2={pickVid2}
//               refresh={this.refreshPickVids}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "search" && (
//             <Search
//               getSearchVids={this.getSearchVids}
//               searchResults={searchResults}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "playlist" && (
//             <Playlist playlist={playlist} playlistPosition={playlistPosition} />
//           )}
//           <div style={styles.bottomPadding}></div>
//           <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
//         </div>
//       );
//     } else {
//       return <Login handleLogin={this.handleLogin} />;
//     }
//   }
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     backgroundColor: "black",
//   },
//   bottomPadding: {
//     height: "50px",
//     backgroundColor: "#3D3E3F",
//   },
// };

/* ---------------------Here-------------------- */

// import React, { Component } from "react";

// import Login from "./components/Login";
// import Player from "./components/Player";
// import Tabs from "./components/Tabs";
// import Options from "./components/Options";
// import Pick from "./components/Pick";
// import Search from "./components/Search";
// import Playlist from "./components/Playlist";
// import MinControls from "./components/MinControls";
// import FullControls from "./components/FullControls";

// import { fetchVid, fetchSearchVids, fetchPickVids } from "./api/api";
// import { getDefaultDates } from "./utils/utils";

// const {
//   dayMin,
//   monthMin,
//   yearMin,
//   dayMax,
//   monthMax,
//   yearMax,
// } = getDefaultDates();

// export default class App extends Component {
//   state = {
//     loggedIn: false,
//     player: null,
//     playlist: [],
//     playlistPosition: 0,
//     options: {
//       lyrics: false,
//       clean: false,
//       karaoke: false,
//       norepeats: true,
//       alternative: true,
//       country: true,
//       dance: true,
//       electronic: true,
//       hiphop: true,
//       house: true,
//       latin: true,
//       pop: true,
//       rap: true,
//       randb: true,
//       rock: true,
//       trance: true,
//       dayMin,
//       dayMax,
//       monthMin,
//       monthMax,
//       yearMin,
//       yearMax,
//       rankMin: 1,
//       rankMax: 100,
//       lengthMax: 60,
//     },
//     cachedVid: null,
//     loadingCachedVid: false,
//     activeTab: "options",
//     pickVid1: null,
//     pickVid2: null,
//     searchResults: {},
//     playing: false,
//     playedNext: false,
//   };

//   componentDidMount() {
//     if (localStorage.getItem("token")) {
//       this.setState({ loggedIn: true });
//     }
//   }

//   setPlayer = (event) => {
//     this.setState({ player: event.target }, () => {
//       this.getVid();
//     });
//   };

//   getVid = async () => {
//     const token = localStorage.getItem("token");
//     const data = await fetchVid(this.state, token);
//     if (data === null) {
//       localStorage.clear();
//       this.setState({ loggedIn: false });
//     } else {
//       if (data.vidId) {
//         const { playlist } = this.state;
//         if (playlist.length === 0) {
//           this.addToPlaylist(data);
//         } else {
//           this.cacheVid(data);
//         }
//       } else {
//         setTimeout(() => {
//           this.getVid();
//         }, 4000);
//       }
//     }
//   };

//   addToPlaylist = (vid) => {
//     const { playlist } = this.state;
//     this.setState({ playlist: [...playlist, vid] }, () => {
//       const { playlist } = this.state;
//       if (playlist.length === 1) {
//         const { vidId } = playlist[0];
//         this.loadVideo(vidId);
//         this.getVid();
//       }
//     });
//   };

//   cacheVid = (vid) => {
//     this.setState({ cachedVid: vid, loadingCachedVid: false });
//   };

//   playNext = async (type) => {
//     const {
//       playlist,
//       playlistPosition,
//       playedNext,
//       cachedVid,
//       loadingCachedVid,
//     } = this.state;
//     if (playedNext) {
//       this.setState({ playedNext: false });
//     } else {
//       if (playlistPosition < playlist.length - 1) {
//         const { vidId } = playlist[playlistPosition + 1];
//         if (type === "automatic") {
//           this.setState(
//             {
//               playlistPosition: playlistPosition + 1,
//               playedNext: true,
//             },
//             () => this.loadVideo(vidId)
//           );
//         } else {
//           this.setState(
//             {
//               playlistPosition: playlistPosition + 1,
//             },
//             () => this.loadVideo(vidId)
//           );
//         }
//       } else if (cachedVid) {
//         const { vidId } = cachedVid;
//         this.loadVideo(vidId);
//         this.useCachedVid();
//       } else if (cachedVid === null && !loadingCachedVid) {
//         await this.getVid();
//         this.playNext("manual");
//       }
//     }
//   };

//   loadVideo = (videoId) => {
//     const {
//       player,
//       options: { lengthMax },
//     } = this.state;
//     let start = 0;
//     // let end = start + lengthMax;
//     let end = lengthMax;
//     player.loadVideoById({
//       videoId,
//       startSeconds: start,
//       endSeconds: end,
//     });
//   };

//   useCachedVid = () => {
//     const { playlist, playlistPosition, cachedVid } = this.state;
//     if (playlist[playlistPosition].vidId !== cachedVid.vidId) {
//       this.setState({
//         playlistPosition: playlistPosition + 1,
//         playlist: [...playlist, cachedVid],
//         cachedVid: null,
//         loadingCachedVid: true,
//       });
//       this.getVid();
//     }
//   };

//   handleError = async () => {
//     console.log("handleError");
//     const { player, cachedVid } = this.state;
//     if (
//       cachedVid !== null &&
//       player.getVideoData().video_id !== cachedVid.vidId
//     ) {
//       this.playNext("manual");
//     } else {
//       await this.getVid();
//       this.playNext("manual");
//     }
//   };

//   handleLogin = () => {
//     this.setState({ loggedIn: true });
//   };

//   handleTabClick = (e, { name }) => {
//     if (this.state.activeTab === name) {
//       this.setState({ activeTab: "none" });
//     } else {
//       this.setState({ activeTab: name });
//     }
//   };

//   handleOptionClick = (e) => {
//     const option = e.target.name;
//     this.setState({
//       options: {
//         ...this.state.options,
//         [option]: !this.state.options[option],
//       },
//     });
//   };

//   handleDropDownChange = (dropDownType, value) => {
//     this.setState({
//       options: { ...this.state.options, [dropDownType]: value },
//     });
//   };

//   getPickVids = async () => {
//     const token = localStorage.getItem("token");
//     const data = await fetchPickVids(this.state, token);
//     if (data === null) {
//       localStorage.clear();
//       this.setState({ loggedIn: false });
//     } else {
//       console.log(data);
//     }
//   };

//   getSearchVids = async (searchTerm) => {
//     const token = localStorage.getItem("token");
//     const data = await fetchSearchVids(token, searchTerm);
//     if (data === null) {
//       localStorage.clear();
//       this.setState({ loggedIn: false });
//     } else {
//       const { searchResults } = data;
//       this.setState({ searchResults });
//     }
//   };

//   onPlay = () => {
//     this.setState({ playing: true });
//   };

//   onPause = () => {
//     this.setState({ playing: false });
//   };

//   togglePlayPause = () => {
//     const { player, playing } = this.state;
//     if (player) {
//       if (playing) {
//         player.pauseVideo();
//       } else {
//         player.playVideo();
//       }
//     }
//   };

//   playPrevious = () => {
//     const { playlist, playlistPosition } = this.state;
//     if (playlistPosition > 0) {
//       const prevVid = playlist[playlistPosition - 1];
//       const { vidId } = prevVid;
//       this.setState({ playlistPosition: playlistPosition - 1 }, () =>
//         this.loadVideo(vidId)
//       );
//     }
//   };

//   render() {
//     const {
//       loggedIn,
//       activeTab,
//       options,
//       pickVid1,
//       pickVid2,
//       searchResults,
//       playlist,
//       playlistPosition,
//       cachedVid,
//       playing,
//       player,
//     } = this.state;
//     if (loggedIn) {
//       return (
//         <div style={styles.container}>
//           <Player
//             setPlayer={this.setPlayer}
//             playNext={this.playNext}
//             handleError={this.handleError}
//             onPlay={this.onPlay}
//             onPause={this.onPause}
//           />
//           {activeTab !== "none" && (
//             <MinControls
//               info={playlist[playlistPosition]}
//               playNext={this.playNext}
//               playPrevious={this.playPrevious}
//               cachedVid={cachedVid}
//               togglePlayPause={this.togglePlayPause}
//               playing={playing}
//               playlistPosition={playlistPosition}
//               playlist={playlist}
//               player={player}
//             />
//           )}
//           {activeTab === "none" && (
//             <FullControls info={playlist[playlistPosition]} />
//           )}
//           {activeTab === "options" && (
//             <Options
//               options={options}
//               toggle={this.handleOptionClick}
//               handleChange={this.handleDropDownChange}
//             />
//           )}
//           {activeTab === "pick" && (
//             <Pick
//               pickVid1={pickVid1}
//               pickVid2={pickVid2}
//               refresh={this.getPickVids}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "search" && (
//             <Search
//               getSearchVids={this.getSearchVids}
//               searchResults={searchResults}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "playlist" && (
//             <Playlist playlist={playlist} playlistPosition={playlistPosition} />
//           )}
//           <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
//         </div>
//       );
//     } else {
//       return <Login handleLogin={this.handleLogin} />;
//     }
//   }
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     backgroundColor: "black",
//   },
//   bottomPadding: {
//     height: "50px",
//     backgroundColor: "#3D3E3F",
//   },
// };

/* -------------------------------- Here 2----------------------- */

// import React, { Component } from "react";
// import ReactPlayer from "react-player/youtube";

// import Login from "./components/Login";
// import Player from "./components/Player";
// import Static from "./components/Static";
// import Tabs from "./components/Tabs";
// import Options from "./components/Options";
// import MinControls from "./components/MinControls";
// import Pick from "./components/Pick";
// import Search from "./components/Search";
// import Playlist from "./components/Playlist";

// import { fetchSearchVids, fetchVid } from "./api/api";
// import { getDefaultDates } from "./utils/utils";

// const {
//   dayMin,
//   monthMin,
//   yearMin,
//   dayMax,
//   monthMax,
//   yearMax,
// } = getDefaultDates();

// export default class App extends Component {
//   state = {
//     loggedIn: false,
//     options: {
//       lyrics: false,
//       clean: false,
//       karaoke: false,
//       norepeats: true,
//       alternative: true,
//       country: true,
//       dance: true,
//       electronic: true,
//       hiphop: true,
//       house: true,
//       latin: true,
//       pop: true,
//       rap: true,
//       randb: true,
//       rock: true,
//       trance: true,
//       dayMin,
//       dayMax,
//       monthMin,
//       monthMax,
//       yearMin,
//       yearMax,
//       rankMin: 1,
//       rankMax: 100,
//       lengthMax: 60,
//     },
//     currentVid: null,
//     activeTab: "options",
//     searchResults: {},
//     playlist: [],
//     playlistPosition: 0,
//     cachedVid: null,
//     playing: null,
//     hiphopAfter: "",
//     hiphopCount: "",
//     houseAfter: "",
//     houseCount: "",
//     tranceAfter: "",
//     tranceCount: "",
//     fetchingVid: false,
//     shouldPlayNext: false,
//     playedNext: false,
//   };

//   componentDidMount() {
//     if (localStorage.getItem("token")) {
//       this.setState({ loggedIn: true }, () => this.getVid());
//     }
//   }

//   handleLogin = () => {
//     this.setState({ loggedIn: true }, () => {
//       this.getVid();
//     });
//   };

//   getVid = () => {
//     this.setState({ fetchingVid: true }, async () => {
//       const {
//         options: { norepeats },
//       } = this.state;
//       const data = await fetchVid(this.state, localStorage.getItem("token"));
//       if (data === null) {
//         localStorage.clear();
//         this.setState({ loggedIn: false });
//       } else {
//         const repeat = this.checkRepeat(data) && norepeats;
//         if (
//           data.vidId &&
//           ReactPlayer.canPlay(
//             `https://www.youtube.com/watch?v=${data.vidId}`
//           ) &&
//           !repeat
//         ) {
//           this.setState({ fetchingVid: false }, () => {
//             const { playlist } = this.state;
//             if (playlist.length === 0) {
//               this.addToPlaylist(data);
//             } else {
//               this.cacheVid(data);
//             }
//           });
//         } else {
//           setTimeout(() => {
//             this.getVid();
//           }, 4000);
//         }
//       }
//     });
//   };

//   addToPlaylist = (vid) => {
//     const { playlist } = this.state;
//     let updatedBeforeAndCount = {};
//     if (vid.genre) {
//       updatedBeforeAndCount = this.getUpdateBeforeAndCount(vid);
//     }
//     this.setState(
//       { playlist: [...playlist, vid], ...updatedBeforeAndCount },
//       () => {
//         const { playlist } = this.state;
//         if (playlist.length === 1) {
//           this.setState({ currentVid: playlist[0] }, () => {
//             this.getVid();
//           });
//         }
//       }
//     );
//   };

//   cacheVid = (vid) => {
//     const { shouldPlayNext } = this.state;
//     let updatedBeforeAndCount = {};
//     if (vid.genre) {
//       updatedBeforeAndCount = this.getUpdateBeforeAndCount(vid);
//     }
//     if (shouldPlayNext) {
//       this.setState(
//         { shouldPlayNext: false, cachedVid: vid, ...updatedBeforeAndCount },
//         () => {
//           this.playNext();
//         }
//       );
//     } else {
//       this.setState({ cachedVid: vid, ...updatedBeforeAndCount });
//     }
//   };

//   getUpdateBeforeAndCount = (data) => {
//     const {
//       hiphopAfter,
//       hiphopCount,
//       houseAfter,
//       houseCount,
//       tranceAfter,
//       tranceCount,
//     } = this.state;
//     const newState = {};
//     if (data.genre === "hiphop") {
//       if (
//         hiphopAfter === data.hiphopAfter &&
//         hiphopCount === data.hiphopCount
//       ) {
//         newState.hiphopAfter = "";
//         newState.hiphopCount = "";
//       } else {
//         newState.hiphopAfter = data.hiphopAfter;
//         newState.hiphopCount = data.hiphopCount;
//       }
//     }
//     if (data.genre === "house") {
//       if (houseAfter === data.houseAfter && houseCount === data.houseCount) {
//         newState.houseAfter = "";
//         newState.houseCount = "";
//       } else {
//         newState.houseAfter = data.houseAfter;
//         newState.houseCount = data.houseCount;
//       }
//     }
//     if (data.genre === "trance") {
//       if (
//         tranceAfter === data.tranceAfter &&
//         tranceCount === data.tranceCount
//       ) {
//         newState.tranceAfter = "";
//         newState.tranceCount = "";
//       } else {
//         newState.tranceAfter = data.tranceAfter;
//         newState.tranceCount = data.tranceCount;
//       }
//     }
//     return newState;
//   };

//   playNext = async (type) => {
//     const { playedNext } = this.state;
//     if (type === "manual") {
//       const { playlist, playlistPosition, cachedVid } = this.state;
//       if (playlistPosition < playlist.length - 1) {
//         const vid = playlist[playlistPosition + 1];
//         this.setState({
//           playlistPosition: playlistPosition + 1,
//           currentVid: vid,
//         });
//       } else if (cachedVid) {
//         const vid = cachedVid;
//         this.setState(
//           {
//             cachedVid: null,
//             playlist: [...playlist, vid],
//             playlistPosition: playlistPosition + 1,
//             currentVid: vid,
//           },
//           () => this.getVid()
//         );
//       }
//     } else if (!playedNext) {
//       const { playlist, playlistPosition, cachedVid, fetchingVid } = this.state;
//       if (playlistPosition < playlist.length - 1) {
//         const vid = playlist[playlistPosition + 1];
//         this.setState({ playedNext: true }, () => {
//           this.setState({
//             playlistPosition: playlistPosition + 1,
//             currentVid: vid,
//             playedNext: true,
//           });
//         });
//       } else if (cachedVid) {
//         const vid = cachedVid;
//         this.setState({ playedNext: true }, () => {
//           this.setState(
//             {
//               cachedVid: null,
//               playlist: [...playlist, vid],
//               playlistPosition: playlistPosition + 1,
//               currentVid: vid,
//               playedNext: true,
//             },
//             () => this.getVid()
//           );
//         });
//       } else if (fetchingVid) {
//         this.setState({ shouldPlayNext: true });
//       }
//     } else {
//       this.setState({ playedNext: false });
//     }
//   };

//   playPrevious = () => {
//     const { playlist, playlistPosition } = this.state;
//     if (playlistPosition > 0) {
//       const prevVid = playlist[playlistPosition - 1];
//       this.setState({
//         playlistPosition: playlistPosition - 1,
//         currentVid: prevVid,
//       });
//     }
//   };

//   getSearchVids = async (searchTerm) => {
//     const data = await fetchSearchVids(
//       localStorage.getItem("token"),
//       searchTerm
//     );
//     if (data === null) {
//       localStorage.clear();
//       this.setState({ loggedIn: false });
//     } else {
//       const { searchResults } = data;
//       this.setState({ searchResults });
//     }
//   };

//   handleError = async () => {
//     const { cachedVid } = this.state;
//     if (cachedVid !== null) {
//       this.playNext();
//     } else {
//       await this.getVid();
//       this.playNext();
//     }
//   };

//   checkRepeat = (data) => {
//     const { playlist } = this.state;
//     let res = false;
//     playlist.forEach((vid) => {
//       if (data.vidId === vid.vidId) {
//         res = true;
//       }
//     });
//     return res;
//   };

//   handleTabClick = (e, { name }) => {
//     if (this.state.activeTab === name) {
//       this.setState({ activeTab: "none" });
//     } else {
//       this.setState({ activeTab: name });
//     }
//   };

//   handleOptionClick = (e) => {
//     const option = e.target.name;
//     this.setState({
//       options: {
//         ...this.state.options,
//         [option]: !this.state.options[option],
//       },
//     });
//   };

//   handleDropDownChange = (dropDownType, value) => {
//     this.setState({
//       options: { ...this.state.options, [dropDownType]: value },
//     });
//   };

//   onPlay = () => {
//     this.setState({ playing: true });
//   };

//   onPause = () => {
//     this.setState({ playing: false });
//   };

//   togglePlayPause = () => {
//     const { playing } = this.state;
//     this.setState({ playing: !playing });
//   };

//   render() {
//     const {
//       loggedIn,
//       currentVid,
//       activeTab,
//       options,
//       playlist,
//       playlistPosition,
//       playing,
//       cachedVid,
//       searchResults,
//     } = this.state;
//     if (loggedIn) {
//       return (
//         <div style={styles.container}>
//           {currentVid && currentVid.vidId ? (
//             <Player
//               vidId={currentVid.vidId}
//               playNext={this.playNext}
//               onPlay={this.onPlay}
//               onPause={this.onPause}
//               playing={playing}
//               lengthMax={options.lengthMax}
//               onError={this.handleError}
//             />
//           ) : (
//             <Static width="448px" height="252px" />
//           )}
//           {activeTab !== "none" && (
//             <MinControls
//               info={currentVid}
//               playNext={this.playNext}
//               playPrevious={this.playPrevious}
//               cachedVid={cachedVid}
//               togglePlayPause={this.togglePlayPause}
//               playing={playing}
//               playlistPosition={playlistPosition}
//               playlist={playlist}
//             />
//           )}
//           {activeTab === "options" && (
//             <Options
//               options={options}
//               toggle={this.handleOptionClick}
//               handleChange={this.handleDropDownChange}
//             />
//           )}
//           {activeTab === "pick" && (
//             <Pick
//               // pickVid1={pickVid1}
//               // pickVid2={pickVid2}
//               refresh={this.getPickVids}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "search" && (
//             <Search
//               getSearchVids={this.getSearchVids}
//               searchResults={searchResults}
//               addToPlaylist={this.addToPlaylist}
//             />
//           )}
//           {activeTab === "playlist" && (
//             <Playlist playlist={playlist} playlistPosition={playlistPosition} />
//           )}
//           <div style={styles.bottomPadding}></div>
//           <Tabs activeTab={activeTab} handleTabClick={this.handleTabClick} />
//         </div>
//       );
//     } else {
//       return <Login handleLogin={this.handleLogin} />;
//     }
//   }
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     backgroundColor: "black",
//   },
//   bottomPadding: {
//     height: "50px",
//     backgroundColor: "#3D3E3F",
//   },
// };

/**************** Here 3 **********************/

import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import ReactPlayer from "react-player/youtube";

import Login from "./components/Login";
import Player from "./components/Player";
import Static from "./components/Static";

import { fetchVid } from "./api/api";
import { getDefaultDates } from "./utils/utils";

const { dayMin, monthMin, yearMin, dayMax, monthMax, yearMax } =
  getDefaultDates();

export default class App extends Component {
  state = {
    loggedIn: false,
    playing: false,
    options: {
      lyrics: false,
      clean: false,
      karaoke: false,
      norepeats: true,
      alternative: true,
      country: true,
      dance: true,
      electronic: true,
      hiphop: true,
      house: true,
      latin: true,
      pop: true,
      rap: true,
      randb: true,
      rock: true,
      trance: true,
      dayMin,
      dayMax,
      monthMin,
      monthMax,
      yearMin,
      yearMax,
      rankMin: 1,
      rankMax: 100,
      lengthMax: 100,
    },
    currentVid: null,
    gettingVid: false,
    keepPlaying: true,
    playedNext: false,
    playlist: [],
    cachedVid: null,
    playlistPosition: 0,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    }
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  };

  getVid = () => {
    this.setState(
      {
        gettingVid: true,
      },
      async () => {
        const data = await fetchVid(this.state, localStorage.getItem("token"));
        if (data) {
          if (
            data.vidId &&
            ReactPlayer.canPlay(`https://www.youtube.com/watch?v=${data.vidId}`)
          ) {
            this.setState({ gettingVid: false }, () => {
              const { playlist } = this.state;
              if (playlist.length === 0) {
                this.addToPlaylist(data);
              } else {
                this.cacheVid(data);
              }
            });
          } else {
            setTimeout(() => {
              this.getVid();
            }, 4000);
          }
        } else {
          localStorage.clear();
          this.setState({ loggedIn: false });
        }
      }
    );
  };

  handlePlayPause = () => {
    const { currentVid, playing } = this.state;
    if (currentVid) {
      if (playing) {
        this.setState({ playing: false, keepPlaying: false });
      } else {
        this.setState({ playing: true, keepPlaying: true });
      }
    } else {
      this.setState({ playing: true }, () => {
        this.getVid();
      });
    }
  };

  playNext = () => {
    const { playlist, playlistPosition, cachedVid } = this.state;
    if (playlistPosition < playlist.length - 1) {
    } else if (cachedVid) {
      this.setState(
        {
          cachedVid: null,
          playlist: [...playlist, cachedVid],
          playlistPosition: playlistPosition + 1,
          currentVid: cachedVid,
          playing: true,
        },
        () => this.getVid()
      );
    }
  };

  endSong = () => {
    this.setState({ current: null }, () => {
      this.playNext();
    });
  };

  addToPlaylist = (vid) => {
    const { playlist } = this.state;
    this.setState({ playlist: [...playlist, vid] }, () => {
      const { playlist } = this.state;
      if (playlist.length === 1) {
        this.setState({ currentVid: playlist[0] }, () => {
          this.getVid();
        });
      }
    });
  };

  cacheVid = (vid) => {
    this.setState({ cachedVid: vid }, () => {
      const { playing, keepPlaying } = this.state;
      if (!playing && keepPlaying) {
        this.setState({ playedNext: false }, () => {
          this.playNext();
        });
      }
    });
  };

  render() {
    const {
      loggedIn,
      playing,
      currentVid,
      options: { lengthMax },
      gettingVid,
    } = this.state;

    if (loggedIn) {
      return (
        <div style={styles.container}>
          {currentVid && currentVid.vidId ? (
            <Player
              vidId={currentVid.vidId}
              playing={playing}
              lengthMax={lengthMax}
              playNext={this.playNext}
              endSong={this.endSong}
            />
          ) : (
            <Static width="448px" height="252px" />
          )}
          {gettingVid && (
            <div>
              <p style={{ color: "white" }}>Getting Vid</p>
            </div>
          )}
          <Button onClick={this.handlePlayPause}>Play</Button>
          <Button onClick={() => console.log(this.state)}>State</Button>
        </div>
      );
    } else {
      return <Login handleLogin={this.handleLogin} />;
    }
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "black",
  },
  bottomPadding: {
    height: "50px",
    backgroundColor: "#3D3E3F",
  },
};
