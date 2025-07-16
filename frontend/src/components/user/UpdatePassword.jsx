import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updatePassword } from "../../store/Users/user-action";
import { userActions } from "../../store/Users/user-slice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const {errors,success}= useSelector((state)=> state.user);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== passwordConfirm){
      toast.error("password doent match")
      return false;
    }else{
      dispatch(updatePassword({passwordCurrent,password,passwordConfirm}))
    }
    console.log({passwordCurrent,password,passwordConfirm})
  };

  useEffect(() => {
    if(errors){
      dispatch(userActions.clearError())
    }else if(success){
      toast.success("password Updated Sucessfuly")
      navigate("/profile");
      dispatch(userActions.getPasswordSuccess(false));
    }
  }, [errors,dispatch,navigate,success]);
  

  return (
    <>
      {/* <MetaData title={"Change Password"} /> */}

      <div className="row wrapper">
        <div className="col-10 col-lg-5 updateprofile">
          <form onSubmit={submitHandler}>
            <h1 className="password_title">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={passwordCurrent}
                onChange={(e) => setPasswordCurrent(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="new_password_confirm_field">
                New Password Confirm
              </label>
              <input
                type="password"
                id="new_password_confirm_field"
                className="form-control"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-block py-3 password-btn"
              //   disabled={loading ? true : flse}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
