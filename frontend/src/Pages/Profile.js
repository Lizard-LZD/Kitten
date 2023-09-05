import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserProfiles,
  updateUserProfile,
  deleteUserProfile,
} from "../Redux/Reducers/ProfileSlice";

import { logoutUser } from "../Redux/Reducers/LoginSlice";

const UserProfilePage = ({
  userProfiles,
  userProfile,
  currentUser, // 当前登录用户的信息
  loading,
  getUserProfile,
  getUserProfiles,
  updateUserProfile,
  deleteUserProfile,
  logoutUser,
}) => {
  useEffect(() => {
    getUserProfiles();
    // 加载当前用户的profile
    getUserProfile(currentUser);
  }, [userProfiles, currentUser]);

  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState(""); // 搜索框的输入
  const [searchResults, setSearchResults] = useState([]); // 搜索结果
  const [showResults, setShowResults] = useState(false); // 控制是否显示搜索结果

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log(query);
    setSearchName(query);

    if (query.length > 0) {
      // 执行搜索并更新搜索结果
      console.log(userProfiles);
      const results = userProfiles.filter((profile) =>
        profile.user.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(results.length > 0);
    } else {
      // 清空搜索结果
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleUpdateProfile = () => {
    // 更新当前用户的profile
    updateUserProfile({
      _id: currentUser, // 传递用户的ID以进行更新
      name: name || userProfile.user.name, // 保留用户名
      // 添加其他字段
    });
  };

  const handleDeleteProfile = () => {
    // 删除当前用户的profile
    deleteUserProfile(currentUser);
    // 执行额外的操作
    logoutUser();
  };

  return (
    <div>
      <h1>User Profile</h1>
      {/* 用户可以查看自己的profile */}
      {userProfile ? (
        <div>
          <h2>Your Profile</h2>
          <form>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder={userProfile.user.name}
                // readOnly
              />
            </div>
            {/* 添加其他输入字段 */}
          </form>
          <button onClick={handleUpdateProfile}>Update Profile</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      ) : (
        <h2>Add a kitten to create profile</h2>
      )}

      {/* 搜索框 */}
      <h2>Search Profiles</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchName}
        onChange={handleSearchChange}
      />

      {/* 显示搜索结果 */}
      {showResults && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((profile) => (
              <ProfileCard profile={profile} key={profile._id} />
            ))}
          </ul>
        </div>
      )}

      {loading && <p>Loading user profiles...</p>}
    </div>
  );
};

const ProfileCard = ({ profile }) => {
  const [showKittens, setShowKittens] = useState(false);
  return (
    <li key={profile._id}>
      <p>{profile.user.name}</p>
      {showKittens && (
        <ui>
          {profile.kittens.map((kitten) => (
            <li>{kitten.breed}</li>
          ))}
        </ui>
      )}
      <button
        onClick={() => {
          setShowKittens(!showKittens);
        }}
      >
        {showKittens ? "Cancel show" : "Show kittens"}
      </button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  userProfiles: state.profile.userProfiles,
  userProfile: state.profile.userProfile,
  currentUser: state.login.currentUser,
  loading: state.profile.loading,
});

const mapDispatchToProps = {
  getUserProfile,
  getUserProfiles,
  updateUserProfile,
  deleteUserProfile,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
