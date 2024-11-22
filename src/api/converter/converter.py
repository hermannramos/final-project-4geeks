import os
from . import converter_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, FavoriteIdeas
import requests

CORS(converter_bp)

@converter_bp.route('/converter', methods=['GET'])
def converter():
    response_body = {}
    api_key = os.getenv("CONVERTER_API_KEY")

    from_currency = request.args.get('from_currency')
    to_currency = request.args.get('to_currency')
    amount = request.args.get('amount')

    url = f"https://v6.exchangerate-api.com/v6/{api_key}/pair/{from_currency}/{to_currency}/{amount}"
    response = requests.get(url)
    data = response.json()

    response_body['message'] = f"Conversión Realizada:"
    response_body['results'] = {"base_code": data.get('base_code'),
                                "target_code": data.get('target_code'),
                                "conversion_rate": data.get('conversion_rate'),
                                "conversion_result": data.get('conversion_result')}

    return jsonify(response_body), 200
