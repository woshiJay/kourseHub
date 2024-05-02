require('dotenv').config({ path: '../../.env' });
const express = require('express')
const cors = require('cors')
const app = express();
const port = 5501;
app.use(express.json());
app.use(cors());


// ----------------------------------------------------------------------
// Initializing of Firebase Admin SDK
// ----------------------------------------------------------------------
const admin = require('firebase-admin')
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("../../koursehub-6ebca4ab6372.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://koursehub-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db = admin.database();

// ----------------------------------------------------------------------
// Initializing of Firebase SDK
// ----------------------------------------------------------------------
const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const firebaseConfig = {
    apiKey: "AIzaSyAKW67y2atOvo9w_l47Lcg-14vHYik1JZw",
    authDomain: "koursehub.firebaseapp.com",
    databaseURL: "https://koursehub-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "koursehub",
    storageBucket: "koursehub.appspot.com",
    messagingSenderId: "955512527180",
    appId: "1:955512527180:web:c721dfb8d2d7d6858a97e9"
  };

firebase.initializeApp(firebaseConfig);

// ----------------------------------------------------------------------
// Initializing of VertexAI Generative Model
// ----------------------------------------------------------------------
const { GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold, } = require("@google/generative-ai");
const MODEL_NAME = process.env.MODEL_NAME;
const API_KEY = process.env.API_KEY;
// const genAI = new GoogleGenerativeAI("AIzaSyAXnIG0JxO1BvETAkUGEEpTOLoUntMA0bg");

app.post('/gemini-question', async (req, res) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
    ];

    const parts = [
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Expert"},
        {text: "output: Deep learning represents a subset of machine learning techniques that stand at the forefront of artificial intelligence research, \nemulating the intricate processes of human cognition through the utilization of complex neural network architectures. At its essence, \ndeep learning strives to uncover intricate patterns and representations within vast and often unstructured datasets, extracting hierarchies of \nfeatures across multiple layers of abstraction to enable unprecedented levels of understanding and decision-making. \n\nAt the heart of deep learning lies the neural network, an interconnected network of computational nodes inspired by the structure and functionality \nof the human brain's neural circuitry. Through the intricate interplay of interconnected nodes, each endowed with learnable parameters, deep learning \nmodels possess the remarkable ability to autonomously discover and internalize the underlying structure of data, thus facilitating tasks such as \nclassification, regression, clustering, and generation with unprecedented accuracy and efficiency.\n\nWhat distinguishes deep learning from traditional machine learning approaches is its capacity to automatically extract and learn hierarchical \nrepresentations of data, progressively refining its understanding through multiple layers of abstraction. This hierarchical feature learning enables \ndeep learning models to discern intricate patterns and relationships within data that may elude more conventional techniques, empowering them to excel \nin domains characterized by high-dimensional, unstructured, or inherently complex data.\n\nFueling the rapid advancement of deep learning are innovations in model architectures, optimization algorithms, and computational infrastructure. From \nconvolutional neural networks (CNNs) tailored for image analysis to recurrent neural networks (RNNs) adept at sequential data processing and attention \nmechanisms that enable contextual understanding, deep learning architectures continue to evolve, pushing the boundaries of what is achievable in artificial \nintelligence.\n\nMoreover, the advent of distributed computing frameworks, specialized hardware accelerators, and scalable training methodologies has democratized the \napplication of deep learning, enabling researchers and practitioners to tackle increasingly ambitious challenges across diverse domains, ranging from \nhealthcare and finance to autonomous driving and natural language understanding."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Unfamiliar"},
        {text: "output: Deep learning is like teaching computers to learn from examples, just like we do. Imagine you're trying to teach a friend to recognize different types \nof fruit. You might show them lots of pictures of apples, bananas, and oranges, and tell them which is which. After seeing many examples, your friend \nstarts to recognize the fruit on their own.\n\nIn deep learning, we use something called neural networks to teach computers in a similar way. A neural network is like a virtual brain made up of simple \nbuilding blocks called neurons. These neurons work together to understand and make sense of data.\n\nLet's say we want to teach a computer to recognize handwritten numbers. We could show it thousands of pictures of handwritten digits (like the numbers 0 \nthrough 9) along with their labels. The computer then learns to associate certain patterns in the images with specific numbers.\n\nBut what makes deep learning so powerful is its ability to learn complex patterns. Just like we can recognize a friend's face from different angles or \nlighting conditions, deep learning models can learn to recognize patterns in data, even if they're complicated or messy.\n\nThink of it like learning to ride a bike. At first, it's hard to balance, but the more you practice, the better you get. Similarly, deep learning models \nget better at recognizing patterns with more examples and practice.\n\nDeep learning is used in all sorts of cool applications, like recognizing faces in photos, understanding spoken language, and even driving cars \nautonomously. It's helping us solve problems that were once thought impossible, and it's changing the way we interact with technology every day.\n\nSo, in simple terms, deep learning is a way of teaching computers to learn from examples, just like we do, using neural networks. It's like teaching \na computer to recognize patterns and make decisions on its own, and it's making our technology smarter and more capable than ever before."},
        {text: "input: Moderate"},
        {text: "output: Deep learning is a subset of machine learning, which is a type of artificial intelligence. It's all about teaching computers to learn from data and \nmake decisions like humans do, but it takes this idea to a whole new level by using something called neural networks.\n\nThink of a neural network like a brain-inspired algorithm made up of interconnected nodes, or neurons. Each neuron processes information and passes \nit along to the next neuron, eventually leading to an output.\n\nWhat makes deep learning special is its ability to learn complex patterns and features directly from data. It does this by stacking layers of neurons, \nwith each layer building upon the previous one to capture more abstract and high-level features. This is why it's called \"deep\" learning – because it \ninvolves many layers.\n\nFor example, if you're training a deep learning model to recognize pictures of cats, the first few layers might learn to detect basic features like edges \nand colors, while deeper layers might learn to recognize more complex patterns like ears, eyes, and whiskers.\n\nDeep learning has been incredibly successful in tasks like image recognition, speech recognition, natural language processing, and even playing games \nlike Go. It's used in things like self-driving cars, virtual assistants, medical diagnosis, and recommendation systems.\n\nOne of the reasons deep learning works so well is because of its ability to automatically learn from large amounts of data. By showing the model thousands \nor even millions of examples, it can gradually improve its performance and make better predictions.\n\nWhile deep learning is powerful, it's also computationally intensive and requires a lot of data to train effectively. However, with advancements in \ntechnology and the availability of resources like pre-trained models and libraries, it's becoming more accessible to researchers, developers, and even \nhobbyists."},
        {text: "input: Expert"},
        {text: "output: "},
      ];

    const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
    });

    const response = result.response;
    console.log(response.text());
})
// 

