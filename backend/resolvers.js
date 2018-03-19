import mongoose from 'mongoose';
import courseModel from './models/course';

const coursesData = [
    {
        id: '1',
        title: 'title1',
        description: 'description1',
        author: 'author1',
        topic: 'topic1',
        url: 'url1',
        voteCount: 1
    },
    {
        id: '2',
        title: 'title2',
        description: 'description2',
        author: 'author2',
        topic: 'topic2',
        url: 'url2',
        voteCount: 2
    },
    {
        id: '3',
        title: 'title3',
        description: 'description3',
        author: 'author3',
        topic: 'topi3c',
        url: 'url3',
        voteCount: 3
    }
]

const resolvers = {
    Query: {
        allCourses: (root, {searchTerm}) => {
            // return coursesData;
            if (searchTerm !== '') {
                return courseModel.find({$text: {$search: searchTerm}}).sort({voteCount: 'desc'});
            } else {
                return courseModel.find().sort({voteCount: 'desc'});
            }
        },
        course: (root, {id}) => {
            // return coursesData.filter((course) => course.id === id)[0];
           return courseModel.findOne({ id: id });
        }
    },
    Mutation: {
        upvote: (root, {id}) => {
            // const course = coursesData.filter(course => course.id === id)[0]; 
            // course.voteCount ++;
            // return course;
            return courseModel.findOneAndUpdate({id: id}, { $inc: {"voteCount": 1}}, { returnNewDocument: true })
        },        
        downvote: (root, {id}) => {
            return courseModel.findOneAndUpdate({id: id}, { $inc: {"voteCount": -1}}, { returnNewDocument: true })

            // const course = coursesData.filter(course => course.id === id)[0]; 
            // course.voteCount --;
            // return course;
        },
        addCourse: (root, {title, author, description, topic, url}) => {
            const course = new courseModel({title: title, author: author, description: description, topic: topic, url: url});
            return course.save();
        }
    }
}

export default resolvers;