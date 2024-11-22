import os
from . import news_bp
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
from eventregistry import *
import requests

CORS(news_bp)

@news_bp.route('/news', methods=['GET'])
def news():
    response_body = {}
    er = EventRegistry(apiKey=os.getenv("NEWS_API_KEY"))   

    category = request.args.get('category', None)
    category_uri = er.getCategoryUri(category)
    q = QueryArticlesIter(
        categoryUri=category_uri,
        lang=["eng", "spa"],
        dataType=['news'],
        isDuplicateFilter="skipDuplicates"
    )

    articles = []
    seen_titles = set()
    for article in q.execQuery(er, sortBy="date", sortByAsc=False, maxItems=12):
        title = article.get("title")
        if article.get("image") and title not in seen_titles:
            articles.append({"title": title,
                            "url": article.get("url"),
                            "image": article.get("image"),
                            "date": article.get("date"),
                            "description": article.get("body", "")[:130],
                            "source": article.get("source", {}).get("title", "Unknown Source")})
            seen_titles.add(title)

    response_body['message'] = f"Lista de Noticias por Categoría"
    response_body['news'] = articles
    return jsonify(response_body), 200
