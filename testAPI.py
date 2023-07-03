import requests
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import csv
import requests
import math

url = "https://graphhopper.com/api/1/route"

# API uses weird value for walking distance so required weird calc
walkingTime = 40
walkingDistance = (walkingTime / 14)*1156

query = {
  "profile": "foot",
  "point": ["53.44297, -2.21854"],
  #"point_hint": "string",
  #"snap_prevention": "string",
  #"curbside": "any",
  "locale": "en",
  #"elevation": "false",
  #"details": "string",
  #"optimize": "false",
  "instructions": "true",
  "calc_points": "true",
  #"debug": "false",
  "points_encoded": "false",
  "ch.disable": "true",
  "heading": "0",
  "heading_penalty": "120",
  "pass_through": "false",
  "algorithm": "round_trip",
  "round_trip.distance": walkingDistance,
  "round_trip.seed": "17386447",
  "alternative_route.max_paths": "2",
  "alternative_route.max_weight_factor": "1.4",
  "alternative_route.max_share_factor": "0.6",
  "key": "42d1f1da-fd6a-4245-b42f-21b9a12f0c57"
}

# Excecuctes the call to the API
# response = requests.get(url, params=query)
# data = response.json()

coordinates = [[-2.218536, 53.44297], [-2.218455, 53.443787], [-2.218371, 53.444124], [-2.218216, 53.444564], [-2.218107, 53.445005], [-2.218122, 53.445082], [-2.21796, 53.446049], [-2.218134, 53.446461], [-2.219593, 53.445986], [-2.219866, 53.445941], [-2.220329, 53.445826], [-2.220563, 53.445692], [-2.221082, 53.445556], [-2.22154, 53.445468], [-2.221973, 53.445307], [-2.222136, 53.445144], [-2.221773, 53.44513], [-2.219801, 53.444743], [-2.219873, 53.444521], [-2.218881, 53.4444], [-2.219245, 53.443293], [-2.218515, 53.443213], [-2.218536, 53.44297]] 
# coordinates = data["paths"][0]["points"]["coordinates"]
# coordinates = [[-2.218536, 53.44297], [-2.218455, 53.443787], [-2.218371, 53.444124], [-2.218216, 53.444564], [-2.218107, 53.445005], [-2.218122, 53.445082], [-2.21796, 53.446049], [-2.218248, 53.4467], [-2.21755, 53.446757], [-2.215811, 53.446854], [-2.215784, 53.448802], [-2.215709, 53.449019], [-2.215782, 53.449051], [-2.215804, 53.449148], [-2.215704, 53.449348], [-2.215522, 53.449551], [-2.216092, 53.450084], [-2.217128, 53.450812], [-2.216397, 53.450942], [-2.217399, 53.45224], [-2.21774, 53.452644], [-2.218026, 53.452602], [-2.218135, 53.452749], [-2.218496, 53.453008], [-2.218428, 53.453149], [-2.218415, 53.453346], [-2.218428, 53.453149], [-2.218496, 53.453008], [-2.218596, 53.452954], [-2.218906, 53.452912], [-2.218743, 53.452445], [-2.218064, 53.451578], [-2.218375, 53.451499], [-2.217693, 53.450657], [-2.220779, 53.449835], [-2.220528, 53.449515], [-2.220376, 53.449254], [-2.220804, 53.449181], [-2.220784, 53.449139], [-2.221127, 53.449081], [-2.221572, 53.448975], [-2.222018, 53.448824], [-2.22251, 53.448631], [-2.222841, 53.448469], [-2.223194, 53.448255], [-2.223515, 53.448007], [-2.223782, 53.447719], [-2.223921, 53.447501], [-2.223984, 53.447162], [-2.224141, 53.446585], [-2.224149, 53.446413], [-2.224224, 53.446156], [-2.224269, 53.446025], [-2.224201, 53.446006], [-2.224184, 53.445971], [-2.22425, 53.44543], [-2.224219, 53.445376], [-2.223869, 53.44531], [-2.222136, 53.445144], [-2.221773, 53.44513], [-2.219801, 53.444743], [-2.219873, 53.444521], [-2.218881, 53.4444], [-2.219245, 53.443293], [-2.218515, 53.443213], [-2.218536, 53.44297]]

# Writes the coordinates to a CSV file which can be read
f = open('cordTest.csv', 'w')
writer = csv.writer(f)
writer.writerow(["longitude","latitude"])
for i in range(len(coordinates)):
  writer.writerow(coordinates[i])
f.close()

# Reads the file using pandas and determines the max and min points from the route
df = pd.read_csv("cordTest.csv")
BBox = df.longitude.min(), df.longitude.max(),df.latitude.min(), df.latitude.max()


# Stores important existing points from the route
listLength = len(coordinates)
startPoint = str(coordinates[0][1])+","+str(coordinates[0][0])
wayPoints = []
maxLat = None
minLat = None
maxLong = None
minLong = None

# Calculates the max and min points and checks they are not the start or end point
for i in range(len(coordinates)-1):
  value = coordinates[i]
  currentValue = str(coordinates[i][1])+","+str(coordinates[i][0])
  if currentValue == startPoint:
    continue
  elif value[1] == BBox[3]:
    maxLat = currentValue
  elif value[1] == BBox[2]:
    minLat = currentValue
  elif value[0] == BBox[1]:
    maxLong = currentValue
  elif value[0] == BBox[0]:
    minLong = currentValue

# Iterates through all the points and calculates the angle for all corners
for i in range (len(coordinates)-1):
  currentValue = str(coordinates[i][1])+","+str(coordinates[i][0])

  if i == 0:
    wayPoints.append(currentValue)
    startPosition = currentValue
  elif currentValue == maxLat or currentValue == minLat or currentValue == maxLong or currentValue == minLong:
    wayPoints.append(currentValue)
  else:
    # Prevents index error and calculates the angle by turning coords into triangle
    if i < len(coordinates)-2:
      point1 = [coordinates[i][1], coordinates[i][0]]
      point2 = [coordinates[i+1][1], coordinates[i+1][0]]
      point3 = [coordinates[i+2][1], coordinates[i+2][0]]
      lengtha = math.sqrt((point2[0]-point1[0])**2 + (point2[1]-point1[1])**2)
      lengthb = math.sqrt((point3[0]-point2[0])**2 + (point3[1]-point2[1])**2)
      lengthc = math.sqrt((point3[0]-point1[0])**2 + (point3[1]-point1[1])**2)
      anglec = (lengthb**2 + lengtha**2 - lengthc**2) / (2 * lengthb * lengtha)

      minimumDistance = walkingDistance / 7000000 # Minimum distance between nodes. 7000000 is rough value from trial error

      # Ensures the angle is between 10-80, ensures the nodes are far enough apart to prevent clusters
      if (math.degrees(math.acos(anglec))) < 80 \
      and (math.degrees(math.acos(anglec))) > 10 \
      and lengtha>minimumDistance \
      and lengthc>minimumDistance:
        wayPoints.append(str(point2[0])+","+str(point2[1]))


print("This number of points ",len(wayPoints))
wayPoints.append(startPosition) # Adds the start point to the end to make it also the destination

urlLink = "https://www.google.com/maps/dir/?api=1&origin=" + wayPoints[0] + "&destination=" + wayPoints[len(wayPoints)-1] + "&waypoints="

# Adds each of the chosen nodes to the end of the URL
for i in range(len(wayPoints)-2):
  urlLink = urlLink + wayPoints[i+1] + "|" 
  
# Sets the default mode of transport
urlLink = urlLink[0:len(urlLink)-1] + "&travelmode=walking"
print(urlLink)

# plt.show()