# MySQL connection config for trading records
import mysql.connector

def get_mysql_connection():
    return mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password='sks1224',
        database='erp_hr',
        autocommit=True
    )
