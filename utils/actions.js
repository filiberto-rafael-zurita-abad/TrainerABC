'use server';

import OpenAI from 'openai';
import prisma from './db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'you are a helpful assistant' },
          ...chatMessages,
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0,
      });
      return response.choices[0].message;
    } catch (error) {
      return null;
    }
  };
  
  export const generateTourResponse = async ({ city, country }) => {
    const query = `Find a exact ${city} in this exact ${country}.
  If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
  Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "title of the tour",
      "description": "short description of the city and tour",
      "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
    }
  }
  "stops" property should include only three stops.
  If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
  
    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'you are a tour guide' },
          { role: 'user', content: query },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0,
      });
      // potentially returns a text with error message
      const tourData = JSON.parse(response.choices[0].message.content);
  
      if (!tourData.tour) {
        return null;
      }
  
      return tourData.tour;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const getExistingTour = async ({ city, country }) => {
    return prisma.tour.findUnique({
      where: {
        city_country: {
          city,
          country,
        },
      },
    });
  };
  
  export const createNewTour = async (tour) => {
    return prisma.tour.create({
      data: tour,
    });
  }; 
  
  
  export const getAllTours = async (searchTerm) => {
    if (!searchTerm) {
      const tours = await prisma.tour.findMany({
        orderBy: {
          city: 'asc',
        },
      });
  
      return tours;
    }

    const tours = await prisma.tour.findMany({
      where: {
        OR: [
          {
            city: {
              contains: searchTerm,
            },
          },
          {
            country: {
              contains: searchTerm,
            },
          },
        ],
      },
      orderBy: {
        city: 'asc',
      },
    });
    return tours;
  }; 




  
  export const generateLessonResponse = async ({ level, focus }) => {
    const query = `Provide data for a level ${level} ESL lesson with the main 
    grammar focus being ${focus}.
  
    The response should be  in the following JSON format: 
  
  {
    "lesson": {
      "level": "${level}",
      "focus": "${focus}",
      "title": "title of the lesson",
      "description": " short explination of the grammar of ${focus}",

      "titleForExamples": "short title for examples", 
      "examples": ["example sentence 1 ", "example sentence 2","examle sentence 3"], 

      "titleFillBlanks" : "short title for a fill in the blanks activity",
      "fillBlanks" : ["activity 1", "activity 2", activity 3"],

      "titleOneReading" : "short title about the reading activity",
      "oneReading" : "generate a paragraph for a reading activity", 
      "oneReadingQuestions" ["question 1". "question 2"],

      "titleTwoReading" : "short title about the reading activity",
      "twoReading" : "generate a paragraph for a reading activity", 
      "twoReadingQuestions" ["question 1". "question 2"],

      "titleThreeReading" : "short title about the reading activity",
      "threeReading" : "generate a paragraph for a reading activity", 
      "threeReadingQuestions" ["question 1". "question 2"],

      "titleConclusion" : "short title about the conclusion",
      "conclusion" : "a description of the activities viewed and the lesson objectives" 

      
      
    }
  }

  Follow the following instructions to construct the JSON file: 

  First, the description key should explain the main uses of the grammar focus. 
  
  Second, there should be 5 examples displayed. 

  Third, there should be 10 fill in the blancks activities in the fillBlanks key. 
  Display two answers for the fill in the blanks activity in paranthesis next to the each sentence
  so the student can choose the correct one. Switch the order of the correct question around
  so it wont always be in the same spot. Make this particular activity dificult.

  Fourth, the oneReading key should contain a paragraph long text at a ${level} reading level 
  about an interesting topic. Additionally, as two comprehension questions for the
  oneReadingQuestions key.  

  Fifth, the twoReading and threeReading keys should have the same characteristics as its predecessor.   

  
  `;
  
    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'you are a ESL instructor' },
          { role: 'user', content: query },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0,
      });
      // potentially returns a text with error message
      const lessonData = JSON.parse(response.choices[0].message.content);
  
      if (!lessonData.lesson) {
        return null;
      }
  
      return lessonData.lesson;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  export const getExistingLesson = async ({ level, focus }) => {
    return prisma.lesson.findUnique({
      where: {
        level_focus: {
          level,
          focus
        },
      },
    });
  };
  
  export const createNewLesson = async (lesson) => {
    return prisma.lesson.create({
      data: lesson,
    });
  };

  export const getAllLessons = async (searchTerm) => {
    if (!searchTerm) {
      const lessons = await prisma.lesson.findMany({
        orderBy: {
          level: 'asc',
        },
      });
  
      return lessons;
    }
  
    const lessons = await prisma.lesson.findMany({
      where: {
        OR: [
          {
            level: {
              contains: searchTerm,
            },
          },
          {
            focus: {
              contains: searchTerm,
            },
          },
        ],
      },
      orderBy: {
        level: 'asc',
      },
    });
    return lessons;
  };


  export const getSingleLesson = async (id) => {
    return prisma.lesson.findUnique({
      where: {
        id,
      },
    });
  };

  export const generateLessonImage = async ({ level, focus }) => {
    try {
      const lessonImage = await openai.images.generate({
        prompt: `Image of studentsof a {level} level in an ESL classroom `,
        n: 1,
        size: '512x512',
      });
      return lessonImage?.data[0]?.url;
    } catch (error) {
      return null;
    }
  };