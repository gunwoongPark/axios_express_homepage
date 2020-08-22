document.querySelector('#loginBtn').addEventListener('click', () => {

    if (document.querySelector('#id').value === "") {
        alert("아이디를 입력해주세요.");
    }

    else if (document.querySelector('#pwd').value === "") {
        alert('비밀번호를 입력해주세요.');
    }

    else {
        axios.post("http://localhost:3000/server_login", {
            id: document.querySelector('#id').value,
            pwd: document.querySelector('#pwd').value
        }).then(res => {
            if (res.data === "회원가입된 정보가 없습니다.") {
                alert(`${res.data}`);
                document.querySelector('#id').value = "";
                document.querySelector('#pwd').value = "";
            }
            else {
                alert(`${res.data}님 환영합니다!`);
                console.log(res);
                sessionStorage.setItem('nickName', res.data)
                location.href = "http://localhost:3000/main";
            }



        }).catch(err => {
            console.log(err);
        })
    }


})