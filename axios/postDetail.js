
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initPost() {
    const guid = getParameterByName('id')

    axios.get(`http://localhost:3000/postDetail/${guid}`).then(res => {
        document.querySelector('#title').innerHTML = res.data[0].title;
        document.querySelector('#nickName').innerHTML = `작성자 : ${res.data[0].nickName}`;
        document.querySelector('#date').innerHTML = `작성일 : ${res.data[0].date}`;
        document.querySelector('#contents').innerHTML = res.data[0].contents;

        if (sessionStorage.getItem('nickName') !== res.data[0].nickName)
            document.querySelector('#deleteBtn').style.display = "none";

        else {
            document.querySelector('#deleteBtn').addEventListener('click', () => {

                axios.delete(`http://localhost:3000/delete/${guid}`).then(res => {
                    if (res.data === "게시물이 삭제되었습니다.") {
                        alert(`${res.data}`);
                        location.href = "http://localhost:3000/post";
                    }
                }).catch(err => {
                    console.log(err);
                })

            })
        }

    }).catch(err => {
        console.log(err);
    })
}

initPost();