// AI Chatbot + Review route
app.post('/ai-review', async (req, res) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const promptMsg = req.body.promptmsg;
    const result = await model.generateContent(promptMsg);
    const resp = await result.response;
    const text = resp.text();
    return res.status(200).json({ text: text });
})

// ---------------------------------------------------------------------- 

// Sign up route
app.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ alert: 'Please ensure that all fields are filled.' });
        return;
    }
    const auth = getAuth();

    const userRecord = await auth.createUser({
        email: email,
        password: password
    })
        .catch((error) => {
            if (error.code === 'auth/email-already-exists') {
                res.status(400).json({ alert: 'Email already exists! Please proceed to Login.' });
            } else {
                res.status(400).json({ alert: error.code })
            }
        })
        
    if (!userRecord) return;
    const userId = userRecord.uid;
    const userRef = db.ref(`users/${userId}`);
    await userRef.set({ username: username })
    // redirect to interest page form
    res.status(200).json({ redirect: '/dist/login.html' });
});

// Sign in route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const firebaseAuthentication = firebaseAuth.getAuth();

    firebaseAuth.signInWithEmailAndPassword(firebaseAuthentication, email, password)
        .then((userCredential) => {
            // Signed in
            res.status(200).json({ message: "User signed in successfully!", uid: userCredential.user.uid })
        })
        .catch((error) => {
            res.status(401).json({ alert: 'Invalid email or password! Please try again.' });
        });
});

