import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import '../App.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MemberForm(props) {
    const [openPostcode, setOpenPostcode] = useState(false);
    const [myid, setMyid] = useState('');
    const [mypass, setMypass] = useState('');
    const [myaddress1, setMyaddress1] = useState('');
    const [myaddress2, setMyaddress2] = useState('');
    const [myname, setMyname] = useState('');
    const [btnok, setBtnok] = useState(false);

    const navi=useNavigate();

    const onSubmitEvent = (e) => {
        e.preventDefault();
        if (!btnok) {
            alert('중복확인을 먼저 하도록');
            return;
        }

        axios.post('/member/insert', { myname, myid, mypass, myaddress: `${myaddress1} ${myaddress2}` }) //key:value명이 같다면 하나로 쓸수있다
            .then(res => {
                alert('기합!');
                navi('/login');
            })
    }

    //중복확인 버튼 이벤트
    const btnJungbok = () => {
        axios.get('/member/searchid?myid='+myid)
        .then(res=>{
            if(Number(res.data)===1) {
                alert('다른 아이디를 사용하도록!');
                setBtnok(false);
                setMyid('');
            }
            else {
                alert('새끼... 기합!');
                setBtnok(true);
            }
        })
    }

    //dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setOpenPostcode(current => !current); //주소검색을 누르면 카카오지도검색도 뜨도록 넣어주기
    };

    const handleClose = () => {
        setOpen(false);
        setOpenPostcode(false); //dialog 닫힐때 지도도 꺼야하니 false
    };

    /**
     * handler
     */
    const handle = {
        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
                건물명 : ${data.buildingName}
            `)
            setMyaddress1(`${data.zonecode}${data.address},${data.buildingName}`) //주소 클릭시 값 address1에 저장
            setOpen(false); //주소 누르면 dialog 닫히도록
            setOpenPostcode(false); //주소 누르면 주소검색도 닫히도록
        },
    }

    return (
        <div>
            <form onSubmit={onSubmitEvent}>
                <table className='table' style={{ width: '500px' }}>
                    <caption align='top'><b>회원가입</b></caption>
                    <tbody>
                        <tr>
                            <th style={{ width: '100px', backgroundColor: '#b0e0e6' }}>이름</th>
                            <td>
                                <input type='text' className='form-control' placeholder='이름입력'
                                    required value={myname} onChange={(e) => { setMyname(e.target.value) }}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: '100px', backgroundColor: '#b0e0e6' }}>아이디</th>
                            <td className='input-group'>
                                <input type='text' className='form-control' placeholder='아이디'
                                    required value={myid} onChange={(e) => {
                                        setMyid(e.target.value)
                                        setBtnok(false);
                                    }}>
                                </input>
                                <button type='button' className='btn btn-outline-danger btn-sm'
                                    onClick={btnJungbok}>중복확인</button>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: '100px', backgroundColor: '#b0e0e6' }}>비밀번호</th>
                            <td>
                                <input type='password' className='form-control' style={{ width: '120px' }}
                                    required value={mypass} onChange={(e) => { setMypass(e.target.value) }}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: '100px', backgroundColor: '#b0e0e6' }}>주소</th>
                            <td>
                                <div className='input-group'>
                                    <input type='text' className='form-control' readonly
                                        required value={myaddress1} />
                                    <button type='button' className='btn btn-sm btn-outline-success'
                                        onClick={handleClickOpen}>주소검색</button>
                                </div>
                                <div>
                                    <input type='text' className='form-control'
                                        value={myaddress2} onChange={(e) => setMyaddress2(e.target.value)}
                                        placeholder='상세주소를 입력하도록' />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type='submit' className='btn btn-outline-info'
                                    style={{ width: '100px' }}>가입</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"우편번호 검색"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {openPostcode &&
                            <DaumPostcode
                                onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery='강남대로 94길 20' // 팝업을 열때 기본적으로 입력되는 검색어 
                            />}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MemberForm;