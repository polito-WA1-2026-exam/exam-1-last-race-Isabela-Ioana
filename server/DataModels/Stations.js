import sqlite from 'sqlite3'

function Stations(id, name, coordX, coordY, lineColor, lineName){
    this.id = id;
    this.name = name;
    this.coordX = coordX;
    this.coordY = coordY;
    this.lineColor = lineColor;
    this.lineName = lineName;
}


function myStations(){
    this.my_stations=[]

    
    this.retrieveStations= function (){
        return new Promise((resolve,reject)=>{
            const db= new sqlite.Database("database.db",(err)=>{
                if(err) return reject(err);
        }
        )

        const query=`SELECT id, name, x_coordinate AS coordX, y_coordinate AS coordY 
            FROM stations`

        db.all(query, (err,rows)=>{
            db.close()
            if(err){
                console.log(err)
                return reject(err)
            }
            else{
                console.log(rows)
                resolve(rows)
            }
            
        })
    })
        
    }



    this.retrieveConnections= function(){
         return new Promise((resolve,reject)=>{
            const db= new sqlite.Database("database.db",(err)=>{
                if(err) return reject(err);
        }
        )

        const query=`SELECT 
                c.id,
                c.line_id AS lineId,
                l.color AS lineColor,
                l.name AS lineName,
                s1.x_coordinate AS x1,
                s1.y_coordinate AS y1,
                s2.x_coordinate AS x2,
                s2.y_coordinate AS y2
            FROM connections c
            JOIN lines l ON c.line_id = l.id
            JOIN stations s1 ON c.id_start_station = s1.id
            JOIN stations s2 ON c.id_end_station = s2.id`

        db.all(query, (err,rows)=>{
            db.close()
            if(err){
                console.log(err)
                return reject(err)
            }
            else{
                console.log(rows)
                resolve(rows)
            }
            
        })
    })
    }
}



export {Stations, myStations}