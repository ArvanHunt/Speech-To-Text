document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const transcriptDiv = document.getElementById('transcript');
    const micSymbol = document.getElementById('mic-symbol');
    let recognition;

    // Check if the browser supports the Web Speech API
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            transcriptDiv.innerHTML = '•';
            micSymbol.style.display = 'block';
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            transcriptDiv.innerHTML = finalTranscript + '<i>' + interimTranscript + '</i>';
        };

        recognition.onerror = (event) => {
            transcriptDiv.innerHTML = 'Error occurred in recognition: ' + event.error;
            micSymbol.style.display = 'none';
        };

        // Remove the message from the recognition.onend event handler
        recognition.onend = () => {
            if (transcriptDiv.innerHTML === '•') {
                transcriptDiv.innerHTML = '';
            }
            micSymbol.style.display = 'none';
        };
    } else {
        transcriptDiv.innerHTML = 'Your browser does not support the Web Speech API. Please try a different browser.';
    }

    startBtn.addEventListener('click', () => {
        if (recognition) {
            recognition.start();
        }
    });

    stopBtn.addEventListener('click', () => {
        if (recognition) {
            recognition.stop();
        }
    });
});
