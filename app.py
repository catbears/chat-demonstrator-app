from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


@app.route('/')
def chat():
    return render_template('chat.html')


@app.route('/dialog')
def dialog():
    return send_from_directory('static', 'dialog.txt')


if __name__ == '__main__':
    app.run(debug=True)
