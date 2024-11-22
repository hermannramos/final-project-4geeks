import os
import json
from . import payments_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import CORS
from api.models import db, Users
import stripe


CORS(payments_bp)

@payments_bp.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    response_body = {}
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    session = stripe.checkout.Session.create(
    payment_method_types=['card'],
    line_items=[{
        "price": "price_1QJExsFqOpeg6LLmvpo41vRL",
        "quantity": 1,
    }],
    mode="subscription",
    success_url="https://sample-service-name-m09y.onrender.com/dashboard",
    cancel_url="https://sample-service-name-m09y.onrender.com/")

    response_body['message'] = f"Pago exitoso"
    response_body['url'] = session.url
    return jsonify(response_body), 200

@payments_bp.route('/webhook', methods=['POST'])
def stripe_webhook():
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    payload = request.get_data(as_text=True)

    try:
        event = json.loads(payload)
    except ValueError as e:
        print("Invalid payload", e)
        return jsonify({'error': 'Invalid payload'}), 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        user_email = session['customer_details']['email']
        user = Users.query.filter_by(email=user_email).first()
        if user:
            user.is_premium = True
            db.session.commit()
            print(f"Usuario {user_email} actualizado a premium")

    return jsonify({'status': 'success'}), 200

@payments_bp.route('/user-status', methods=['GET'])
@jwt_required()
def user_status():
    current_user = get_jwt_identity()
    user = Users.query.filter_by(id=current_user['user_id']).first()
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    return jsonify({"is_premium": user.is_premium}), 200
