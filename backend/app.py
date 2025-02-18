import os
import smtplib
from flask import Flask, jsonify, request
from flask_cors import CORS
from email.message import EmailMessage

app = Flask(__name__)
CORS(app, resources={r"/contact": {"origins": "*"}}) 

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'a_secure_default_key')
user_email = 'Dummyemail@gmail.com '
receiving_email = 'DummyEmail@gmail.com'
user_password = 'dummy dummy dummy'

@app.route('/contact', methods=['POST'])
def contact():
    receiving_email_address = receiving_email

    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')

    app.logger.info(f"Received form data:\nName: {name}\nEmail: {email}\nsubject: {subject}\nmessage: {message}")

    try:
        msg = EmailMessage()
        msg.set_content(f"From: {name}\nEmail: {email}\nsubject: {subject}\nmessage: {message}")

        msg['Subject'] = f"New contact form submission: {subject}"
        msg['From'] = email
        msg['To'] = receiving_email_address

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(user_email,user_password)
            server.send_message(msg)

        return jsonify({'name': name, 'email': email, 'subject': subject, 'message': message})

    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'message': 'Error sending email'}), 500