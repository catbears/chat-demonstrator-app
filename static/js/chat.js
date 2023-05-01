function displayMessage(message, className, delay) {
    const messageContent = $('<div>').addClass('message-content').text('');
    const messageDiv = $('<div>').addClass('chat-message').append(messageContent);
    const avatarDiv = $('<div>').addClass('avatar ' + className + '-avatar');
    const usernameDiv = $('<div>').addClass('username').text(className);
    const avatarWrapper = $('<div>').addClass('avatar-wrapper').append(avatarDiv, usernameDiv);
    const fullWidthDiv = $('<div>').addClass('full-width ' + className).append(avatarWrapper, messageDiv);
    const typing_speed = 50;

    setTimeout(function() {
        $('#chat-container').append(fullWidthDiv);

        let characters = message.split('');

        $.each(characters, function (i, char) {
            setTimeout(function () {
                messageContent.append(char);
            }, i * typing_speed);
        });
    }, delay);
}

function processDialog(dialog) {
    const lines = dialog.split('\n');
    let delay = 0;
    let typing_speed = 50;

    lines.forEach(line => {
        let className = '';

        if (line.startsWith('Sebastian:')) {
            className = 'sebastian';
            line = line.replace('Sebastian:', '').trim();
        } else if (line.startsWith('ChatBob:')) {
            className = 'chatbob';
            line = line.replace('ChatBob:', '').trim();
        } else if (line.startsWith('System:')) {
            className = 'system';
            line = line.replace('System:', '').trim();
        }

        displayMessage(line, className, delay);
        delay += line.length * typing_speed + 1000; // Add additional delay between messages
    });
}

$(document).ready(function() {
    $.get('/dialog', processDialog);
});
