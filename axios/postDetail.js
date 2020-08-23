
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
        document.querySelector('#nickName').innerHTML = res.data[0].nickName;
        document.querySelector('#date').innerHTML = res.data[0].date;
        document.querySelector('#contents').innerHTML = res.data[0].contents;

    }).catch(err => {
        console.log(err);
    })
}

initPost();