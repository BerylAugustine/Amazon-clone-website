import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { isAUthenticated } from './Login';
import { UserDetailsApi } from './login/Api';


function Header() {
    const navigate = useNavigate()
    const [{ basket, user }, dispatch] = useStateValue()
    const [users, setUser] = useState({ name: "", email: "", localId: "" })


    const handleClick_basket = () => {
        navigate("/checkout")
        console.log(basket, user)
    }
    const handleClick_logo = () => {
        navigate("/")
    }

    const logout = () => {
        localStorage.removeItem('idToken')
        navigate("/login")
    }

    useEffect(() => {
        if (isAUthenticated()) {
            UserDetailsApi().then((response) => {
                console.log(response)
                setUser({
                    name: response.data.users[0].displayName,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId,
                })
                console.log(response.data.users[0].displayName)
                console.log(users.name)
                console.log(users)
            })
        }
    }, [])

    return (
        <div className='header'>
            <img className='header_logo' src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" onClick={handleClick_logo} />
            <div className='header_search'>
                <input className='header_searchInput' type='text' />
                <SearchIcon className='header_searchIcon' />

            </div>
            <div className='header_nav'>
                <div className='header_option'>
                    <span className='header_optionLineOne'>Hello {!isAUthenticated ? "Guest" : users.email}</span>
                    <span className='header_optionLineTwo'>{isAUthenticated ? <a onClick={logout} style={{ cursor: "pointer" }} >Sign out</a> : <a onClick={navigate('/login')} style={{ cursor: "pointer" }} >Sign IN</a>}</span>
                </div>
                <div className='header_option'>
                    <span className='header_optionLineOne'>Returns</span>
                    <span className='header_optionLineTwo'>& Orders</span>
                </div>
                <div className='header_option'>
                    <span className='header_optionLineOne'>Your</span>
                    <span className='header_optionLineTwo'>Prime</span>
                </div>
                <div className='header_optionBasket'>
                    <ShoppingBasketIcon onClick={handleClick_basket} />
                    <span className='header_optionLineTwo header_basketCount'>{basket?.length}</span>

                </div>
            </div>



        </div>
    )
}

export default Header
