import { toast } from "react-toastify";
import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import upload from "../../lib/upload"; // Ensure the correct path to the upload function

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!avatar.file) {
      toast.error("Please upload a profile picture.");
      return;
    }
    setLoading(true);
    const formdata = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formdata);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", res.user.uid);
      toast.success("User created successfully! You can Login now");

      const imgUrl = await upload(avatar.file);
      console.log("Image uploaded:", imgUrl);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        avatar: imgUrl,
        blocked: [],
      });
      console.log("User document set");

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });
      console.log("User chats document set");
      toast.success("User created successfully! You can Login now");

    } catch (err) {
      console.error("Error during registration:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.target);
    const { email, password } = Object.fromEntries(formdata);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat"); // Redirect to the chat page after successful login
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="Avatar" />
            Upload Profile Picture
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;