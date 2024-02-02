import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw new Error("only use this context inside the WorkoutContextProvider");
    }

    return context;
}
 
export default useWorkoutsContext;