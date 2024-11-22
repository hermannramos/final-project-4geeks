from flask import Blueprint

ideas_bp = Blueprint('ideas', __name__)

from . import ideas