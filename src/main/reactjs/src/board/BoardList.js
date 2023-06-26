import React, { useEffect, useState } from 'react';
import '../App.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BoardRowList from './BoardRowList';

function BoardList(props) {
    const [data, setData] = useState({});
    const navi = useNavigate();
    const { currentPage } = useParams(1);
    console.log({ currentPage });

    //페이징 처리에 필요한 데이타 가져오기
    const list = () => {
        const url = '/board/list?currentPage=' + (currentPage == null ? 1 : currentPage);
        axios.get(url)
            .then(res => {
                setData(res.data);
            });
    }

    useEffect(() => {
        list();
    }, [currentPage]); //currnetPage가 변경될때매다 호출

    const onWriteButtonEvent = () => {
        if (sessionStorage.loginok == null || sessionStorage.loginok === 'no') {
            alert('로그인을 하도록');
            navi('/login');
        } else {
            navi('/board/form');
        }
    }
    return (
        <div>
            <buton type='button' className='btn btn-outline-success'
                style={{ width: '100px', marginLeft: '100px' }} onClick={onWriteButtonEvent}>글쓰기</buton>
            <br /><br />
            <h1>총 {data.totalCount}개의 글이 있다 악!</h1>
            <table className='table table-bordered' style={{ width: '700px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#ddd' }}>
                        <th style={{ width: '40px' }}>번호</th>
                        <th style={{ width: '250px' }}>제목</th>
                        <th style={{ width: '70px' }}>작성자</th>
                        <th style={{ width: '100px' }}>작성일</th>
                        <th style={{ width: '50px' }}>조회</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.list && //비동기라 목록 출력시 서순 바뀌면 에러나서 이렇게 데이터가 있을때 호출되도록 넣어준다
                        data.list.map((row, idx) => <BoardRowList key={idx} row={row} no={data.no} idx={idx} currentPage={currentPage}/>)
                    }
                </tbody>
            </table>
            <div style={{ width: '800px', textAlign: 'center' }}>
                {/* 페이징 처리 */}
                {
                    //이전
                    data.startPage > 1 ?
                        <NavLink to={`/board/list/${data.startPage - 1}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                        >이전</NavLink> : ''
                }
                {
                    data.parr &&
                    data.parr.map((pno, i) =>
                        <NavLink to={`/board/list/${pno}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <b style={{
                                marginRight: '3px',
                                color: pno === Number(currentPage) || null ? 'red' : 'black'
                            }}>{pno}</b>
                        </NavLink>)
                }
                {
                    //다음
                    data.endPage < data.totalPage ?
                        <NavLink to={`/board/list/${data.endPage + 1}`}
                            style={{ textDecoration: 'none', color: 'black' }}>
                            다음</NavLink> : ''
                }
            </div>
        </div >
    );
}

export default BoardList;