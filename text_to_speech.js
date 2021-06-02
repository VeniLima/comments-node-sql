const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({ apikey: '<yBv2AR6Pa7p8Fy3QnUAH9HzDqGWsyQsEwCeM7fZ55YKp>' }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com'
});

const params = {
  text: 'Ola Vinicius',
  voice: 'pt-BR_IsabelaVoice', // Optional voice
  accept: 'audio/wav'
};
textToSpeech
  .synthesize(params)
  .then(response => {
    const audio = response.result;
    return textToSpeech.repairWavHeaderStream(audio);
  })
  .then(repairedFile => {
    fs.writeFileSync('audio.wav', repairedFile);
    console.log('audio.wav written with a corrected wav header');
  })
  .catch(err => {
    console.log(err);
  });