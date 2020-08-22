
function initBtn() {
    document.querySelector('#registerBtn').addEventListener('click', () => {
        if (document.querySelector('#title').value === "")
            alert('제목을 입력해주세요.');

        else if (document.querySelector('#contents').value === "")
            alert('내용을 입력해주세요.');

        else {

            axios.post('http://localhost:3000/server_write', {
                nickName: sessionStorage.getItem('nickName'),
                title: document.querySelector('#title').value,
                contents: document.querySelector('#contents').value
            }).then(res => {
                if (res.data === "게시글이 등록되었습니다.") {
                    alert(`${res.data}`);
                    location.href = "http://localhost:3000/post";
                }

            }).catch(err => {
                console.log(err);
            })
        }

    })


}

initBtn();
