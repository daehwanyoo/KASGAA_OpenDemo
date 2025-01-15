from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

# MySQL Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'my_user'
app.config['MYSQL_PASSWORD'] = 'my_password'
app.config['MYSQL_DB'] = 'my_project'

mysql = MySQL(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    print("Incoming JSON data:", data)  # Debugging

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    subscription = data.get('subscription', False) 

    if not first_name or not last_name or not email or not password:
        return jsonify({'message': 'All fields are required!'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO users (first_name, last_name, email, password, subscription)
            VALUES (%s, %s, %s, %s)
        """, (first_name, last_name, email, hashed_password, subscription))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'User registered successfully!'})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'User already exists or another error occurred!'}), 400

@app.route('/login', methods=['POST'])
def login():
    print("Login endpoint hit")
    if not request.is_json:
        print("Invalid JSON request")
        return jsonify({'message': 'Invalid JSON format'}), 400
    
    data = request.json
    print("Received login data:", data)

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        print("Missing email or password")
        return jsonify({'message': 'Email and password are required'}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT password, first_name FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
            print("Login successful for user:", email)
            return jsonify({'message': 'Login successful!', 'firstName': user[1]})
        else:
            print("Invalid credentials for user:", email)
            return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({'message': 'An unexpected error occurred'}), 500

@app.route('/profile', methods=['GET'])
def get_profile():
    email = request.args.get('email')  # Get the user's email from the query string
    if not email:
        return jsonify({'message': 'Email is required'}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT first_name, last_name, email, subscription, profile_image
            FROM users WHERE email = %s
        """, (email,))
        user = cur.fetchone()
        cur.close()

        if not user:
            return jsonify({'message': 'User not found'}), 404

        user_data = {
            'firstName': user[0],
            'lastName': user[1],
            'email': user[2],
            'subscription': bool(user[3]),
            'profileImage': user[4]
        }
        return jsonify(user_data)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'An error occurred'}), 500

@app.route('/profile', methods=['PUT'])
def update_profile():
    data = request.json
    email = data.get('email')
    new_email = data.get('newEmail', email)
    password = data.get('password')
    subscription = data.get('subscription')
    profile_image = data.get('profileImage')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    try:
        cur = mysql.connection.cursor()
        updates = []
        values = []

        if new_email:
            updates.append("email = %s")
            values.append(new_email)
        if password:
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            updates.append("password = %s")
            values.append(hashed_password)
        if subscription is not None:
            updates.append("subscription = %s")
            values.append(subscription)
        if profile_image:
            updates.append("profile_image = %s")
            values.append(profile_image)

        if not updates:
            return jsonify({'message': 'No fields to update'}), 400

        values.append(email)  # Add email for the WHERE clause
        cur.execute(f"UPDATE users SET {', '.join(updates)} WHERE email = %s", values)
        mysql.connection.commit()
        cur.close()

        return jsonify({'message': 'Profile updated successfully!'})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'An error occurred'}), 500

@app.route('/events', methods=['GET'])
def get_events():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, date, title, time, location, description, image FROM events")
        rows = cur.fetchall()
        cur.close()

        events = [
            {
                "id": row[0],
                "date": row[1].strftime('%Y-%m-%d'),  # Convert date to YYYY-MM-DD
                "title": row[2],
                "time": row[3],
                "location": row[4],
                "description": row[5],
                "image": row[6],
            }
            for row in rows
        ]

        print("Fetched events from database:", events)  # Debug log
        return jsonify(events)
    except Exception as e:
        print(f"Error fetching events: {e}")
        return jsonify({"message": "An error occurred while fetching events"}), 500

@app.route('/events', methods=['POST'])
def add_event():
    data = request.json
    title = data.get('title')
    date = data.get('date')
    time = data.get('time')
    location = data.get('location')
    description = data.get('description')
    image_path = data.get('image')

    if not title or not date:
        return jsonify({'message': 'Title and date are required'}), 400

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO Events (title, date, time, location, description, image_path)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (title, date, time, location, description, image_path))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Event added successfully'})
    except Exception as e:
        print(f"Error adding event: {e}")
        return jsonify({'message': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)

#mysql -u my_user -p