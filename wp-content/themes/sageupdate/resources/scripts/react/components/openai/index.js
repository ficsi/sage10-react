import axios from 'axios';

// Function to send a message to the Perplexity API
export const sendMessage = async (message) => {
  const apiKey = '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'; // Replace with your actual API key
  const url = 'https://api.perplexity.ai/chat/completions';

  try {
    const response = await axios.post(
      url,
      {
        model: 'llama-3.1-sonar-small-128k-online', // Use Perplexity's supported model
        messages: [
          { role: 'user', content: message }, // User message
        ],
        max_tokens: 1024, // Optional: Limit the number of tokens in the response
        temperature: 0.7, // Optional: Adjust randomness of the response
        top_p: 0.9, // Optional: Adjust nucleus sampling
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Add your API key here
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the assistant's response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with Perplexity:', error.response?.data || error.message);
    return 'Sorry, I encountered an error.';
  }
};