// Sign out route
// app.get('/signout', async (req, res) => {
//     firebaseAuth.getAuth().signOut()
//         .then(() => {
//             sessionStorage.removeItem('userId');
//             window.location.href = 'index.html';
//             res.status(200).json({ message: "User signed out successfully!" })
//         })
//         .catch((error) => {
//         });
// });

// Get username route
app.get('/get-username', async (req, res) => {
    const userId = req.query.uid;
    if (!userId) {
        return res.status(400).json({ alert: "User ID is required!" });
    }

    const userRef = db.ref(`users/${userId}`);
    try {
        const snapshot = await userRef.once('value');
        if (snapshot.exists()) {
            const username = snapshot.val().username;
            return res.status(200).json({ username: username });
        } else {
            return res.status(404).json({ alert: "User does not exist!" });
        }
    } catch (err) {
        console.error("Error fetching username: ", err);
        return res.status(500).json({ alert: "Error fetching username!" });
    }
});

// Get user email




// ###########################################################################################
// Database settings
// ###########################################################################################

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));;

// Define the User schema
const userSchema = new Schema({
  user_email: String,
  user_name: { type: String, required: true, unique: true },
  user_age: Number
});

// Define the Career Counseling schema
const interestSchema = new Schema({
  user_name: { type: String, ref: 'User', required: true },
  question_one_ans: String,
  question_two_ans: String,
  question_three_ans: String,
  question_four_ans: String,
  question_five_ans: String
});

// Define the Course Assessment schema
const courseAssessmentSchema = new Schema({
  user_name: { type: String, ref: 'User', required: true },
  question_one_ans: String,
  question_two_ans: String,
  question_three_ans: String,
  classification: String
});

// Define the Question schema
const questionSchema = new Schema({
  question_id: { type: Schema.Types.ObjectId, required: true, unique: true },
  user_name: { type: String, ref: 'User' },
  course: String,
  chapter: String,
  question: String,
  answer: String
});

// Course Schema
const courseSchema = new Schema({
    course_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    course_name: { type: String, required: true },
    course_people: [{ type: String }], // Assuming this lists people related to the course
  });
  
  // User-Course Schema for Many-to-Many Relationship
  const userCourseSchema = new Schema({
    user_course_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    course_name: { type: String, ref: 'Course', required: true }, // Refers to a course
    user_name: { type: String, ref: 'User', required: true }, // Refers to a user
  });

// Create models from the schemas
const User = mongoose.model('User', userSchema);
const Interest = mongoose.model('Interest', interestSchema);
const CourseAssessment = mongoose.model('CourseAssessment', courseAssessmentSchema);
const Question = mongoose.model('Question', questionSchema);
const Course = mongoose.model('Course', courseSchema);
const UserCourse = mongoose.model('UserCourse', userCourseSchema);

// Export the models
module.exports = {
    User,
    Interest,
    CourseAssessment,
    Question,
    Course,
    UserCourse
  };

// Route to handle POST request
app.post('/upload-user', async (req, res) => {
    try {
      // Create a new user instance using the request body
      const newUser = new User(req.body);
  
      // Save the user to the database
      await newUser.save();
  
      // Send a successful response back to the client
      res.status(201).send({ message: 'User uploaded successfully', user: newUser });
    } catch (error) {
      // If an error occurs, send an error response
      res.status(500).send({ message: 'Error uploading user', error: error.message });
    }
  });

// Define a GET endpoint
app.get('/get-all-user', async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      
      // Send the list of users as a response
      res.json(users);
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get('/get-user/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await User.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No data found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve user', error: error.message });
    }
});

// ---------------------------------------------------------------------------

