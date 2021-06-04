window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

function runSpeechRecognition(){
    

    let p = document.createElement('p');
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
            words.appendChild(p);
        }
    });

    

    recognition.start();
}

function stopSpeechRecognition(){
    
    recognition.stop();
}