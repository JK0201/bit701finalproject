import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import MemberRowList from './MemberRowList';

function MemberList(props) {
    const [mlist, setMlist] = useState([]);

    //목록 가져오는 함수
    useEffect(()=>{
        getList();
    },[]);
    
    const getList = () => {
        axios.get('/member/list')
            .then(res => setMlist(res.data));
    }

    const deleteMember = (num) => {
        axios.get('/member/delete?num=' + num)
            .then(res => {
                alert('삭제 완료 악!');
                //삭제후 목록 refresh
                getList();
            });
    }

    return (
        <div>
            <h4>총 회원수 : {mlist.length}명</h4>
            <table className='talbe talbe-bordered' style={{ width: '600px' }}>
                <tr style={{ backgroundColor: '#ddd' }}>
                    <th style={{ width: '40px' }}>번호</th>
                    <th style={{ width: '60px' }}>회원명</th>
                    <th style={{ width: '80px' }}>아이디</th>
                    <th style={{ width: '150px' }}>주소</th>
                    <th style={{ width: '100px' }}>가입일</th>
                    <th style={{ width: '50px' }}>삭제</th>
                </tr>
                <tbody>
                    {
                        mlist.map((item, idx) => <MemberRowList key={idx} item={item} idx={idx} onDelete={deleteMember}/>)
                    }
                </tbody>
            </table>

        </div>
    );
}

export default MemberList;