import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import { CheckBox } from '@rneui/themed';

//React jsx element
// App, capital for react elements, functional component
/*
const App, that's a variable
= () making it a function
{} everything in the function of course
=> arrow function, has ability of "this"

"Why is it defined as a variable first and then a function?"
const App = .... is a functional component definition
it's a style choice, more readable

preventing it from being called before it's defined
App is a reference to the function

Functions are treated as values in react
this way, they can be passed as arguments, and can be returned from other functions (ooohhhhh)

The reason we're using this syntax is because it helps prevent any issues with 'this', and useEffect and useState are designed for functional components

The older style with function App(){} is less modern
*/
const App = () => {
  // Defining an array of default tasks in the state
  //1. Set of default tasks, has key, completed boolean, and desc
  const [tasks, setTasks] = useState([
    { key: '1', completed: false, description: 'Finish todo list for mobile development' },
    { key: '2', completed: false, description: 'Take midterm' },
    { key: '3', completed: false, description: 'Lay down and cry' },
    { key: '4', completed: false, description: 'Talk to boss about raise' },
  ]);

  // New task starts as blank, waiting for user input
  const [newTask, setNewTask] = useState('');

  // Task completion checkbox handler
  const setTaskCompleted = (taskKey) => {

    setTasks((prevTasks) =>

      //map returns updated state
      prevTasks.map((task) =>
        task.key === taskKey
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // adds new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { key: (prevTasks.length + 1).toString(), completed: false, description: newTask },
      ]);
      setNewTask(''); // Clear the input field
      //Keyboard.dismiss(); // Hide the keyboard after adding
    }
  };

  // Function to handle Enter key press for submitting the task
  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      addTask();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>

      {/* Input field for new task */}
      <TextInput
        style={styles.input}
        placeholder="Enter new task"
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={addTask} // Submit task when pressing "Enter" or "Done"
        onKeyPress={handleKeyPress} // Handle Enter key press for mobile devices
      />

      {/* Button to add new task */}
      <Button title="Add" onPress={addTask} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <CheckBox
              checked={item.completed}
              onPress={() => setTaskCompleted(item.key)}

            />
            <Text
              style={[
                styles.taskDescription,
                item.completed && styles.completedTask,
              ]}
            >
              {item.description}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

/* Css styles are limited with the react button and checklist, so I had to improvise with at least the checklist. */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    //backgroundColor: "#ffe0a1",
    backgroundColor: "#ffc782",
  },
  header: {
    fontSize: '3em',
    fontWeight: 'bold',
    fontFamily: 'fantasy',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    //margin bottom moves button
    width: '80%',
    paddingLeft: 10,
    fontSize: 20,
    backgroundColor: "white",
    fontFamily: 'Gill sans',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   marginVertical: 10,
    backgroundColor: "#ffe0a1",
    border: 'solid 1px black',
    borderRadius: 25,
    padding: 15,
    backgroundColor: 'white',


  },
  taskDescription: {
    fontSize: "1.5em",
    marginLeft: 10,
    fontFamily: 'Gill sans',

  },
  completedTask: {
    textDecorationLine: 'line-through',
   textDecorationStyle: 'solid',
    color: 'grey',
  },


});

export default App;
