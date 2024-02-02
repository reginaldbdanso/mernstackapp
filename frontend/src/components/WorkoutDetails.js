import useWorkoutsContext from "../hooks/useWorkoutContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext();
    const handleClick = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/' + workout._id, {
            method: 'DELETE'
        })
        // const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: workout._id});
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}
 
export default WorkoutDetails;