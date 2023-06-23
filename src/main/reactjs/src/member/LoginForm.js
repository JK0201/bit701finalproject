import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm(props) {
    const [myid, setMyid] = useState('');
    const [mypass, setMypass] = useState('');
    const navi = useNavigate();

    //submit 이벤트
    const onSubmitLogin = (e) => {

        e.preventDefault();
        
        axios.get('/member/login?myid=' + myid + '&mypass=' + mypass)
            .then(res => {
                if (res.data.success === 'yes') {
                    /*
                        localStorage:직접 지우기전에는 브라우저에 남아있음
                        sessionStorage: 브라우저 닫으면 지워짐
                    */
                    alert(res.data.myname + '해병님 환영합니다');
                    sessionStorage.loginok = 'yes';
                    sessionStorage.myname = res.data.myname;
                    sessionStorage.myid = myid;
                    
                    navi('/');
                    window.location.reload();
                } else {
                    alert('누구냐 너? 새끼.. 기열!');
                    sessionStorage.loginok = 'no';
                    sessionStorage.myname = '';
                    sessionStorage.myid = '';
                }
            })
    }

    return (
        <div>
            <form onSubmit={onSubmitLogin}>
                <table className='table' style={{ width: '500px' }}>
                    <caption align='top'>
                        <b>로그인</b>
                    </caption>
                    <tbody>
                        <tr>
                            <th style={{ width: '100px', backgroundColor: '#b0e0e6' }}>아이디</th>
                            <td>
                                <input type='text' className='form-control'
                                    placeholder='아이디' required
                                    value={myid} autoFocus
                                    onChange={(e) => setMyid(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: '100px', backgroundColor: '#b0e0e6' }}>비밀번호</th>
                            <td>
                                <input type='password' className='form-control'
                                    retuired value={mypass} onChange={(e) => setMypass(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type='submit' className='form-control'>로그인</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default LoginForm;