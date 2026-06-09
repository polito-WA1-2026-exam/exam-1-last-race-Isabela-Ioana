
import crypto from 'crypto'
import sqlite from 'sqlite3'



function checkUserPassword(email, password){
    return new Promise((resolve, reject) => {
         const db = new sqlite.Database("database.db", (err) => {
            if (err){return reject(err);}
         })
        
        const query = "SELECT * FROM users where email = ?"
        
        
        db.all(query, [email], (err, rows) => {
            db.close()
            
            if (err){
                return reject(err)
            }
            if (rows.length === 0){
                return resolve(false)
            }
            else {
                const actualRow = rows[0]
                const user = { id: actualRow.id, email: actualRow.email, name: actualRow.name, surname: actualRow.surname }
                
                crypto.scrypt(password, actualRow.salt, 64, function(err, hashed_password) {
                    if (err) return reject(err);
                    
                    if (!crypto.timingSafeEqual(Buffer.from(actualRow.hashed_password, "hex"), hashed_password))
                        resolve(false);
                    else
                        resolve(user);
                });
            }
        }) 
    })
}


function generateGameStations(stations, connections) {
    

    //Adjancency list to know who is who's neighbour
    const adjacencyList = {};
    stations.forEach(s => adjacencyList[s.id] = []);
    
    connections.forEach(conn => {
        const s1 = conn.id_start_station; 
        const s2 = conn.id_end_station;
        
        if (adjacencyList[s1]) adjacencyList[s1].push(s2);
        if (adjacencyList[s2]) adjacencyList[s2].push(s1);
    });

    //console.log(adjacencyList)

    const startIndex = Math.floor(Math.random() * stations.length);
    const startStation = stations[startIndex];

    const distances = {}; 
    const queue = [startStation.id];
    
    stations.forEach(s => distances[s.id] = -1);
    distances[startStation.id] = 0;

    while (queue.length > 0) {
        const currentId = queue.shift();
        const currentDistance = distances[currentId];

        const neighbors = adjacencyList[currentId] || [];
        for (const neighborId of neighbors) {
            if (distances[neighborId] === -1) { 
                distances[neighborId] = currentDistance + 1;
                queue.push(neighborId);
            }
        }
    }

    const validEndStations = stations.filter(s => distances[s.id] >= 4);


    const endIndex = Math.floor(Math.random() * validEndStations.length);
    const endStation = validEndStations[endIndex];

    return {
        startStation,
        endStation
    };
}


export {checkUserPassword,generateGameStations};