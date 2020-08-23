
function initTable() {
    let table = document.querySelector('#postList');

    axios.get('http://localhost:3000/server_post').then(res => {
        if (res.data === "게시물이 존재하지 않습니다.")
            alert(`${res.data}`);
        else {
            let postList = document.querySelector('#postList');

            for (let idx = 0; idx < res.data.length; ++idx) {
                let tr = document.createElement('tr');

                tr.setAttribute('class', 'listRow');

                let number = document.createElement('td');
                let title = document.createElement('td');
                let nickName = document.createElement('td');
                let date = document.createElement('td');

                number.innerHTML = idx + 1;
                title.innerHTML = res.data[idx].title;
                nickName.innerHTML = res.data[idx].nickName;
                date.innerHTML = res.data[idx].date;

                tr.appendChild(number);
                tr.appendChild(title);
                tr.appendChild(nickName);
                tr.appendChild(date);

                tr.addEventListener('click', () => {
                    location.href = "http://localhost:3000/postDetail?id=" + res.data[idx].guid
                })

                table.appendChild(tr);
            }
        }
    }).catch(err => {
        console.log(err);
    })
}

initTable();