// POST endpoint to add a new career counseling session
app.post('/upload-interest', async (req, res) => {
    try {
        const newSession = new Interest(req.body);
        await newSession.save();

    } catch (error) {
        res.status(500).send({ message: 'Failed to add session', error: error.message });
    }
});
  
// GET endpoint to retrieve all career counseling sessions
app.get('/get-all-interest', async (req, res) => {
    try {
        const sessions = await Interest.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

app.get('/get-interest/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await Interest.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No sessions found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

// ---------------------------------------------------------------------------

// POST endpoint to add a new career counseling session
app.post('/upload-course-assessment', async (req, res) => {
    try {
        const newSession = new CourseAssessment(req.body);
        await newSession.save();
        res.status(201).send({ message: 'New Course Assessment session added', data: newSession });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add session', error: error.message });
    }
});
  
// GET endpoint to retrieve all career counseling sessions
app.get('/get-all-course-assessment', async (req, res) => {
    try {
        const sessions = await CourseAssessment.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

app.get('/get-course-assessment/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await CourseAssessment.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No sessions found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve sessions', error: error.message });
    }
});

// ---------------------------------------------------------------------------
// // need to use this to create question id
// const { ObjectId } = require('mongoose').Types;

// // Example of creating a new ObjectId
// const id = new ObjectId(); // This will create a new valid ObjectId
// // Convert ObjectId to string
// const stringId = id.toString();

// console.log(stringId);
// ---------------------------------------------------------------------------

// POST endpoint to add a new career counseling session
app.post('/upload-question', async (req, res) => {
    try {
        const newSession = new Question(req.body);
        await newSession.save();
        res.status(201).send({ message: 'New Question added', data: newSession });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add Question', error: error.message });
    }
});
  
// GET endpoint to retrieve all career counseling sessions
app.get('/get-all-question', async (req, res) => {
    try {
        const sessions = await Question.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-question/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await Question.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No Question found for this user' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

// ---------------------------------------------------------------------------

// POST route to add a new course
app.post('/upload-course', async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      await newCourse.save();
      res.status(201).send({ message: 'Course added successfully', data: newCourse });
    } catch (error) {
      res.status(500).send({ message: 'Error adding course', error: error.message });
    }
  });

app.get('/get-course', async (req, res) => {
    try {
        const sessions = await Course.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-course/:course_name', async (req, res) => {
    try {
        const { course_name } = req.params; // Extract user_email from path parameters
        const sessions = await Course.find({ course_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No course name' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

  // ---------------------------------------------------------------------------
  
  // POST route to add a user-course relationship
  app.post('/upload-user-course', async (req, res) => {
    try {
      const newUserCourse = new UserCourse(req.body);
      await newUserCourse.save();
      res.status(201).send({ message: 'User-Course relationship added successfully', data: newUserCourse });
    } catch (error) {
      res.status(500).send({ message: 'Error adding user-course relationship', error: error.message });
    }
  });


  app.get('/get-user-course', async (req, res) => {
    try {
        const sessions = await UserCourse.find();
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-user-course/:course_name', async (req, res) => {
    try {
        const { course_name } = req.params; // Extract user_email from path parameters
        const sessions = await UserCourse.find({ course_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No course name' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

app.get('/get-user-course/:user_name', async (req, res) => {
    try {
        const { user_name } = req.params; // Extract user_email from path parameters
        const sessions = await UserCourse.find({ user_name }); // Find sessions for the specific user
        if (sessions.length === 0) {
            return res.status(404).send({ message: 'No user name' });
        }
        res.json(sessions);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve Question', error: error.message });
    }
});

// ---------------------------------------------------------------------------
// // example for adding user
// const newUser = new User({
//   user_name: 'Sattish',
//   user_email: 'STH@example.com',
//   user_age: 21
// });

// newUser.save()
//   .then(doc => console.log('User added:', doc))
//   .catch(err => console.error('Error adding user:', err));



// #####################################################################################################

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
