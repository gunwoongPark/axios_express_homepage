function chkID() {
    var id = document.querySelector('#id').value;
    var num = id.search(/[0-9]/g);
    var eng = id.search(/[a-z]/ig);

    if (id.length < 8 || id.length > 20) {
        alert("아이디는 8자리 ~ 20자리 이내로 입력해주세요.");
        return false;
    } else if (id.search(/\s/) != -1) {
        alert("아이디는 공백 없이 입력해주세요.");
        return false;
    } else if (num < 0 || eng < 0) {
        alert("아이디는 영문,숫자를 혼합하여 입력해주세요.");
        return false;
    } else {
        console.log("통과");
        return true;
    }
}

function chkPW() {
    var pw = document.querySelector('#pwd').value;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/ig);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
        alert("비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.");
        return false;
    } else if (pw.search(/\s/) != -1) {
        alert("비밀번호는 공백 없이 입력해주세요.");
        return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
        alert("비밀번호는 영문,숫자, 특수문자를 혼합하여 입력해주세요.");
        return false;
    } else {
        console.log("통과");
        return true;
    }
}

function initBtn() {
    document.querySelector('#registerBtn').addEventListener('click', () => {

        if (document.querySelector('#id').value === "" || document.querySelector('#pwd').value === "" || document.querySelector('#pwdConfirm').value === "" || document.querySelector('#nickName') === "")
            alert('폼을 제대로 입력해주세요.');

        else if (!chkID());

        else if (!chkPW());

        else if (document.querySelector('#pwd').value !== document.querySelector('#pwdConfirm').value) {
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

                if (res.data === "중복된 닉네임입니다!") {
                    alert(`${res.data}`);
                }

                else {
                    alert(`${res.data}님 회원가입 축하드립니다.`);
                    location.href = "http://localhost:3000/login";
                }

            }).catch(err => {

                console.log(err);

            })

        }


    })
}

initBtn();
