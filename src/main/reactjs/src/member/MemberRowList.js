import React from 'react';

function MemberRowList(props) {
    const { item, idx, onDelete } = props;

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{item.myname}</td>
            <td>{item.myid}</td>
            <td>{item.myaddress}</td>
            <td>{item.gaipday}</td>
            <td>
                <button type='button' className='btn btn-sm btn-outline-danger'
                    onClick={() => {
                        const b = window.confirm('삭제를 원하면 확인을 누르도록');
                        if (b) {
                            onDelete(item.num);
                        }
                    }}>삭제</button>
            </td>
        </tr>
    );
}

export default MemberRowList;