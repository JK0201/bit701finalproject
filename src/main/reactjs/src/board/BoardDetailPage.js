import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function BoardDetailPage(props) {
    const { num, currentPage } = useParams();

    const [data, setData] = useState({});

    const navi=useNavigate();

    const detailBoard = () => {
        axios.get(`/board/detail/${num}`)
            .then(res => {
                setData(res.data);
            });
    }

    useEffect(() => {
        detailBoard();
    }, []);


    const onDeleteEvent=()=>{
        axios.delete('/board/delete?num='+num)
        .then(res=>{
            alert('삭제 완료');
            navi(`/board/list/${currentPage}`);
        });
    }

    const photoUrl = process.env.REACT_APP_BOARDURL;
    const myid = sessionStorage.myid;
    const loginok = sessionStorage.loginok;

    return (
        <div>
            <table className='table table-bordered' style={{ width: '500px' }}>
                <tbody>
                    <tr>
                        <th style={{ width: '100px' }}>제목</th>
                        <td>{data.subject}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{data.myname}({data.myid && data.myid.slice(0,1)+'*'.repeat(2)})</td> {/* 비동기라서 에러나니까 data.myid가 값이 true일 경우 &&써주기*/}
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{data.readcount}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <pre>{data.content}</pre>
                            <br/>
                            <img alt='' src={data.photo!=null?`${photoUrl}${data.photo}`:''}/>
                        </td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>{data.writeday}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                        <button type='button' className='btn btn-outline-info'
                        onClick={()=>navi(`/board/list/${currentPage}`)}>목록</button>
                        <button type='button' className='btn btn-outline-success'
                        onClick={()=>navi(`/board/form`)}>글쓰기</button>
                        {
                            loginok!=null && myid===data.myid?
                            <button type='button' className='btn btn-outline-danger'
                            onClick={onDeleteEvent}>삭제</button>
                            :''
                        }
                        {
                            loginok!=null && myid===data.myid?
                            <button type='button' className='btn btn-outline-secondary'
                            onClick={()=>{}}>수정</button>
                            :''
                        }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BoardDetailPage;