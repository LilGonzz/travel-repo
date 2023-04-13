import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import {router} from './routes'
import cors from 'cors'
import cron from 'node-cron';
import { TravelService } from './services/travelService';


const travelService = new TravelService();


const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
        error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'internal server error'
    })
});

cron.schedule('5 * * * *', () => {
    travelService.removeStopReplacedOrDeleted();
    console.log("paradas não utilizadas foram removidas") 
  });

cron.schedule('* * * * 1', () => {
  travelService.hardDeleteTravelInactive();
  console.log("viagens finalizadas ou canceladas foram removidas do banco") 
});


app.listen(3333, () => console.log("test your might"));