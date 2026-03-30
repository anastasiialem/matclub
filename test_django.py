import urllib.request
import json
import base64

try:
    data = json.dumps({'name': 'Test21', 'email': 'test21@ucu.edu.ua', 'course': '1', 'faculty': 'Law', 'password': 'password123'}).encode('utf-8')
    req = urllib.request.Request('http://127.0.0.1:8000/api/register', data=data, method='POST', headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as response:
        print('Register:', response.status, response.read().decode())
        
    auth = base64.b64encode(b'test21@ucu.edu.ua:password123').decode()
    login_data = json.dumps({'email': 'test21@ucu.edu.ua', 'password': 'password123'}).encode('utf-8')
    req2 = urllib.request.Request('http://127.0.0.1:8000/api/login', data=login_data, method='POST', headers={'Content-Type': 'application/json', 'Authorization': f'Basic {auth}'})
    with urllib.request.urlopen(req2) as response:
        print('Login:', response.status, response.read().decode())
except Exception as e:
    print('Failed:', getattr(e, 'code', None), getattr(e, 'reason', None), getattr(e, 'read', lambda: lambda: b'')()().decode())
