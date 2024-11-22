import os
from . import user_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, FavoriteIdeas
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash
from flask import current_app
from flask_mail import Message
import requests
import datetime

CORS(user_bp)


@user_bp.route('/users', methods=['GET'])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]

    response_body['message'] = f'Lista de Usuarios'
    response_body['results'] = results
    return response_body, 200

@user_bp.route('/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    if not user:
        response_body['message'] = "Usuario no encontrado"
        return response_body, 404
    db.session.delete(user)
    db.session.commit()

    response_body['message'] = "Usuario eliminado con éxito"
    return response_body, 200


@user_bp.route('/login', methods=['POST'])
def login():
    response_body = {}
    data = request.json
    email = data.get('email', None)
    password = request.json.get('password', None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password)).scalar()
    if not user:
        response_body['message'] = f"Bad email or password"
        return response_body, 401
    access_token = create_access_token(identity = {'email': user.email, 'user_id': user.id})

    response_body['message'] = f'Hola de nuevo'
    response_body['access_token'] = access_token
    response_body['results'] = user.serialize()
    return response_body, 200

@user_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()
    response_body['logged_in_as'] = current_user
    return response_body, 200

@user_bp.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    row = Users(email = data.get("email"),
                first_name = data.get("first_name"),
                last_name = data.get("last_name"),
                password = data.get("password"),
                is_active = True,
                is_premium = False)
    
    db.session.add(row)
    db.session.commit()
    access_token = create_access_token(identity={'email': row.email, 'user_id': row.id})

    response_body['message'] = f"Bienvenido a mi app"
    response_body['access_token'] = access_token
    response_body['results'] = row.serialize()
    return response_body, 200

@user_bp.route('/request-password-reset', methods=['POST'])
def request_password_reset():
    data = request.json
    email = data.get('email')
    user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if not user:
        return jsonify({"message": "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña."}), 200

    reset_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(minutes=15))
    send_reset_email(user.email, reset_token)

    return jsonify({"message": "Se ha enviado un enlace para restablecer tu contraseña"}), 200

def send_reset_email(email, token):
    reset_url = f"https://sample-service-name-m09y.onrender.com/reset-password?token={token}"
    msg = Message(
        subject="Restablecimiento de Contraseña",
        recipients=[email],
        body=f"Para restablecer tu contraseña, haz clic en el siguiente enlace: {reset_url}"
    )
    with current_app.app_context():
        current_app.extensions['mail'].send(msg)

@user_bp.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    data = request.json
    new_password = data.get('password')
    user_id = get_jwt_identity()

    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    user.password = new_password
    db.session.commit()

    return jsonify({"message": "Contraseña actualizada con éxito"}), 200

@user_bp.route('/admin/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    response_body = {}
    data = request.json

    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()

    if not user:
        response_body['message'] = "Usuario no encontrado"
        return response_body, 404

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    db.session.commit()

    response_body['message'] = "Usuario actualizado con éxito"
    response_body['results'] = user.serialize()
    return response_body, 200