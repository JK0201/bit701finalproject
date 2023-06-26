import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BoardForm(props) {
    const [subject, setSubject] = useState('');
    const [photo, setPhoto] = useState('');
    const [content, setContent] = useState('');

    const navi = useNavigate();

    //이미지 경로 
    const photoUrl = process.env.REACT_APP_BOARDURL;

    //세션 스토리지에 저장된 아이디와 이름 가져오기
    const myid = sessionStorage.myid;
    const myname = sessionStorage.myname;

    const onSubmitEvent = (e) => {
        e.preventDefault()
        axios.post('/board/insert',{myid,myname,subject,content})
        .then(res=>{
            alert('저장 완료');
            navi(`/board/list/${1}`);
        });
    }

    //사진 업로드
    const onUploadEvent = (e) => {
        const uploadFile=new FormData();
        uploadFile.append('upload',e.target.files[0]);

        axios({
            method:'post',
            url:'/board/upload',
            data: uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>setPhoto(res.data));
    }
    return (
        <div style={{ marginLeft: '100px', width: '400px' }}>
            <form onSubmit={onSubmitEvent}>
                <table className='table'>
                    <caption align='top'><b>게시판 글쓰기</b></caption>
                    <tr>
                        <th style={{ backgroundColor: '#ddd', width: '100px' }}>제목</th>
                        <td>
                            <input type='text' className='form-control' required
                                onChange={(e) => { setSubject(e.target.value) }} value={subject}></input>
                        </td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor: '#ddd', width: '100px' }}>사진</th>
                        <input type='file' className='form-control' onChange={onUploadEvent}></input>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor: '#ddd', width: '100px' }}>내용</th>
                        <textarea className='form-control' required value={content}
                        onChange={(e)=>setContent(e.target.value)}></textarea>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type='submit' className='btn btn-outline-info'
                            style={{width:'100px'}}>저장</button>
                        </td>
                    </tr>
                </table>
            </form>
            <img alt='' src={`${photoUrl}${photo}`} 
            style={{width:'200px', position:'absolute', left:'250px', top:'400px'}}/>
        </div>
    );
}

export default BoardForm;