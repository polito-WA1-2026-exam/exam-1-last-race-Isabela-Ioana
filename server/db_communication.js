
import crypto from 'crypto'
import sqlite from 'sqlite3'



function checkUserPassword(email, password){
    return new Promise((resolve, reject) => {
         const db = new sqlite.Database("database.db", (err) => {
            if (err){return reject(err);}
         })
        
        const query = "SELECT * FROM users where email = ?"
        
        // FIX 1: Folosim 'rows' la plural în callback-ul db.all
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


export default checkUserPassword;