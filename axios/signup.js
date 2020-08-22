function initBtn() {
    document.querySelector('#registerBtn').addEventListener('click', () => {

        if (document.querySelector('#pwd').value !== document.querySelector('#pwdConfirm').value) {
            alert('비밀번호가 다릅니다.');
            document.querySelector('#pwd').value = "";
            document.querySelector('#pwdConfirm').value = "";
        }

        else {
            axios.post('http://localhost:3000/server_signup', {
                id: document.querySelector('#id').value,
                pwd: document.querySelector('#pwd').value,
                pwdConfirm: document.querySelector('#pwdConfirm').value,
                nickName: document.querySelector('#nickName').value
            }).then(res => {

                if (res.data === "중복된 아이디입니다!") {
                    alert(`${res.data}`);
                }

                else if (res.data === "중복된 닉네임입니다!") {
                    alert(`${res.data}`);
                }

                else {
                    alert(`${res.data}님 회원가입 축하드립니다.`);
                    location.href = "http://localhost:3000/";
                }

            }).catch(err => {

                console.log(err);

            })

        }


    })
}

initBtn();
