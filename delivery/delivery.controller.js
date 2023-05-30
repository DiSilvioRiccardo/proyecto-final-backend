import Delivery from "./delivery.model";

export async function createDelivery(req,res) {
    const { product } = req.body;
    if (!product) {
        res.status(400).send("All input is required");
    }

    const delivery = Delivery({
        owner: req.user._id,
        product: product
      });
 
    await delivery.save();

    res.status(200).json(delivery);
}

export async function getDelivery(req,res) {
    const { id } = req.query;

    if (!(id)) {
      res.status(400).send("Id in query is required");
    }

    const delivery = await Delivery.findOne({owner: req.user._id, _id: id});
    
    if (delivery){
        res.status(200).json(delivery);
    }else{
        res.status(404).json({"error": "delivery not found"});
    }

}


export async function getDeliveriesBulk(req, res){
    //Dates must be in format yyyy-mm-dd
    let before = req.query.before;
    let after = req.query.after;
    let query = {};
    query.owner = req.user._id;
    if (before && after){
        before = new Date(before);
        after = new Date(after);
        query.updatedAt = { $gte: after, $lt: before }
    }

    const deliveries = await Delivery.find(query);
    return res.status(200).json(deliveries);
}

export async function patchDelivery(req, res){
    const {rating, comments} = req.body;
    if (!rating && !comments){
        return res.status(400).json({"error": "must include one or more of fields rating and comments"});
    }

    let body = {};
    if (rating){
        body.rating = rating;
    }
    
    if (comments){
        body.comments = comments;
    }
    
    let resultado = await Delivery.updateOne({_id: req.body.id, owner: req.user._id}, body);
    if (resultado.matchedCount === 1){
        return res.status(200).json(await Delivery.findById(req.body.id));
    }else{
        return res.status(404).json({"error": "product not found"});
    }
} 