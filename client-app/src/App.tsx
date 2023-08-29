import { useEffect, useState } from 'react';
import { Activity } from '../models/activity';
import './App.css'
import axios from 'axios';
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState<Activity[]>();

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      if(response.status === 200) {
        setActivities(response.data as Activity[]);
      }
    });
  }, []);

  return (
    <>
      <Header as="h1" icon="users" content="Reactivities" />
        <List>
          {activities?.map((activity : Activity) => (
            <List.Item key={activity.id}>
              <p>{activity.title}</p>
            </List.Item>
          ))}
        </List>
    </>
  )
}

export default App
