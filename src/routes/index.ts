import { error } from 'console';
import e, { Router } from 'express';

const Pageres = require('pageres');
import path from 'path';



// Init router and path
const router = Router();

// Add sub-routes
router.post('/screenshot', (req, res, next) => {
    const  url = req.body.url;    
    if(isValidUrl(url)){
        new Pageres({delay: 0})
		.src(url, ['1280x720'])
        .dest( path.join(__dirname,"..", 'public',"screenshots") )
        .run()
        .then( (body : any) => {
            return res.json({
                filename : body[0].filename,
                imageUrl: req.headers.host+"/screenshots/"+body[0].filename
            })
        })
        .catch((error:any) => {
            console.error(error);
            res.statusCode = 500;
            res.send("Error processing request")
        })
    }else {
        res.statusCode = 400;
        res.send("Invalid URL passed")
    }
    })
        
export function isValidUrl(url: string){
    let validUrl;
    try {
      validUrl = new URL(url);
    } catch (_) {
      return false;  
    }
  
    return validUrl.protocol === "http:" || validUrl.protocol === "https:";

}
// Export the base-router
export default router;
