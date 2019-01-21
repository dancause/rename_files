import sqlite3
from datetime import datetime
import time

class Website:
    def __init__(self,number,link,date,status):
        self.number = number
        self.link = link
        self.date = date
        self.status = status

        def getnumber(self):
            return self.number

        def getlink(self):
            return self.link

        def getdate(self):
            return self.date

        def getstatus(self):
            return self.status

        def setnumber(self):
            return self.number

        def setlink(self):
            return self.link

        def setdate(self):
            return self.date

        def setstatus(self):
            return self.status


class Database:
    def __init__(self):
        self.connection = None

    def get_connection(self):
        if self.connection is None:
            self.connection = sqlite3.connect('db/cms_db.db')
        return self.connection

    def disconnect(self):
        if self.connection is not None:
            self.connection.close()

    def get_url(self):
        connection = self.get_connection()
        cursor = connection.cursor()
        cursor.execute("""select number, link, date, status from url""")
        listes = []
        for row in cursor:
            p = Website(row[0],row[1],row[2],row[3])
            listes.append(p)
        return listes

    def save_log(self,link,date,status):
        connection = self.get_connection()
        cursor = connection.cursor()
        cursor.execute(("""insert into log ( link, date, status ) values (?,?,?)"""),(link, date, status, ))
        connection.commit()

    def update_link(self,number,link,date,status):
        connection = self.get_connection()
        cursor = connection.cursor()
        cursor.execute(("""update url set link=?, date=?, status=? where number =?"""),(link, date, status, number, ))
        connection.commit()
        