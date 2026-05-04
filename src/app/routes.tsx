import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import VerifyLogin from "./components/auth/VerifyLogin";
import VerifyRegister from "./components/auth/VerifyRegister";
import Home from "./components/home/Home";
import CreateTripManual from "./components/trips/CreateTripManual";
import CreateTripAutomatic from "./components/trips/CreateTripAutomatic";
import Survey from "./components/trips/Survey";
import WaitingSurvey from "./components/trips/WaitingSurvey";
import DestinationMatcher from "./components/trips/DestinationMatcher";
import WaitingMatch from "./components/trips/WaitingMatch";
import MatchResults from "./components/trips/MatchResults";
import AddHotel from "./components/trips/AddHotel";
import HotelMatcher from "./components/trips/HotelMatcher";
import WaitingHotels from "./components/trips/WaitingHotels";
import HotelResults from "./components/trips/HotelResults";
import TripDetail from "./components/trips/TripDetail";
import Gallery from "./components/trips/Gallery";
import Settings from "./components/settings/Settings";
import Profile from "./components/settings/Profile";
import Friends from "./components/settings/Friends";
import Notifications from "./components/settings/Notifications";
import Privacy from "./components/settings/Privacy";
import Help from "./components/settings/Help";
import HowToCreateTrip from "./components/settings/help/HowToCreateTrip";
import HowToInviteFriends from "./components/settings/help/HowToInviteFriends";
import ManageHotelBookings from "./components/settings/help/ManageHotelBookings";
import FAQ from "./components/settings/help/FAQ";
import Contact from "./components/settings/Contact";
import Contacts from "./components/settings/Contacts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "verify-login", Component: VerifyLogin },
      { path: "verify-register", Component: VerifyRegister },
      { path: "home", Component: Home },
      { path: "create-trip/manual", Component: CreateTripManual },
      { path: "create-trip/automatic", Component: CreateTripAutomatic },
      { path: "survey/:tripId", Component: Survey },
      { path: "waiting-survey/:tripId", Component: WaitingSurvey },
      { path: "match-destinations/:tripId", Component: DestinationMatcher },
      { path: "waiting-match/:tripId", Component: WaitingMatch },
      { path: "match-results/:tripId", Component: MatchResults },
      { path: "add-hotel/:tripId", Component: AddHotel },
      { path: "match-hotels/:tripId", Component: HotelMatcher },
      { path: "waiting-hotels/:tripId", Component: WaitingHotels },
      { path: "hotel-results/:tripId", Component: HotelResults },
      { path: "trip/:tripId", Component: TripDetail },
      { path: "gallery/:tripId", Component: Gallery },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "friends", Component: Friends },
      { path: "notifications", Component: Notifications },
      { path: "privacy", Component: Privacy },
      { path: "help", Component: Help },
      { path: "help/create-trip", Component: HowToCreateTrip },
      { path: "help/invite-friends", Component: HowToInviteFriends },
      { path: "help/hotel-bookings", Component: ManageHotelBookings },
      { path: "help/faq", Component: FAQ },
      { path: "contact", Component: Contact },
      { path: "contacts", Component: Contacts },
    ],
  },
]);
