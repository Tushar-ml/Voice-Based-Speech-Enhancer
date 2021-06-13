window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const url = 'ws://localhost:3000'
const connection = new WebSocket(url)
connection.onopen = () =>{
    connection.send('Voice Connected');
}
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
let p = document.createElement('p');

function runSpeechRecognition(){
    

    
    const words = document.querySelector('.words');
    console.log(words);
    words.appendChild(p);

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        p.textContent = transcript;
        var res = transcript.split(" ");
        var res = res.join(" ");
        connection.send(res);
        connection.onmessage = function(e) {
            console.log("Received: '" + e.data + "'");
        };
        if (e.results[0].isFinal) {
            p.textContent = p.textContent + '\n';
           
            
            
            
            words.appendChild(p);
        }
    });

    

    recognition.start();
}

function stopSpeechRecognition(){
    
    recognition.stop();
    
}