import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import PropertyList from "./components/home/PropertyList";
import PropertyListing from "./components/propertyListing/PropertyListing";
import Main from "./components/home/Main";
import Accomodation from "./components/accomodation/Accomodation";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import MyBookings from "./components/myBookings/MyBookings";
import BookingDetails from "./components/myBookings/BookingDetails";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/Users/user-slice";
import { useEffect } from "react";
import { CurrentUser } from "./store/Users/user-action";
import AccomodationForm from "./components/accomodation/AccomodationForm";
import ForgetPassword from "./components/user/ForgetPassword";
import ResetPassword from "./components/user/ResetPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import Payment from "./components/Payment/Payment";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const { errors, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    }
  }, [errors, dispatch]);

  useEffect(() => {
    dispatch(CurrentUser());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />}>
        <Route index element={<PropertyList />} />
        <Route path="propertylist/:id" element={<PropertyListing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="user/forgotpassword" element={<ForgetPassword />} />
        <Route path="user/resetpassword/:token" element={<ResetPassword />} />
        <Route
          path="profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="editprofile"
          element={user ? <EditProfile /> : <Navigate to="/login" />}
        />
        <Route
          id="accomodation"
          path="accomodation"
          element={user ? <Accomodation /> : <Navigate to="/login" />}
        />
        <Route
          id="accomodationform"
          path="accomodationform"
          element={user ? <AccomodationForm /> : <Navigate to="/login" />}
        />
        <Route
          path="payment/:propertyId"
          element={user ? <Payment /> : <Navigate to="/login" />}
        />
        <Route
          path="user/updatepassword"
          element={user ? <UpdatePassword /> : <Navigate to="/login" />}
        />
        <Route
          path="user/mybookings"
          element={user ? <MyBookings /> : <Navigate to="/login" />}
        />
        <Route
          path="user/mybookings/:bookingId"
          element={user ? <BookingDetails /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
