import React, { useEffect } from 'react';
import socket from '../../socket';

const Result = (props) => {
    const roomId = props.match.params.roomId;

    useEffect(() => {

        socket.on('FE-click-pop', ({ error }) => {
            if (!error) {

                props.history.push(`/result/${roomId}`);
            } else {
                console.log("result error");
            }
        });
    }, [props.history]);

    // 요청 보내기
    fetch('/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            document_id: 1  // MongoDB에서 가져온 회의 문서의 ID
        })
    })
        .then(response => response.json())
        .then(data => {
            // 요약 내용을 HTML 페이지에 표시
            document.getElementById('topic').innerText = data.topic_response;
            document.getElementById('current-date').innerText = data.current_date;
            document.getElementById('summary').innerText = data.full_summary;
        })
        .catch(error => {
            console.error('회의 요약을 가져오는 중 오류가 발생했습니다:', error);
        });


    // PDF 변환
    function convertToPDF() {
        // HTML 내용 선택
        var htmlContent = document.documentElement.outerHTML;

        // JSON으로 변환하여 서버에 전송
        fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ html: htmlContent })
        })
            .then(response => {
                // PDF 파일 다운로드
                response.blob().then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'output.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                });
            })
            .catch(error => console.error('PDF 변환 중 오류 발생:', error));
    }

    // PDF 변환 버튼에 클릭 이벤트 추가
    document.getElementById('convertToPDF').addEventListener('click', convertToPDF);

    return (
        <div>
            <h1>회의 요약</h1>
            <div>
                <h2>주제</h2>
                <p id="topic">주제</p>
            </div>
            <div>
                <h2>진행 시간</h2>
                <p id="duration">시간</p>
            </div>
            <div>
                <h2>현재 날짜</h2>
                <p id="current-date">현재 날짜</p>
            </div>
            <div>
                <h2>회의 내용 요약</h2>
                <p id="summary">회의 내용 요약 중...</p>
            </div>

            <button id="convertToPDF">PDF로 변환</button>
        </div>
    );
}

export default Result;