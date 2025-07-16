import React, { Fragment, useEffect, useState } from "react";
import "../../CSS/Profile.css";
import { useForm } from "@tanstack/react-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/Users/user-slice";
import { updateUser } from "../../store/Users/user-action";
import { toast } from "react-toastify";
// import { original } from "@reduxjs/toolkit";
// import { object } from "prop-types";


const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user,errors,loading} = useSelector((state)=>state.user)

//   const [avatarPreview, setAvatarPreview] = useState(
// user.avatar.url || "https://i.pravatar.cc/150?img=15"
// );
const [avatarPreview, setAvatarPreview] = useState(
  user?.avatar?.url || "https://i.pravatar.cc/150?img=15"
);


// const originalUserData = {
//   name:user?.name||"",
//   phoneNumber:user?.name||"",
//   avatar:user?.name||""
// }

const originalUserData = {
  name: user?.name || "",
  phoneNumber: user?.phoneNumber || "",
  avatar: user?.avatar?.url || ""
};


const onChange = (e) =>{
  const reader = new FileReader(); // filereader 
  reader.onload = () =>{
    if(reader.readyState === 2){
      setAvatarPreview(reader.result);
      form.setFieldValue("avatar",reader.result)
    }
  };
  reader.readAsDataURL(e.target.files[0]);
};

useEffect(() => {
if(errors && errors.length >0){
  toast.error(errors);
  dispatch(userActions.clearError());
}else if(user){
  form.setFieldValue("name",user.name);
  form.setFieldValue("phoneNumber",user.phoneNumber);
  form.setFieldValue("avatar",user.avatar.url || "https://i.pravatar.cc/150?img=15");
}
},[user])






const form = useForm({
  defaultValues:{
    name:"",
    phoneNumber:"",
    avatar:""
  },
  onSubmit:({value})=>{console.log(value);
    const updateFields={};
    if(value.name !== originalUserData.name){
      updateFields.name= value.name
    }
    if(value.phoneNumber !== originalUserData.phoneNumber){
      updateFields.phoneNumber= value.phoneNumber
    }

    if(value.avatar !== originalUserData.avatar){
      updateFields.avatar= value.avatar;
    }

   if (Object.keys(updateFields).length === 0) {
    toast.info("No changes made");
    return;
  }
    dispatch(updateUser(updateFields));
    navigate("/profile");
    toast.success("profile updated")
  },
});



  

  return (
    <Fragment>
      <div className="row wrapper ">
        <div className="col-10 col-lg-5 updateprofile">
          <form encType="multipart/form-data" onSubmit={(e)=>{
            e.preventDefault();
            form.handleSubmit(); //from tanstack
          }}>
          <h1 className="mt-2 mb-5">Update Profile</h1>
          {/* name filed  */}
          <form.Field name="name">{(field)=> (<div className="from-group"><label htmlFor="email_field">Name</label>
          <input type="text" id="name_field"
          className="form-control" 
          value={field.state.value}
          onChange={(e)=>field.handleChange(e.target.value)}/></div>)}</form.Field>

            {/* phoneNumber  */}
           <form.Field name="phoneNumber">{(field)=> (<div className="from-group"><label htmlFor="email_field">phoneNumber</label>
          <input type="text" id="name_field"
          className="form-control" 
          value={field.state.value}
          onChange={(e)=>field.handleChange(e.target.value)}/></div>)}</form.Field>

            
           <form.Field name="avatar">
            {(field) =>(
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center"><div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatarPreview} alt="Avatar Preview" className="rounded-circle" /></figure></div>
                    <div className="custom-file">
                      <input type="file" name={field.name} id ="avatarupdate" className="custom-file-input"
                      accept="image" 
                      onChange={onChange}/>
                      <label className="custom-file-label" htmlFor="customFile">choose Avatar</label>
                    </div>
                    </div>
              </div>
            )}

          </form.Field>


          <button type="submit"
          className="update-btn btn-block">update</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
