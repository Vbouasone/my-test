import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>ໂປຟາຍຜູ້ໃຊ້ງານ</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                ສຳເລັດການອັບເດດໂປຟາຍ
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">ຊື່</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">ອີເມວ</label>
              <input
                id="email"
                type="email"
                placeholder="ໃສ່ອີເມວ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">ລະຫັດຜ່ານ</label>
              <input
                id="password"
                type="password"
                placeholder="ໃສ່ລະຫັດຜ່ານ"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            
            <div>
              <label htmlFor="confirmPassword">ຢືນຢັນລະຫັດຜ່ານ</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="ຢືນຢັນລະຫັດຜ່ານ"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {user.isSeller && (
              <>
                <h2>ຜູ້ຂາຍ</h2>
                <div>
                  <label htmlFor="sellerName">ຊື່ຜູ້ຂາຍ</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="ໃສ່ຊື່ຜູ້ຂາຍ"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">ໂລໂກ</label>
                  <input
                    id="sellerLogo"
                    type="text"
                    placeholder="ໃສ່ໂລໂກ"
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription">ຄຳອະທິບາຍກ່ຽວກັບຜູ້ຂາຍ</label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="ໃສ່່ຄຳອະທິບາຍ"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">
                ອັບເດດ
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}