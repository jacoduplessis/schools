import csv
import json

with open("schools.csv", 'r') as i, open("static/schools.json", 'w') as o:

    reader = csv.reader(i)
    schools = []
    for line in reader:
        emis, name, phase, province, ownership, lng, lat = line
        schools.append({
            "emis": emis,
            "name": name,
            "phase": phase,
            "province": province,
            "ownership": ownership,
            "lng": lng,
            "lat": lat,
        })

    o.write(json.dumps(schools))