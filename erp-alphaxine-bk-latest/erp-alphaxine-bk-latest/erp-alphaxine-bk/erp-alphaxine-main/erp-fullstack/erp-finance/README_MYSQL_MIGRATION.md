# MySQL Migration for Trading Records (Finance)

## 1. Create Tables in MySQL

Run the following script in your MySQL `erp_hr` database:

```
source trading_records_mysql.sql;
```

## 2. Initialize Tables from Python

Run:
```
python init_database_mysql.py
```

## 3. Use MySQL in Your Finance Logic

- Use `logic_mysql.py` as a template for all DB operations (insert, update, query) using MySQL.
- Update your main finance logic to use MySQL connection and methods.

## 4. Install Required Python Package

```
pip install mysql-connector-python
```

## 5. RBAC/Claims/Collections SQL

Run the following in your MySQL `erp_hr` database:

```
source ../../rbac_claims_collections_features.sql;
```

---

**Note:**
- All new trading/finance data will now be stored in MySQL, not SQLite.
- You can migrate old data from SQLite to MySQL if needed (let me know if you want a script for that).
