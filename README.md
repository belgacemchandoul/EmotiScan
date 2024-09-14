<a id="readme-top"></a>

# EmotiScan - Emotion and Sentiment Analysis Tool

<p>EmotiScan is a web-based application designed to analyze the emotions and sentiments of any text. Utilizing powerful machine learning models, this tool allows users to extract insights from text data by detecting the emotional tone and sentiment breakdown (positive, negative, or neutral) from any input text.</p>
<p>Note: Translation features have been removed due to API runtime errors and server failures.</p>

[![image](https://github.com/user-attachments/assets/6e0cc852-3027-42dc-904d-1f23649c401b)
](https://emotiscan.netlify.app/)

## Features
<ul>
  <li>
    <strong>Emotion Detection: </strong>Detects various emotions (e.g., joy, sadness, anger) from the input text using advanced AI models.
  </li>
  <li>
    <strong>Sentiment Analysis: </strong>Provides a sentiment score breakdown (positive, negative, and neutral) to understand the overall tone of the text.
  </li>
  <li>
    <strong>Visualized Results: </strong>Data is presented with easy-to-understand visualizations, including pie charts for emotion distribution and bar charts for sentiment breakdown.
  </li>
  <li>
    <strong>Interactive UI: </strong>Clean, modern UI built using ReactJS, Framer Motion, and Tailwind CSS for an interactive and smooth user experience.
  </li>
  <li>
    <strong>API Integration: </strong>Uses Hugging Face APIs to power emotion and sentiment analysis.
  </li>
</ul>

## How It Works

<ol>
  <li>Enter any text.</li>
  <li>The app processes the input and uses pre-trained models to analyze the emotions and sentiments.</li>
  <li>Visual charts display the results for an easy interpretation of the emotions present in the text and the overall sentiment.</li>
</ol>

## Tech stack

<ul>
  <li><strong>ReactJS</strong>: For building the interactive UI.</li>
    <li><strong>TypeScript</strong>: For adding static typing to the project, enhancing code quality and maintainability.</li>
    <li><strong>Vite</strong>: For a fast and optimized development environment with a modern build tool.</li>
    <li><strong>Framer Motion</strong>: For beautiful animations and transitions.</li>
    <li><strong>Tailwind CSS</strong>: For modern styling and responsive design.</li>
    <li><strong>Chart.js</strong>: For rendering pie and bar charts that represent the emotional and sentiment data.</li>
    <li><strong>Axios</strong>: For making API requests to Hugging Face models.</li>
</ul>

## Project Structure

<ul>
  <li><strong>HeroSection: </strong>The main input section where users can provide their text for analysis.</li>
  <li><strong>ResultsSection: </strong>Displays the analysis results, including emotion distribution and sentiment scores.</li>
  <li><strong>API Integration: </strong>Calls to Hugging Face for sentiment and emotion models.</li>
</ul>

## How to Run Locally

<ol>
  <li>Clone this repository: 
    
    git clone https://github.com/belgalc/EmotiScan.git
</li>
<li>Navigate to the project directory:

    cd EmotiScan

</li>
<li>Install dependencies:

    npm install

</li>
<li>Create a .env file and add your Hugging Face API key:

    VITE_HF_API_KEY =your_api_key

</li>
<li>Start the development server:

    npm run dev

</li>
<li>Open the app in your browser:

    http://localhost:5173/

</li>

</ol>

## Future Features

<ul>
  <li><strong>Support for more APIs: </strong> Add other models or enhance the current emotion analysis for better accuracy. </li>
  <li><strong>Real-time updates: </strong> Analyze comments and posts from social media in real-time. </li>
  <li><strong>More Visualizations: </strong> Additional chart types for a more detailed breakdown of data. </li>
  <li><strong>Fix Translation API bug: </strong> Reimplement translation in this project since it was removed due to API bugs. </li>
</ul>
