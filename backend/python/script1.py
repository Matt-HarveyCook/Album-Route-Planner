import sys
# sys.stdout.write(sys.argv[1])


import requests
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import csv
import requests
import math
import polyline
import json

pathLength = sys.argv[1]
xCord = sys.argv[2] # -2.2184748021853147
yCord = sys.argv[3] # 53.44295597961583

# body = {"coordinates":[[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]]}
body = {"coordinates":[[xCord, yCord]],
        "options":{"round_trip":{'length':pathLength,'points':10}},
        'instructions':'false'} 
# body = {"coordinates":[[8.681495,49.41461]],"options":{"round_trip":{'length':10000,'points':5}}} 

headers = {
    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
    'Authorization': '5b3ce3597851110001cf6248bc4ab3a7115842738fac089d0f9d7b32',
    'Content-Type': 'application/json; charset=utf-8'
}
call = requests.post('https://api.openrouteservice.org/v2/directions/foot-walking', json=body, headers=headers)

# call = {"bbox":[-2.257183,53.435548,-2.213977,53.459205],"routes":[{"summary":{"distance":11107.9,"duration":7997.6},"bbox":[-2.257183,53.435548,-2.213977,53.459205],"geometry":"oaeeIzhpL^@^ANAXCz@B\\DMnCPBNJLRXNGpAEFDPHBE|@?V?BE~@MnAn@VKjBQlDEp@HF\\VXRbBrArAbAvA`AfA|@xH`GvB`B~BfAb@R~@Jb@HgBfJxAbAxA`AgBbKe@?gAnHlAt@N^XhB^~BCb@YpBpCbBi@xCuArHId@UzAW~A~BtAw@zFy@~FaBaA[pBITkA|@sAx@oAy@g@dDKl@S??f@APgDBYBMNEIEIK@G@@JI?MBF|C}DTFbHJxEJjCb@zH[DsFNyGR@[qFPD`Hy@@kBFaDJDzFA~A@h@?H?t@@nA@xA?bADxB?f@@|A?`A?l@eBDi@@K?k@@I{BCe@My@CQ[oBG{@GoBuCFsBBuEJwELaBDqBBuABcA@gABQcDyA@Y[Uu@e@uBc@eCcCHE?q@@CsBB{@MGq@CeDE?gCAg@AyD@{CQ[EQGs@@SAKIMECMBCFMCQQq@K_@Dm@ZEGYMc@g@?C?q@?uB?uE@gB?s@gB@}BA_@A?c@WAh@cEtF@CeEL?rCkEt@BNU`@@FMJy@?sB@sD?a@T??qA?cA@mC@_B?_D@eG?qD@yD?aD?aD@_C?c@?mC?S@yC?cE@eDDyB?m@OwCCu@I_BGe@nAq@QkAKu@Ko@Mu@M}BAEWcE[eDmB\\aAZOF?GGGEOE[GCNaCBeCGcBCoAS{Bn@On@Ux@s@v@w@|BuCl@}@pBoDd@}@jAuB`AcBzA{ApByA|@zGlAmAf@w@JEJAv@LHCNQLY?a@HPVHHL@\\`@jA?RNDNM|B_C^[NlAnCvBR^f@b@f@RRCBI@Cj@LfED|D?A[xC}@jBk@x@_@@zC@`ABnA^h@PCBrAn@E@|@DnAAb@Ej@NBLBK|Al@LAVh@Ll@Nj@Ll@Lj@NNqCp@B","way_points":[0,302],"legs":[]}],"metadata":{"attribution":"openrouteservice.org | OpenStreetMap contributors","service":"routing","timestamp":1694177495849,"query":{"coordinates":[[-2.2184748021853147,53.44295597961583]],"profile":"foot-walking","format":"json","options":{"round_trip":{"length":10000.0,"points":5}}},"engine":{"version":"7.1.0","build_date":"2023-07-09T01:31:50Z","graph_date":"2023-08-27T21:37:09Z"}}}

# print(call.status_code, call.reason)
# print(call['routes'][0]['geometry'])
# print(call.keys())

call = call.text
call = json.loads(call)
# print(call)
encodedPoly = (call['routes'][0]['geometry'])

l = polyline.decode(encodedPoly)
coordinates = np.array(l)

# for el in coordinates:
#     el[0], el[1] = el[1], el[0]


wayPoints = []
numOfCoords = len(coordinates)
elementSpacing = numOfCoords // 10

# print(numOfCoords)
# print(elementSpacing)

for i in range(2, numOfCoords):
    if(i%elementSpacing == 0):
        wayPoints.append(coordinates[i].tolist())


# print("This number of points ",len(wayPoints))
# wayPoints.append(startPosition) # Adds the start point to the end to make it also the destination

# print('error ', wayPoints)
# print(type(wayPoints[0] ))

# urlLink = "https://www.google.com/maps/dir/?api=1&origin=" + wayPoints[0] + "&destination=" + wayPoints[len(wayPoints)-1] + "&waypoints="
# urlLink = "https://www.google.com/maps/dir/?api=1&origin=" + str(wayPoints[0])[1:-1] + "&destination=" + str(wayPoints[0])[1:-1] + "&waypoints="
urlLink = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBUL9hluDYWpUDOo2w3Gv7YuigFzt33TM8&origin=" + str(wayPoints[0])[1:-1] + "&destination=" + str(wayPoints[0])[1:-1] + "&waypoints="


# https://www.google.com/maps/embed/v1/directions?key=AIzaSyBUL9hluDYWpUDOo2w3Gv7YuigFzt33TM8&origin=53.44207,-2.22069&destination=53.44207,-2.22069&waypoints=53.44207,-2.22069|53.44324,-2.22623|53.44464,-2.22941|53.44514,-2.22626|53.44742,-2.22395|53.44666,-2.22452|53.4461,-2.2203|53.4445,-2.21689|53.44298,-2.21709|53.44296,-2.21854&travelmode=walking

# Adds each of the chosen nodes to the end of the URL
for i in range(len(wayPoints)):
  urlLink = urlLink + str(wayPoints[i])[1:-1] + "|" 
  
# Sets the default mode of transport
urlLink = urlLink[0:len(urlLink)-1] + "&mode=walking"
urlLink = urlLink.replace(' ', '')
print(urlLink)

# plt.show()
