window.onload = () => {
    document.getElementById("btn").onclick = processText;
    localStorage.setItem('id','boostcamp');
    localStorage.setItem('pw','boostcamp');
    //document.getElementById("i_result").innerHTML = result;
};

let STATE = 0;

function removeText() {
    const inputElment = document.getElementById("textarea");
    inputElment.value = '';
}


function processText() {
    const newMsg = document.createElement('div');
    newMsg.setAttribute("class", "user_msg");
    const txtBox = document.getElementById("textarea"); 
    const lines = txtBox.value.split("\n");
    const resultString = lines.reduce((prev, curr) => {
        return prev + curr + "<br />";
    }, '')  
    newMsg.innerHTML = (STATE === 2) ? '*'.repeat(txtBox.value.length) : resultString;
    document.getElementsByClassName("chat")[0].appendChild(newMsg);
    removeText();
    if (STATE === 0 || STATE === 3) new_chatbot_msg(resultString);
    else if (STATE === 1 || STATE === 2) login_chat(resultString);
}

function matchString(str) {
    if (str.match(/회원/) || str.match(/가입/)) return 'join';
    else if (str.match(/로그인/)) return 'login';
    else if (str.match(/사용법/) || str.match(/사용/) || str.match(/뭐/)  ) return 'menu';
    else if (str.match(/친구/) || str.match(/추천/) ) return 'friend';
    else return 'wrong';
}

function new_chatbot_msg(str){
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class","chatbot_msg");

    const type = matchString(str);
    switch(type){
        case 'menu':
            newDiv.innerHTML = "회원가입, 로그인, 친구 찾기를 할 수 있습니다.";
            break;
        case 'join':
            newDiv.innerHTML = "버튼을 누르면 회원가입 페이지로 넘어갑니다. ";
            const joinBtn = document.createElement('button');
            joinBtn.setAttribute("class", "join_btn");
            joinBtn.appendChild(document.createTextNode("회원가입"));
            joinBtn.addEventListener('click', function(e) {
                location.href='../join';
            });
            newDiv.appendChild(joinBtn);                
            break;
        case 'login':
            newDiv.innerHTML = "로그인을 진행합니다.<br>아이디를 입력해주세요.";
            STATE = 1;
            break;
        case 'friend' :
            if (STATE !== 3) {
                newDiv.innerHTML = "친구추천 기능은 로그인이 필요합니다.<br>아이디를 입력해주세요.";
                STATE = 1;
            } else {
                newDiv.innerHTML = "버튼을 누르면 친구추천 페이지로 이동합니다. ";
                const friendBtn = document.createElement('button');
                friendBtn.setAttribute("class", "join_btn");
                friendBtn.appendChild(document.createTextNode("친구추천"));
                friendBtn.addEventListener('click', function(e) {
                    location.href='../FriendReco/FriendReco.html';
                });
                newDiv.appendChild(friendBtn); 
            }
            break;
        case 'wrong' :
        default:
            newDiv.innerHTML = '부캠봇이 알아들을 수 없어요.<br>다시 입력해주세요.'
    }
    document.getElementsByClassName("chat")[0].appendChild(newDiv);
}

function login_chat(resultString) {
    resultString = resultString.substring(0,resultString.length-6)
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class","chatbot_msg");
    if (STATE === 1) {
        const idOnStorage = localStorage.getItem('id');
        localStorage.setItem('tmpId',resultString);
        if (idOnStorage === resultString){
            STATE = 2;
            return login_chat_msg(1,idOnStorage);
        }else{
            STATE = 1;
            return login_chat_msg(3);
        }
    } else if (STATE === 2) {
        const pwOnStorage = localStorage.getItem('pw');
        if(pwOnStorage !== resultString ){
            return login_chat_msg(4);
        }
        return login_chat_msg(2);
    }
}

function login_chat_msg(state) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute("class","chatbot_msg");

    switch(state){
        case 1:
            newDiv.innerHTML = "비밀번호를 입력하세요";            
            break;
        case 2:
            newDiv.innerHTML = "로그인이 완료되었습니다.";
            STATE = 3;
            break;
        case 3: 
            newDiv.innerHTML = '존재하지 않는 아이디입니다.<br>다시 입력해주세요';
            STATE = 1;
            break;
        case 4: 
            newDiv.innerHTML = '잘못된 비밀번호입니다.<br>다시 입력해주세요';
            STATE = 2;
    }
    document.getElementsByClassName("chat")[0].appendChild(newDiv);
}