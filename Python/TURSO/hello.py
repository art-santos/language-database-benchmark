from flask import Flask
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import select
from flask import jsonify
from models import Item

# import OS
import os

app = Flask(__name__)


load_dotenv()

# Get environment variables
TURSO_DATABASE_URL = os.environ.get("TURSO_DATABASE_URL")
TURSO_AUTH_TOKEN = os.environ.get("TURSO_AUTH_TOKEN")

# construct special SQLAlchemy URL
dbUrl = f"sqlite+{TURSO_DATABASE_URL}/?authToken={TURSO_AUTH_TOKEN}&secure=true"

engine = create_engine(dbUrl, connect_args={'check_same_thread': False}, echo=True)
def hello():
    return 'Hello, World!'

@app.route("/get", methods=(["GET"]))
def get():
    print("Hello, World!")
    print(TURSO_AUTH_TOKEN)
    print(TURSO_DATABASE_URL)
    session = Session(engine)

    # get & print items
    stmt = select(Item)

    for item in session.scalars(stmt):
        print(item)
        items = [item.__dict__ for item in session.query(Item).all()]
        return str(items)
        
@app.route('/')
def index():
    return 'Index Page'
