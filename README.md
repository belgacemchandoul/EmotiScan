<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EmotiScan - Emotion and Sentiment Analysis Tool</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 20px;
        }

        h1, h2, h3 {
            color: #003366;
        }

        h1 {
            font-size: 2.5em;
        }

        h2 {
            font-size: 1.8em;
        }

        h3 {
            font-size: 1.4em;
        }

        p {
            margin-bottom: 1.5em;
        }

        code {
            background-color: #f4f4f4;
            padding: 5px;
            font-family: "Courier New", Courier, monospace;
        }

        .code-block {
            background-color: #f4f4f4;
            padding: 10px;
            border-left: 4px solid #003366;
            margin-bottom: 1.5em;
        }

        ul {
            list-style-type: disc;
            margin-left: 20px;
        }

        .btn {
            display: inline-block;
            background-color: #003366;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }

        .btn:hover {
            background-color: #005599;
        }
    </style>
</head>
<body>

    <h1>EmotiScan - Emotion and Sentiment Analysis Tool</h1>

    <p>EmotiScan is a web-based application designed to analyze the emotions and sentiments of any text or social media content. Utilizing powerful machine learning models, this tool allows users to extract insights from text data by detecting the emotional tone and sentiment breakdown (positive, negative, or neutral) from comments, reviews, or any input text.</p>

    <h2>Features</h2>

    <ul>
        <li><strong>Emotion Detection</strong>: Detects various emotions (e.g., joy, sadness, anger) from the input text using advanced AI models.</li>
        <li><strong>Sentiment Analysis</strong>: Provides a sentiment score breakdown (positive, negative, and neutral) to understand the overall tone of the text.</li>
        <li><strong>Visualized Results</strong>: Data is presented with easy-to-understand visualizations, including pie charts for emotion distribution and bar charts for sentiment breakdown.</li>
        <li><strong>Interactive UI</strong>: Clean, modern UI built using ReactJS, Framer Motion, and Tailwind CSS for an interactive and smooth user experience.</li>
        <li><strong>API Integration</strong>: Uses Hugging Face APIs to power emotion and sentiment analysis.</li>
    </ul>

    <h2>How It Works</h2>

    <ol>
        <li>Enter any text or provide a URL from a social media platform.</li>
        <li>The app processes the input and uses pre-trained models to analyze the emotions and sentiments.</li>
        <li>Visual charts display the results for an easy interpretation of the emotions present in the text and the overall sentiment.</li>
    </ol>

    <h2>Tech Stack</h2>

    <ul>
        <li><strong>ReactJS</strong>: For building the interactive UI.</li>
        <li><strong>Framer Motion</strong>: For beautiful animations and transitions.</li>
        <li><strong>Tailwind CSS</strong>: For modern styling and responsive design.</li>
        <li><strong>Chart.js</strong>: For rendering pie and bar charts that represent the emotional and sentiment data.</li>
        <li><strong>Axios</strong>: For making API requests to Hugging Face models.</li>
        <li><strong>Cheerio</strong>: For parsing and extracting data from URLs (if a URL is provided).</li>
    </ul>

    <h2>Project Structure</h2>

    <ul>
        <li><strong>HeroSection</strong>: The main input section where users can provide their text or URL for analysis.</li>
        <li><strong>ResultsSection</strong>: Displays the analysis results, including emotion distribution and sentiment scores.</li>
        <li><strong>API Integration</strong>: Calls to Hugging Face for sentiment and emotion models.</li>
        <li><strong>Cheerio</strong>: For extracting text content from URLs.</li>
    </ul>

    <h2>How to Run Locally</h2>

    <div class="code-block">
        <code>git clone https://github.com/yourusername/emot-scan.git</code>
    </div>

    <div class="code-block">
        <code>cd emot-scan</code>
    </div>

    <div class="code-block">
        <code>npm install</code>
    </div>

    <div class="code-block">
        <code>
            REACT_APP_HUGGING_FACE_API_KEY=your_api_key
        </code>
    </div>

    <div class="code-block">
        <code>npm start</code>
    </div>

    <p>Open the app in your browser: <code>http://localhost:3000</code></p>

    <h2>Future Features</h2>

    <ul>
        <li>Support for more APIs: Add other models or enhance the current emotion analysis for better accuracy.</li>
        <li>Real-time updates: Analyze comments and posts from social media in real-time.</li>
        <li>More Visualizations: Additional chart types for a more detailed breakdown of data.</li>
    </ul>

    <h2>License</h2>

    <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
