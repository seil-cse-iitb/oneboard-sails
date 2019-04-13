# importing the requests library 
import requests , json
  
# api-endpoint 
URL = "http://10.129.149.33:1338/equipment?location=7"

# defining a params dict for the parameters to be sent to the API 
PARAMS = {'location':7}  # this will change depending upon which location we are callibrating
HEADERS = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2VpbEBjc2UuaWl0Yi5hYy5pbiJ9LCJpYXQiOjE1NTUxNjEwNTAsImV4cCI6MTU4NjY5NzA1MH0.D_EnHNCKxwefyW9F3oKO4eDP3WKdJnX6nPF-V9dGp5w"}

# sending get request and saving the response as response object 
r = requests.get(url = URL, params = PARAMS, headers= HEADERS) 
  
# extracting data in json format 
data = r.json() 
f = open("dump.json",'w')
f.write(json.dumps(data, indent=4))
f.close()
print (json.dumps(data, indent=4))