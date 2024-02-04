const router = require("express").Router();
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: "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" // This is also the default, can be omitted
});


router.post("/ask-chatgpt", async (req, res) => {
    try {
    //   const { prompt } = req.body;
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Hello!"}],
      });
      console.log(chatCompletion.choices[0].message);
      
  
      return res.status(200).json({
        success: true,
        data: response.data.choices[0].text,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.response
          ? error.response.data
          : "There was an issue on the server",
      });
    }
  });
  
    


module.exports = router;