import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

function Menu(props) {
    const loginok = sessionStorage.loginok;
    const myname = sessionStorage.myname;
    const myid = sessionStorage.myid;

    const logoutStyle = {
        width: '300px',
        backgroundColor: 'darkcyan',
        color: 'white',
        cursor: 'pointer'
    }

    const loginStyle = {
        width: '100px',
        color: 'white'
    }

    const logoutBtn = () => {
        sessionStorage.loginok = 'no';
        sessionStorage.myname = '';
        sessionStorage.myid = '';
        window.location.reload();
    }
    return (
        <div>
            <ul className='menu'>
                <li>
                    <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={'/member/form'}>회원가입</NavLink>
                </li>
                <li>
                    <NavLink to={'/member/list'}>회원목록</NavLink>
                </li>
                <li>
                    <NavLink to={'/board/list/1'}>게시판</NavLink>
                </li>
                <li style={loginok === 'yes' ? logoutStyle : loginStyle}>
                    {
                        <>
                            {loginok === 'yes' ? <b onClick={logoutBtn}>로그아웃</b> :
                                <NavLink to={'/login'}><b>로그인</b></NavLink>}
                            {myname !== '' && myid !== '' ?
                                <span style={{ color: 'yellow', }}>{myname}({myid})님</span> : ''}
                        </>
                    }
                </li>
            </ul>
        </div>
    );
}

export default Menu;