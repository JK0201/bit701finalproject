import React from 'react';
import { NavLink } from 'react-router-dom';
import FBI from '../image/FBI.png';

function BoardRowList(props) {
    const { idx, no, row, currentPage } = props;
    const smallUrl1=process.env.REACT_APP_SMALL_BOARDURL1;
    const smallUrl2=process.env.REACT_APP_SMALL_BOARDURL2;

    return (
        <tr>
            <td>{no - idx}</td> {/* no(시작번호)에서 -idx를 해야 역순으로 출력된다 */}
            <td>
                <NavLink to={`/board/detail/${row.num}/${currentPage}`} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                {/*40x40 썸네일 이미지 나오게 하기(사진이 있을경우에만)*/}
                <img alt='' src={row.photo==null?FBI:`${smallUrl1}${row.photo}${smallUrl2}`} style={{width:'40px',height:'40px', outline:'2px solid gray'}}/>
                    <b>{row.subject}</b>     
                </NavLink>
            </td>
            <td>{row.myid}</td>
            <td>{row.writeday}</td>
            <td>{row.readcount}</td>
        </tr>
    );
}

export default BoardRowList;