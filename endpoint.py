from flask import Flask, request

app = Flask(__name__)

@app.route('/ask', methods=['GET', 'POST'])
def welcome():
    print(request.data)
    return "Hello World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)