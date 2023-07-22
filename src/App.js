import { Routes, Route } from 'react-router-dom';

import AddBlogScreen from "./screens/AddBlogScreen";
import AllBlogsScreen from "./screens/AllBlogsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SelectedBlogScreen from "./screens/SelectedBlogScreen";
import UserScreen from "./screens/UserScreen";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path={'/register'} element={<RegisterScreen/>}/>
      <Route path={'/login'} element={<LoginScreen/>}/>
      <Route path={'/user'} element={<UserScreen/>}/>
      <Route path={'/'} element={<AllBlogsScreen/>} exact/>
      <Route path={'/add'} element={<AddBlogScreen/>}/>
      <Route path={'/:id'} element={<SelectedBlogScreen/>}/>
      <Route path={'/update/:id'} element={<AddBlogScreen/>}/>
      <Route path={'*'} element={<RegisterScreen/>}/>
    </Routes>
  );
}

export default App;
