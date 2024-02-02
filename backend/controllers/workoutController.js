const Workout = require('../models/workoutsSchema');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
    const workout = await Workout.find().sort({createdAt: -1});
    res.status(200).json(workout);
}

// GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'});
    }
    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout);
}


//POST a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    // detect which fields are empty
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }


    // add new doc to collection
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(201).json(workout)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

//DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'});
    }
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout);
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'});
    }
    const workout = await Workout.findByIdAndUpdate(id, {...req.body});

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout);
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}