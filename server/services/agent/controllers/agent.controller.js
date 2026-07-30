import { graph } from "../graphs/graph"


export const agent = async(req, res)=>{
    try {
        const {prompt, converstationId} = req.body

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            converstationId, 
            role: 'user', 
            content: prompt
        })

        const result = await graph.invoke()

    } catch (error) {
        
    }
}