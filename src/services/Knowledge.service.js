const Knowledge = require('../models/Knowledge.model')

exports.createKnowledgeAsync = async body => {
    try {       
        const newKnowledge = new Knowledge(body);
        await newKnowledge.save();
        return {
            message: "Successfully create a Knowledge",
            success: true,
            data: newKnowledge
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'An error occurred',
            success: false
        };
    }
}

exports.updateKnowledgeAsync = async body => {
    try {
        console.log(body.id)
        const knowledge = await Knowledge.findOneAndUpdate(
            { _id: body.id },
            body,
            {
                new: true
            }
        )
        if(knowledge == null){
            return {
                message: "This knowledge was not found'",
                success: false,
                data: []
            } 
        }
        return {
            message: "Successfully update a knowledge",
            success: true,
            data: knowledge
        }
    } catch (error) {
        console.log(error);
        return {
            message: 'An error occurred',
            success: false
        };
    }
}

exports.getKnowledgeAllAsync = async body => {
    try {
        const { skip, limit } = body;

        const knowledge = await Knowledge.find().sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        return {
            message: 'Successfully Get All Knowledge',
            success: true,
            data: knowledge
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getOneKnowledAsync = async body => {
    try {
        const { id } = body;

        const knowledge = await Knowledge.findOne({_id: id})
        knowledge.view = knowledge.view + 1
        await knowledge.save()
        if(knowledge == null)
        {
            return {
                message: 'This knowledge was not found',
                success: false,
                data: []
            };
        }
        return {
            message: 'Successfully Get One knowledge',
            success: true,
            data: knowledge
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};