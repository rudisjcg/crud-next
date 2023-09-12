import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Item } from "@/models/Item";

export default async function handle(req, res) {
    await mongooseConnect();
    await isAdminRequest(req,res)
    const {method} = req;
    //mongoose.connect(clientPromise.url) you are creating a new connection

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Item.findOne({_id:req.query.id}))
        } else {
            res.json(await Item.find())
        }
    }
    
    if (method === 'POST') {
        const {name, description, images} = req.body;
        const productDoc = await Item.create({
            name,description,images
        })
        res.json(productDoc);
    }

    if (method === "PUT") {
        const {_id, name, description, images} = req.body;
        await Item.updateOne({_id},{
            name,description,images
        })
        res.json(true);
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            await Item.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
}