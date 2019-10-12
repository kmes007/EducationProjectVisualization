import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#set FLASK_ENV=development


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/performance.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)


#################################################
# Define Routes
#################################################

@app.route("/")
def index():
    """Return the homepage"""
    return render_template("index.html")

@app.route("/scores")
def scores():
    """Return scores data"""
    scores_df = pd.read_sql("SELECT * FROM scores", db.session.bind)
    return scores_df.to_json(orient="records")

@app.route("/retention")
def retention():
    """Return retention data"""
    retention_df = pd.read_sql("SELECT * FROM retention", db.session.bind)
    return retention_df.to_json(orient="records")

@app.route("/salary")
def salary():
    """Return salary data"""
    salary_df = pd.read_sql("SELECT * FROM salary", db.session.bind)
    return salary_df.to_json(orient="records")

@app.route("/budget")
def budget():
    """Return budget data"""
    budget_df = pd.read_sql("SELECT * FROM budget2", db.session.bind)
    return budget_df.to_json(orient="records")


if __name__ == "__main__":
    app.run(debug=True)

 
    
