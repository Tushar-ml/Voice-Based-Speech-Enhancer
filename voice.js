window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const url = 'ws://localhost:8080'
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

        // const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
        p.textContent = transcript;

        if (e.results[0].isFinal) {
            p.textContent = p.textContent + '\n';
           
            connection.send(p.textContent);
            
            
            words.appendChild(p);
        }
    });

    

    recognition.start();
}

function stopSpeechRecognition(){
    
    recognition.stop();
    connection.send(p.textContent);
}