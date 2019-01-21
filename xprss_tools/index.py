# coding: utf8
# TOOLS XPRSSCOM (nom provisoir) en attente d'une meilleur idée

import requests
import courriel
from  pathlib import Path
import os

from datetime import datetime
from flask import g
from flask import json
from flask import Flask

from flask import session
from flask import jsonify
from flask import url_for
from flask import request
from flask import Response
from flask import make_response
from flask import redirect
from functools import wraps
from database import Database
from database2 import Database2
from database import Website
from flask import render_template


app = Flask(__name__, static_url_path="", static_folder="static")
UPLOAD_FOLDER = 'static/images'
DELETE_FOLDER = 'images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DELETE_FOLDER'] = DELETE_FOLDER

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database

def get_db2():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database2()
    return g._database

@app.route('/')
def start_page():
    return render_template('temp_liste_server.html',web=validate_status())
    
@app.route('/getlist')
def getlist():
    fichiers = []
    files = os.listdir('static/images')
    for name in files:
        fichiers.append({'name':name})
    return render_template('temp_list_file.html',fichiers=fichiers)

@app.route('/getnewname', methods=['POST','GET'])
def saveName():
    if request.method =="POST":
        path = "static/images"
        res = request.json
        newfilename = getFormFichierNom(res)
        newfilename = doublon(newfilename)
        os.rename(os.path.join(path,res["hidden_name_file"]), os.path.join(path,newfilename))
        return render_template('ligne_new_name.html',name=newfilename)

@app.route('/getjson')
def getfilejson():
    fichiers = []
    files = os.listdir('static/images')
    for name in files:
        fichiers.append({'name':name})
    return render_template('temp_list_photo.html',photos=fichiers)

@app.route('/getlogoMarchands')
def getlogoMarchands():
    return render_template('temp_list_file.html',fichiers=fichiers)

def validate_status():
    traitment_link()
    return get_list_link()

def validate_url(link):
    temp_code = 0
    try:
        r = requests.head(link)
        temp_code = r.status_code
    except Exception as value:
        temp_code = 500
    return temp_code

def send_courriel(link):
    if len(link) == 0:
        print "vide"
    else:
        print "plein"
    pass

def date_now():
    return datetime.now().strftime("%d-%m-%Y %H:%M:%S")

def update_link(link,now,code):
    if link.status <> code:
        print "code "+ str(code)+" link status" + str(link.status)
        get_db().update_link(link.number,link.link, now,code)

def traitment_link():
    liste = get_list_link()
    error = []
    for link in liste:
        code = validate_url(link.link)
        now = date_now()
        if code >= 500:
            get_db().save_log(link.link,now,code)
            p = Website(link.number, link.link,now, code)
            error.append(p)
        update_link(link,now,code)
    send_courriel(error)

def get_list_link():
    return get_db().get_url()

def get_liste_fichier():
    fichiers = []
    files = os.listdir('static/images')
    for name in files:
        fichiers.append({'name':name})
    return fichiers
    
def getFormFichierNom(res):
    file, extension = res['hidden_name_file'].split('.')
    newfilename = res['oldnamefile']
    pagination = res['pagination']
    zone = res['zone']
    if zone == 'x' or zone == 'X':
        temp = ''
    else:
        temp = '_'+zone
    return newfilename+"_"+pagination+temp+"."+extension


def changeNameFile(old,new):
    os.rename(old, new)

def doublon(new):
    files = os.listdir('static/images')
    for name in files:
        if name == new:
            print 'same name'
            print name
            print new
            a,b  = new.split('.')
            new = a+'(1)'+'.'+b
            print new
    return new

