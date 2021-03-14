import * as express from 'express';
import verify from '../verifyToken';

const router = express.Router();
import db from '../initFirebase';
import {Follow} from '../Models/follow.model';
import * as uuid from 'uuid';
import { firestore } from 'firebase-admin';


const userRef = db.collection('users');
const followRef = db.collection('followRelations');

router.get("/:followId", verify, async (req, res) => {
    
    if(req.user.id === req.params.followId) {
        res.json({error : "cannot follow logged in user"});
    }
    const followRelation : Follow = {
        following : req.params.followId,
        follower : req.user.id,
        relationId : uuid.v4(),
        time : Date.now(),
    }

    console.log(followRelation.relationId);
    
    await followRef.doc(followRelation.relationId).set(followRelation)
    .catch(err => {res.send(err)});

    // increase following
    await userRef.doc(req.user.id).update({
        followings : firestore.FieldValue.increment(1)
    })

    await userRef.doc(req.params.followId).update({
        followers : firestore.FieldValue.increment(1)
    })

    res.json(followRelation);
})

export default router;  