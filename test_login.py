import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'daypi_project.settings')
django.setup()

import sys
sys.path.append(os.getcwd())

from django.test import Client
c = Client()
resp1 = c.post('/api/register', {'name': 'Test10', 'email': 'test10@ucu.edu.ua', 'course': '1', 'faculty': 'Law', 'password': 'password123'}, content_type='application/json')
print('Register:', resp1.status_code, resp1.content)

import base64
auth = base64.b64encode(b'test10@ucu.edu.ua:password123').decode()
resp2 = c.post('/api/login', {'email': 'test10@ucu.edu.ua', 'password': 'password123'}, content_type='application/json', HTTP_AUTHORIZATION=f'Basic {auth}')
print('Login:', resp2.status_code, resp2.content)
