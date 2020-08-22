const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.static('./'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/main.html");
})


app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.post('/server_login', (req, res) => {
    let userObj = {
        id: req.body.id,
        pwd: req.body.pwd
    }

    if (!fs.existsSync('users.json')) {
        res.send('회원가입된 정보가 없습니다.');
    }

    else {
        fs.readFile('users.json', 'utf8', function (err, data) {
            let flag = false;
            let jsonArray = JSON.parse(data);

            for (let idx = 0; idx < jsonArray.length; ++idx) {
                if (jsonArray[idx].id === userObj.id && jsonArray[idx].pwd === userObj.pwd) {
                    flag = true;
                    res.send(`${jsonArray[idx].nickName}`);
                }
            }

            if (!flag) {
                res.send('회원가입된 정보가 없습니다.');
            }

        })
    }
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/server_signup', (req, res) => {

    // 회원 정보
    let userObj = {
        nickName: req.body.nickName,
        id: req.body.id,
        pwd: req.body.pwd
    }

    // 파일이 존재하면
    if (fs.existsSync('users.json')) {
        fs.readFile('users.json', 'utf8', function (err, data) {
            let jsonArray = JSON.parse(data);
            // 아이디, 닉네임 중복검사

            if (jsonArray.filter(user => user.id == userObj.id).length > 0)
                res.send('중복된 아이디입니다!');

            else if (jsonArray.filter(user => user.nickName == userObj.nickName).length > 0)
                res.send('중복된 닉네임입니다!');

            else {
                jsonArray.push(userObj);
                const jsonObj = JSON.stringify(jsonArray);
                fs.writeFileSync('users.json', jsonObj);
                res.send(`${userObj.nickName}님 가입을 환영합니다.`);
            }


        })
    }

    // 존재하지 않으면 (최초)
    else {
        let jsonArray = new Array();
        jsonArray.push(userObj);

        const jsonObj = JSON.stringify(jsonArray);

        fs.writeFileSync('users.json', jsonObj)
        res.send(`${userObj.nickName}님 가입을 환영합니다.`);
    }

})

app.get('/post', (req, res) => {
    res.sendFile(__dirname + "/post.html")
})

app.get('/write', (req, res) => {
    res.sendFile(__dirname + "/write.html")
})

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

app.post('/server_write', (req, res) => {
    let postObj = {
        nickName: req.body.nickName,
        title: req.body.title,
        contents: req.body.contents
    }

    const date = new Date();

    postObj.guid = guid();
    postObj.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`


    if (fs.existsSync('posts.json')) {
        console.log('있어!');

        fs.readFile('posts.json', 'utf8', function (err, data) {
            let jsonArray = JSON.parse(data);

            jsonArray.push(postObj);
            const jsonObj = JSON.stringify(jsonArray);
            fs.writeFileSync('posts.json', jsonObj);

        })
    }

    // 게시글 최초 등록
    else {
        console.log('없어!');

        let jsonArray = new Array();
        jsonArray.push(postObj);

        const jsonObj = JSON.stringify(jsonArray);

        fs.writeFileSync('posts.json', jsonObj)
    }

    res.send('게시글이 등록되었습니다.');
})



app.listen(3000, () => {
    console.log('open server')
})