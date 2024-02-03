import csv
import requests
import time

# Specify CSV file path and target URL
csv_file = "./PassesList/free.csv"
target_url = "http://localhost:8000/manager/register"  # Replace with the actual URL
auth_bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cHBvcnQucGFyc2VjQGlpdGRoLmFjLmluIiwiaWF0IjoxNzA2OTA1OTU4LCJleHAiOjE3MDY5MDk1NTh9.nOGhETeJPIa9t9RGX8Fs8H9LfE8cBgYqx4VOCoyIiyE"

# Function to send a POST request for a single row of data
def send_post_request(row_data):
    headers = {"Content-Type": "application/json","Authorization": f"Bearer {auth_bearer_token}"}  # Adjust headers as needed
    # print(row_data)
    data = {"email": row_data['EmailAddress'], "full_name": row_data['Name'],"mobile_number":row_data["PhoneNumber"],"college_name":"IIT Dharwad"}
    response = requests.post(target_url, headers=headers, json=data)

    # Handle response (e.g., print status code, check for errors, extract data)
    print(response.status_code)
    if(response.status_code==200):
        time.sleep(10)
    

# Read CSV file and iterate through rows
with open(csv_file, 'r') as csvfile:
    reader = csv.DictReader(csvfile)  # Use DictReader for easier access by column names
    for row in reader:
        send_post_request(row)