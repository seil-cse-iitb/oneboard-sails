# importing the requests library 
import requests , json
  
# api-endpoint 
FETCH_URL = "http://10.129.149.33:1338/equipment"
ACTUATE_URL_ROOT = "http://10.129.149.33:1338/equipment/actuate/"
# defining a params dict for the parameters to be sent to the API 
PARAMS = {'location':7}  # this will change depending upon which location we are callibrating
HEADERS = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2VpbEBjc2UuaWl0Yi5hYy5pbiJ9LCJpYXQiOjE1NTUxNjEwNTAsImV4cCI6MTU4NjY5NzA1MH0.D_EnHNCKxwefyW9F3oKO4eDP3WKdJnX6nPF-V9dGp5w"}


def change_temp(AC_serial, temp_diff):
    PARAMS['serial']=AC_serial  # set the serial of the AC in param
    r = requests.get(url = FETCH_URL, params = PARAMS, headers= HEADERS) 
    data = r.json()
    id = data[0]["id"]
    data[0]["properties"]["state"]["temperature"] += temp_diff
    print ("Setting temperature of %d to %d"%(id, data[0]["properties"]["state"]["temperature"] ))
    data = {'msg':"T"+str(data[0]["properties"]["state"]["temperature"]), 'state':data[0]["properties"]["state"]}
    print(data) 
    r = requests.post(url = ACTUATE_URL_ROOT+str(id), headers= HEADERS, json=data) 


if __name__ =="__main__":
    change_temp("F1A",-5)
