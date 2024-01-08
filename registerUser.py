import csv
import requests

# Specify CSV file path and target URL
csv_file = "./PassesList/all.csv"
target_url = "http://localhost:8000/manager/register"  # Replace with the actual URL
auth_bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cHBvcnQucGFyc2VjQGlpdGRoLmFjLmluIiwiaWF0IjoxNzA0NzQ1NDc1LCJleHAiOjE3MDQ3NDkwNzV9.oRxlG0bxA7A9JbQHS9uZ8vEYIXaBvvXh8pIe_Ig9t5o"

# Function to send a POST request for a single row of data
# def send_post_request(row_data):
#     headers = {"Content-Type": "application/json","Authorization": f"Bearer {auth_bearer_token}"}  # Adjust headers as needed
#     data = {"email": row_data['Email_Address'], "full_name": row_data['Name'],}
#     response = requests.post(target_url, headers=headers, json=data)

#     # Handle response (e.g., print status code, check for errors, extract data)
#     print(response.status_code)

# Read CSV file and iterate through rows
with open(csv_file, 'r') as csvfile:
    reader = csv.DictReader(csvfile)  # Use DictReader for easier access by column names
    for row in reader:
        print(row['Email_Address'],end=',')